package com.baytalilm.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private AppBackNavigation backNavigation;
    @Override public void onCreate(Bundle savedInstanceState) {
        registerPlugin(AdhanPlugin.class);
        registerPlugin(QuranAudioPlugin.class);
        registerPlugin(VoiceSearchPlugin.class);
        super.onCreate(savedInstanceState);
        if (getBridge() != null) backNavigation = new AppBackNavigation(this, getBridge());
        AdhanScheduler.scheduleNext(this);
    }

    @Override public void onPause() {
        if (backNavigation != null) backNavigation.resetExit();
        super.onPause();
    }

    @Override public void onDestroy() {
        if (backNavigation != null) backNavigation.destroy();
        super.onDestroy();
    }
}
