package com.baytalilm.app;

import static org.junit.Assert.*;
import android.os.ParcelFileDescriptor;
import androidx.lifecycle.Lifecycle;
import androidx.test.core.app.ActivityScenario;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.platform.app.InstrumentationRegistry;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;
import org.junit.Test;
import org.junit.runner.RunWith;

/** Exercises real Next navigation in the Android WebView, including an edge-swipe system gesture. */
@RunWith(AndroidJUnit4.class)
public class BackNavigationTest {
    private String read(ActivityScenario<MainActivity> scenario, String expression) throws Exception {
        AtomicReference<String> value = new AtomicReference<>("");
        CountDownLatch done = new CountDownLatch(1);
        scenario.onActivity(activity -> activity.getBridge().getWebView().evaluateJavascript(expression, result -> {
            value.set(result); done.countDown();
        }));
        assertTrue("WebView did not answer", done.await(10, TimeUnit.SECONDS));
        return value.get();
    }
    private void await(ActivityScenario<MainActivity> scenario, String expression) throws Exception {
        long deadline = System.currentTimeMillis() + 60000;
        while (System.currentTimeMillis() < deadline) {
            if ("true".equals(read(scenario, expression))) return;
            Thread.sleep(150);
        }
        fail("Navigation condition failed: " + expression + "; page=" + read(scenario, "JSON.stringify({url:location.href,state:history.state,installed:!!window.__mirathAndroidBack})"));
    }
    private void home(ActivityScenario<MainActivity> scenario) throws Exception {
        await(scenario, "location.origin === 'https://miraath.netlify.app' && !!document.querySelector('.mobile-app-dock[data-native=true]')");
        if (!"true".equals(read(scenario, "location.pathname === '/'"))) {
            scenario.onActivity(activity -> activity.getBridge().getWebView().loadUrl("https://miraath.netlify.app/"));
        }
        await(scenario, "location.pathname === '/' && document.readyState === 'complete' && !!document.querySelector('.mobile-app-dock[data-native=true]')");
        scenario.onActivity(activity -> activity.getBridge().getWebView().clearHistory());
    }
    private void back(ActivityScenario<MainActivity> scenario) {
        scenario.onActivity(activity -> activity.getOnBackPressedDispatcher().onBackPressed());
    }
    private String shell(String command) throws Exception {
        try (ParcelFileDescriptor fd = InstrumentationRegistry.getInstrumentation().getUiAutomation().executeShellCommand(command);
             FileInputStream stream = new FileInputStream(fd.getFileDescriptor());
             ByteArrayOutputStream output = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[4096]; int n;
            while ((n = stream.read(buffer)) != -1) output.write(buffer, 0, n);
            return output.toString(StandardCharsets.UTF_8.name());
        }
    }
    @Test public void edgeSwipeReturnsThroughNextPagesWithoutClosingOrReloadingApp() throws Exception {
        String original = Arrays.stream(shell("cmd overlay list").split("\\n"))
            .filter(line -> line.contains("[x]") && line.contains("com.android.internal.systemui.navbar."))
            .map(line -> line.substring(line.indexOf("com.android.internal.systemui.navbar.")).trim())
            .findFirst().orElse("com.android.internal.systemui.navbar.threebutton");
        shell("cmd overlay enable-exclusive --user current --category com.android.internal.systemui.navbar.gestural");
        try (ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class)) {
            home(scenario);
            read(scenario, "document.querySelector('.mobile-app-dock a[href=\"/coran\"]').click()");
            await(scenario, "location.pathname === '/coran' && (() => { const el=document.querySelector('main a[href=\"/coran/1\"]'); return el && Object.keys(el).some(key => key.startsWith('__reactProps$') && typeof el[key]?.onClick === 'function'); })()");
            read(scenario, "window.__backNavigationFixture = 'kept'; document.querySelector('main a[href=\"/coran/1\"]').click()");
            await(scenario, "location.pathname === '/coran/1' && !!document.querySelector('select[aria-label=\"Langue de l’audio\"]')");
            int width = InstrumentationRegistry.getInstrumentation().getTargetContext().getResources().getDisplayMetrics().widthPixels;
            int height = InstrumentationRegistry.getInstrumentation().getTargetContext().getResources().getDisplayMetrics().heightPixels;
            shell("input swipe 1 " + (height / 2) + " " + (width * 2 / 3) + " " + (height / 2) + " 350");
            await(scenario, "location.pathname === '/coran'");
            assertEquals("\"kept\"", read(scenario, "window.__backNavigationFixture"));
            scenario.onActivity(activity -> assertFalse("Back gesture finished MainActivity", activity.isFinishing()));
            back(scenario);
            await(scenario, "location.pathname === '/'");
            assertEquals("\"kept\"", read(scenario, "window.__backNavigationFixture"));
            assertEquals(Lifecycle.State.RESUMED, scenario.getState());
        } finally {
            shell("cmd overlay enable-exclusive --user current --category " + original);
        }
    }
    @Test public void backClosesOpenPanelBeforePoppingPageHistory() throws Exception {
        try (ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class)) {
            home(scenario);
            read(scenario, "document.querySelector('.mobile-app-dock a[href=\"/hadith\"]').click()");
            await(scenario, "location.pathname === '/hadith'");
            read(scenario, "document.querySelector('.mobile-app-dock button[aria-label=\"Plus de rubriques\"]').click()");
            await(scenario, "!!document.querySelector('[role=dialog][data-state=open]')");
            back(scenario);
            await(scenario, "!document.querySelector('[role=dialog][data-state=open]')");
            assertEquals("\"/hadith\"", read(scenario, "location.pathname"));
            back(scenario);
            await(scenario, "location.pathname === '/'");
            assertEquals(Lifecycle.State.RESUMED, scenario.getState());
        }
    }
    @Test public void directPageReturnsHomeWithoutLoopAndExitNeedsTwoRecentBackActions() throws Exception {
        try (ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class)) {
            home(scenario);
            scenario.onActivity(activity -> activity.getBridge().getWebView().loadUrl("https://miraath.netlify.app/invocations"));
            await(scenario, "location.pathname === '/invocations' && document.readyState === 'complete' && !!document.querySelector('main')");
            scenario.onActivity(activity -> activity.getBridge().getWebView().clearHistory());
            back(scenario);
            await(scenario, "location.pathname === '/' && document.readyState === 'complete'");
            Thread.sleep(250);
            scenario.onActivity(activity -> assertFalse("Fallback created a loop to the direct page", activity.getBridge().getWebView().canGoBack()));
            back(scenario); Thread.sleep(650);
            assertEquals("One Back at the root must keep the app open", Lifecycle.State.RESUMED, scenario.getState());
            Thread.sleep(2100);
            back(scenario); Thread.sleep(650);
            assertEquals("Expired exit confirmation must not close the app", Lifecycle.State.RESUMED, scenario.getState());
            back(scenario);
            long deadline = System.currentTimeMillis() + 5000;
            while (scenario.getState() != Lifecycle.State.CREATED && System.currentTimeMillis() < deadline) Thread.sleep(100);
            assertEquals("Two recent Back actions should background the root task", Lifecycle.State.CREATED, scenario.getState());
        }
    }
}
