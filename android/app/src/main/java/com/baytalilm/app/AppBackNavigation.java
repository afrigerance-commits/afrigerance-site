package com.baytalilm.app;

import android.net.Uri;
import android.os.Handler;
import android.os.Looper;
import android.os.SystemClock;
import android.webkit.WebBackForwardList;
import android.webkit.WebHistoryItem;
import android.webkit.WebView;
import android.widget.Toast;
import androidx.activity.OnBackPressedCallback;
import com.getcapacitor.Bridge;
import com.getcapacitor.WebViewListener;

/** One native Back path for the system gesture and navigation button. No website update required. */
final class AppBackNavigation extends OnBackPressedCallback {
    private static final long EXIT_WINDOW_MS = 2000;
    private static final long WEB_RESPONSE_MS = 500;
    private static final String DISMISS_LAYER =
        "(() => {" +
        "const layer = Array.from(document.querySelectorAll('[role=dialog][data-state=open],[role=alertdialog][data-state=open],[role=menu][data-state=open],[role=listbox][data-state=open]')).some(el => el.getClientRects().length > 0);" +
        "if (!layer) return false;" +
        "const target = document.activeElement || document;" +
        "target.dispatchEvent(new KeyboardEvent('keydown', {key:'Escape',code:'Escape',bubbles:true,cancelable:true}));" +
        "return true;" +
        "})()";

    private final MainActivity activity;
    private final Bridge bridge;
    private final WebView webView;
    private final Uri home;
    private final Handler handler = new Handler(Looper.getMainLooper());
    private long requestSequence;
    private long pendingRequest;
    private long lastRootBackAt;
    private boolean clearHomeHistory;
    private boolean destroyed;
    private Toast exitHint;
    private final WebViewListener pageListener = new WebViewListener() {
        @Override public void onPageStarted(WebView view) { resetExit(); }
        @Override public void onPageLoaded(WebView view) {
            if (clearHomeHistory && isHome(view.getUrl())) {
                clearHomeHistory = false;
                view.clearHistory();
            }
        }
    };

    AppBackNavigation(MainActivity activity, Bridge bridge) {
        super(true);
        this.activity = activity;
        this.bridge = bridge;
        this.webView = bridge.getWebView();
        this.home = Uri.parse(bridge.getServerUrl()).buildUpon().path("/").clearQuery().fragment(null).build();
        bridge.addWebViewListener(pageListener);
        activity.getOnBackPressedDispatcher().addCallback(activity, this);
    }

    @Override public void handleOnBackPressed() {
        if (destroyed || pendingRequest != 0) return;
        long request = ++requestSequence;
        pendingRequest = request;
        Runnable fallback = () -> finishRequest(request, false);
        handler.postDelayed(fallback, WEB_RESPONSE_MS);
        try {
            webView.evaluateJavascript(DISMISS_LAYER, result -> {
                handler.removeCallbacks(fallback);
                finishRequest(request, "true".equals(result));
            });
        } catch (IllegalStateException e) {
            handler.removeCallbacks(fallback);
            finishRequest(request, false);
        }
    }

    private void finishRequest(long request, boolean layerDismissed) {
        if (destroyed || pendingRequest != request) return;
        pendingRequest = 0;
        if (layerDismissed) { resetExit(); return; }
        WebBackForwardList history = webView.copyBackForwardList();
        int current = history.getCurrentIndex();
        for (int i = current - 1; i >= 0; i--) {
            WebHistoryItem item = history.getItemAtIndex(i);
            if (item != null && isAppUrl(item.getUrl())) {
                resetExit();
                webView.goBackOrForward(i - current);
                return;
            }
        }
        if (!isHome(webView.getUrl())) {
            resetExit();
            // A direct-opened page has no earlier app entry. Return to the app's root,
            // then discard this fallback entry so Back cannot loop between the two pages.
            clearHomeHistory = true;
            webView.loadUrl(home.toString());
            return;
        }
        long now = SystemClock.elapsedRealtime();
        if (lastRootBackAt != 0 && now - lastRootBackAt <= EXIT_WINDOW_MS) {
            resetExit();
            activity.moveTaskToBack(true); // Preserve the task and native audio service.
        } else {
            lastRootBackAt = now;
            if (exitHint != null) exitHint.cancel();
            exitHint = Toast.makeText(activity, "Appuyez de nouveau sur Retour pour quitter MIRÂTH", Toast.LENGTH_SHORT);
            exitHint.show();
        }
    }

    private boolean isAppUrl(String value) {
        if (value == null) return false;
        Uri uri = Uri.parse(value);
        return home.getScheme().equalsIgnoreCase(uri.getScheme())
            && home.getHost().equalsIgnoreCase(uri.getHost())
            && home.getPort() == uri.getPort();
    }

    private boolean isHome(String value) {
        if (!isAppUrl(value)) return false;
        Uri uri = Uri.parse(value);
        String path = uri.getPath();
        return (path == null || path.isEmpty() || "/".equals(path)) && uri.getQuery() == null && uri.getFragment() == null;
    }

    void resetExit() {
        lastRootBackAt = 0;
        if (exitHint != null) { exitHint.cancel(); exitHint = null; }
    }

    void destroy() {
        destroyed = true;
        pendingRequest = 0;
        resetExit();
        handler.removeCallbacksAndMessages(null);
        bridge.removeWebViewListener(pageListener);
        remove();
    }
}
