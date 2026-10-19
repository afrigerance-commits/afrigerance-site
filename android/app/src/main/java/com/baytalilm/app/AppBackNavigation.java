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
import androidx.webkit.ScriptHandler;
import androidx.webkit.WebViewCompat;
import androidx.webkit.WebViewFeature;
import java.io.InputStream;
import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import com.getcapacitor.Bridge;
import com.getcapacitor.WebViewListener;

/** One native Back path for the system gesture and navigation button. No website update required. */
final class AppBackNavigation extends OnBackPressedCallback {
    private static final long EXIT_WINDOW_MS = 2000;
    private static final long WEB_RESPONSE_MS = 500;
    private static final String HANDLE_BACK = "window.__mirathAndroidBack ? window.__mirathAndroidBack.handle() : 'unavailable'";

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
    private String historyScript;
    private ScriptHandler documentScript;
    private final WebViewListener pageListener = new WebViewListener() {
        @Override public void onPageStarted(WebView view) { resetExit(); }
        @Override public void onPageCommitVisible(WebView view, String url) { installHistory(view, url); }
        @Override public void onPageLoaded(WebView view) {
            installHistory(view, view.getUrl());
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
        try (InputStream input = activity.getAssets().open("mirath-back-navigation.js");
             ByteArrayOutputStream buffer = new ByteArrayOutputStream()) {
            byte[] bytes = new byte[4096]; int size;
            while ((size = input.read(bytes)) != -1) buffer.write(bytes, 0, size);
            historyScript = buffer.toString(StandardCharsets.UTF_8.name());
        } catch (java.io.IOException e) { historyScript = ""; }
        if (WebViewFeature.isFeatureSupported(WebViewFeature.DOCUMENT_START_SCRIPT)) {
            String origin = home.buildUpon().path(null).build().toString();
            documentScript = WebViewCompat.addDocumentStartJavaScript(webView, historyScript, Collections.singleton(origin));
        }
        bridge.addWebViewListener(pageListener);
        activity.getOnBackPressedDispatcher().addCallback(activity, this);
    }

    private void installHistory(WebView view, String url) {
        if (isAppUrl(url) && !historyScript.isEmpty()) view.evaluateJavascript(historyScript, null);
    }

    @Override public void handleOnBackPressed() {
        if (destroyed || pendingRequest != 0) return;
        long request = ++requestSequence;
        pendingRequest = request;
        Runnable fallback = () -> finishRequest(request, null);
        handler.postDelayed(fallback, WEB_RESPONSE_MS);
        try {
            webView.evaluateJavascript(HANDLE_BACK, result -> {
                handler.removeCallbacks(fallback);
                finishRequest(request, result);
            });
        } catch (IllegalStateException e) {
            handler.removeCallbacks(fallback);
            finishRequest(request, null);
        }
    }

    private void finishRequest(long request, String action) {
        if (destroyed || pendingRequest != request) return;
        pendingRequest = 0;
        if ("\"dismissed\"".equals(action) || "\"navigated\"".equals(action)) { resetExit(); return; }
        if ("\"root\"".equals(action)) { confirmRootExit(); return; }
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
        if ("\"page\"".equals(action)) {
            resetExit();
            // A direct-opened page has no earlier app entry. Return to the app's root,
            // then discard this fallback entry so Back cannot loop between the two pages.
            clearHomeHistory = true;
            webView.loadUrl(home.toString());
            return;
        }
        // Do not infer that a hung or not-yet-ready renderer is the root page.
        resetExit();
        Toast.makeText(activity, "La page n’est pas encore prête. Réessayez Retour.", Toast.LENGTH_SHORT).show();
    }

    private void confirmRootExit() {
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
        if (documentScript != null) documentScript.remove();
        bridge.removeWebViewListener(pageListener);
        remove();
    }
}
