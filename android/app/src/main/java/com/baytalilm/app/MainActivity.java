package com.baytalilm.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override public void onCreate(Bundle savedInstanceState) {
        registerPlugin(AdhanPlugin.class);
        registerPlugin(QuranAudioPlugin.class);
        registerPlugin(VoiceSearchPlugin.class);
        super.onCreate(savedInstanceState);
        AdhanScheduler.scheduleNext(this);
    }
}
