package com.baytalilm.app;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.speech.RecognizerIntent;
import androidx.activity.result.ActivityResult;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.util.ArrayList;

/** Delegates microphone access to Android's visible, user-controlled speech activity. */
@CapacitorPlugin(name = "MirathVoiceSearch")
public class VoiceSearchPlugin extends Plugin {
    private boolean busy;

    static Intent speechIntent(String language) {
        if (!"fr-FR".equals(language) && !"ar-SA".equals(language)) {
            throw new IllegalArgumentException("Unsupported dictation language");
        }
        return new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
            .putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            .putExtra(RecognizerIntent.EXTRA_LANGUAGE, language)
            .putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1)
            .putExtra(RecognizerIntent.EXTRA_PROMPT, "MIRÂTH — Dicter une recherche");
    }

    static String transcript(Intent data) {
        ArrayList<String> matches = data == null ? null : data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
        if (matches == null || matches.isEmpty() || matches.get(0) == null) return "";
        String value = matches.get(0).trim();
        // Match the web field's UTF-16 length limit without splitting a surrogate pair.
        int end = Math.min(value.length(), 120);
        if (end < value.length() && end > 0 && Character.isHighSurrogate(value.charAt(end - 1))) end--;
        return value.substring(0, end);
    }

    static String errorCode(int resultCode) {
        switch (resultCode) {
            case RecognizerIntent.RESULT_AUDIO_ERROR: return "audio-capture";
            case RecognizerIntent.RESULT_NETWORK_ERROR:
            case RecognizerIntent.RESULT_SERVER_ERROR: return "network";
            case RecognizerIntent.RESULT_NO_MATCH: return "no-speech";
            default: return "native-error";
        }
    }

    @PluginMethod public void available(PluginCall call) {
        JSObject result = new JSObject();
        result.put("available", speechIntent("fr-FR").resolveActivity(getContext().getPackageManager()) != null);
        call.resolve(result);
    }

    @PluginMethod public void recognize(PluginCall call) {
        final Intent intent;
        try { intent = speechIntent(call.getString("language", "fr-FR")); }
        catch (IllegalArgumentException e) { call.reject("Unsupported language", "language-not-supported"); return; }
        getActivity().runOnUiThread(() -> {
            if (busy) { call.reject("A speech activity is already open", "busy"); return; }
            if (intent.resolveActivity(getContext().getPackageManager()) == null) {
                call.reject("No Android speech activity available", "native-unavailable"); return;
            }
            busy = true;
            try { startActivityForResult(call, intent, "speechResult"); }
            catch (ActivityNotFoundException e) { busy = false; call.reject("Android speech activity unavailable", "native-unavailable"); }
            catch (SecurityException e) { busy = false; call.reject("Android speech activity blocked", "native-error"); }
        });
    }

    @ActivityCallback private void speechResult(PluginCall call, ActivityResult result) {
        busy = false;
        if (call == null) return;
        if (result.getResultCode() == Activity.RESULT_CANCELED) {
            JSObject response = new JSObject(); response.put("cancelled", true); response.put("text", "");
            call.resolve(response); return;
        }
        if (result.getResultCode() != Activity.RESULT_OK) {
            call.reject("Android speech recognition failed", errorCode(result.getResultCode())); return;
        }
        String text = transcript(result.getData());
        if (text.isEmpty()) { call.reject("No speech recognized", "no-speech"); return; }
        JSObject response = new JSObject(); response.put("cancelled", false); response.put("text", text);
        call.resolve(response);
    }
}
