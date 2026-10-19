package com.baytalilm.app;

/** Test APK only: makes the speech intent resolvable even on an emulator without a speech provider. */
public class SpeechTestActivity extends android.app.Activity {
    @Override protected void onCreate(android.os.Bundle state) {
        super.onCreate(state);
        setResult(RESULT_CANCELED);
        finish();
    }
}
