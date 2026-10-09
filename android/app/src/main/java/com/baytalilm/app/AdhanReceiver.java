package com.baytalilm.app;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class AdhanReceiver extends BroadcastReceiver {
    @Override public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        boolean test = AdhanScheduler.TEST.equals(action);
        if (!test && !AdhanScheduler.PLAY.equals(action)) {
            // Android 15 forbids media playback services at boot: only rearm the next alarm.
            AdhanScheduler.scheduleNext(context);
            return;
        }
        long at = intent.getLongExtra("at", 0);
        if (!test && (!AdhanScheduler.prefs(context).getBoolean("enabled", false)
            || at != AdhanScheduler.prefs(context).getLong("next", 0))) return;
        if (!test) AdhanScheduler.scheduleNext(context);
        // Do not play a missed prayer long after its actual time.
        if (Math.abs(System.currentTimeMillis() - at) > 120000) return;
        try {
            androidx.core.content.ContextCompat.startForegroundService(context, new Intent(context, AdhanService.class)
                .putExtra("name", intent.getStringExtra("name")));
        } catch (RuntimeException e) {
            AdhanScheduler.prefs(context).edit().putString("lastError", "Android a bloqué la lecture. Vérifiez les autorisations et les restrictions de batterie.").apply();
        }
    }
}
