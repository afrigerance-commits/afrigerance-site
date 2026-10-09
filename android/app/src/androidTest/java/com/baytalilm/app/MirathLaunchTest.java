package com.baytalilm.app;

import static org.junit.Assert.*;
import android.content.Context;
import android.webkit.WebView;
import androidx.test.core.app.ActivityScenario;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.platform.app.InstrumentationRegistry;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(AndroidJUnit4.class)
public class MirathLaunchTest {
    private String read(ActivityScenario<MainActivity> scenario, String expression) throws Exception {
        AtomicReference<String> value = new AtomicReference<>("");
        CountDownLatch done = new CountDownLatch(1);
        scenario.onActivity(activity -> activity.getBridge().getWebView().evaluateJavascript(expression, result -> {
            value.set(result);
            done.countDown();
        }));
        assertTrue("WebView did not answer", done.await(10, TimeUnit.SECONDS));
        return value.get();
    }

    private void awaitPage(ActivityScenario<MainActivity> scenario, String expression) throws Exception {
        long deadline = System.currentTimeMillis() + 60000;
        while (System.currentTimeMillis() < deadline) {
            if ("true".equals(read(scenario, expression))) return;
            Thread.sleep(500);
        }
        fail("MIRATH page content was not loaded: " + read(scenario, "document.title + ' ' + location.href"));
    }

    @Test public void launchAndReadArabicInvocation() throws Exception {
        Context context = InstrumentationRegistry.getInstrumentation().getTargetContext();
        assertEquals("com.baytalilm.app", context.getPackageName());
        assertEquals("MIRÂTH", context.getString(R.string.app_name));
        try (ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class)) {
            awaitPage(scenario, "location.origin === 'https://miraath.netlify.app' && !!document.querySelector('main') && document.title.includes('MIRÂTH')");
            scenario.onActivity(activity -> activity.getBridge().getWebView().loadUrl("https://miraath.netlify.app/invocations/famille-et-enfants"));
            awaitPage(scenario, "location.pathname === '/invocations/famille-et-enfants' && !!document.getElementById('quran-25-74')");
            assertEquals("true", read(scenario, "Array.from(document.querySelectorAll('[dir=rtl]')).some(el => /[\\u0600-\\u06ff]/.test(el.textContent))"));
            assertEquals("true", read(scenario, "Array.from(document.querySelectorAll('button')).some(el => el.textContent.includes('Copier'))"));
            assertEquals("0", read(scenario, "document.querySelectorAll('audio').length"));
            assertEquals("true", read(scenario, "document.documentElement.scrollWidth <= innerWidth + 2"));
        }
    }

    @Test public void bottomTabsAndFrenchPreferenceWorkInAndroid() throws Exception {
        try (ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class)) {
            awaitPage(scenario, "!!document.querySelector('.mobile-app-dock[data-native=true]')");
            assertEquals("true", read(scenario, "(() => { const nav = document.querySelector('.mobile-app-dock'); const bounds = nav.getBoundingClientRect(); return nav.querySelectorAll('a,button').length === 5 && bounds.height > 0 && bounds.bottom <= innerHeight + 2; })()"));
            scenario.onActivity(activity -> activity.getBridge().getWebView().loadUrl("https://miraath.netlify.app/coran/1"));
            awaitPage(scenario, "location.pathname === '/coran/1' && !!document.querySelector('.mobile-app-dock[data-native=true]') && !!Array.from(document.querySelectorAll('label')).find(el => el.textContent.includes('Youssouf Leclerc'))");
            read(scenario, "(() => { const label = Array.from(document.querySelectorAll('label')).find(el => el.textContent.includes('Youssouf Leclerc')); const input = label.querySelector('input'); if (!input.checked) input.click(); })()");
            awaitPage(scenario, "document.body.textContent.includes('Alternance activée') && localStorage.getItem('mirath:quran:french-audio') === 'true'");
            assertEquals("true", read(scenario, "document.documentElement.scrollWidth <= innerWidth + 2"));
            read(scenario, "document.querySelector('.mobile-app-dock a[href=\"/hadith\"]').click()");
            awaitPage(scenario, "location.pathname === '/hadith' && !!document.querySelector('.mobile-app-dock a[href=\"/hadith\"][aria-current=page]')");
            read(scenario, "document.querySelector('.mobile-app-dock button[aria-label=\"Plus de rubriques\"]').click()");
            awaitPage(scenario, "!!document.querySelector('[role=dialog]') && document.querySelector('[role=dialog]').textContent.includes('Explorer MIRÂTH')");
            assertEquals("true", read(scenario, "(() => { const bounds = document.querySelector('[role=dialog]').getBoundingClientRect(); return bounds.left >= -2 && bounds.right <= innerWidth + 2 && bounds.top >= -2 && bounds.bottom <= innerHeight + 2; })()"));
            read(scenario, "document.querySelector('[role=dialog] a[href=\"/invocations\"]').click()");
            awaitPage(scenario, "location.pathname === '/invocations' && !document.querySelector('[role=dialog]')");
            read(scenario, "localStorage.removeItem('mirath:quran:french-audio')");
        }
    }
}
