package com.baytalilm.app;

import static org.junit.Assert.*;
import static androidx.test.espresso.intent.Intents.*;
import static androidx.test.espresso.intent.matcher.IntentMatchers.hasAction;
import android.app.Activity;
import android.app.Instrumentation;
import android.content.Intent;
import android.speech.RecognizerIntent;
import androidx.test.core.app.ActivityScenario;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;
import org.junit.Test;
import org.junit.runner.RunWith;

/** Intent and bridge tests use simulated results, not real speech recognition or a microphone. */
@RunWith(AndroidJUnit4.class)
public class VoiceSearchTest {
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
        long deadline = System.currentTimeMillis() + 30000;
        while (System.currentTimeMillis() < deadline) {
            if ("true".equals(read(scenario, expression))) return;
            Thread.sleep(200);
        }
        fail("Speech bridge did not answer: " + read(scenario, "JSON.stringify(window.__speechResult)"));
    }
    private void request(ActivityScenario<MainActivity> scenario, String language) throws Exception {
        await(scenario, "typeof window.Capacitor?.nativePromise === 'function'");
        read(scenario, "window.__speechResult = null; window.Capacitor.nativePromise('MirathVoiceSearch', 'recognize', {language:'" + language + "'}).then(result => window.__speechResult = result).catch(error => window.__speechResult = {error:error.code}); true");
        await(scenario, "window.__speechResult !== null");
    }
    @Test public void speechIntentRequestsSelectedLanguageAndTextOnly() {
        for (String language : Arrays.asList("fr-FR", "ar-SA")) {
            Intent intent = VoiceSearchPlugin.speechIntent(language);
            assertEquals(RecognizerIntent.ACTION_RECOGNIZE_SPEECH, intent.getAction());
            assertEquals(language, intent.getStringExtra(RecognizerIntent.EXTRA_LANGUAGE));
            assertEquals(RecognizerIntent.LANGUAGE_MODEL_FREE_FORM, intent.getStringExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL));
            assertFalse(intent.hasExtra(RecognizerIntent.EXTRA_RESULTS_PENDINGINTENT));
        }
        try { VoiceSearchPlugin.speechIntent("unexpected"); fail("Invalid language accepted"); }
        catch (IllegalArgumentException expected) { }
        assertEquals("", VoiceSearchPlugin.transcript(null));
        Intent data = new Intent().putStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS, new ArrayList<>(Arrays.asList("  صلاة الفجر  ", "other")));
        assertEquals("صلاة الفجر", VoiceSearchPlugin.transcript(data));
    }
    @Test public void nativeResultIsReturnedToWebViewAndProviderErrorsAreMapped() throws Exception {
        init();
        try (ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class)) {
            scenario.onActivity(activity -> assertNotNull(activity.getBridge().getPlugin("MirathVoiceSearch")));
            Intent data = new Intent().putStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS, new ArrayList<>(Arrays.asList("صلاة الفجر")));
            intending(hasAction(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)).respondWith(new Instrumentation.ActivityResult(Activity.RESULT_OK, data));
            request(scenario, "ar-SA");
            assertEquals("true", read(scenario, "window.__speechResult.text === 'صلاة الفجر' && window.__speechResult.cancelled === false"));
            intended(hasAction(RecognizerIntent.ACTION_RECOGNIZE_SPEECH));
        } finally { release(); }
        assertEquals("network", VoiceSearchPlugin.errorCode(RecognizerIntent.RESULT_NETWORK_ERROR));
        assertEquals("audio-capture", VoiceSearchPlugin.errorCode(RecognizerIntent.RESULT_AUDIO_ERROR));
    }
    @Test public void nativeCancellationReturnsNoText() throws Exception {
        init();
        try (ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class)) {
            intending(hasAction(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)).respondWith(new Instrumentation.ActivityResult(Activity.RESULT_CANCELED, null));
            request(scenario, "fr-FR");
            assertEquals("true", read(scenario, "window.__speechResult.cancelled === true && window.__speechResult.text === ''"));
        } finally { release(); }
    }
    @Test public void nativeNetworkFailureReturnsAnActionableError() throws Exception {
        init();
        try (ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class)) {
            intending(hasAction(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)).respondWith(new Instrumentation.ActivityResult(RecognizerIntent.RESULT_NETWORK_ERROR, null));
            request(scenario, "fr-FR");
            assertEquals("true", read(scenario, "window.__speechResult.error === 'network'"));
        } finally { release(); }
    }
}
