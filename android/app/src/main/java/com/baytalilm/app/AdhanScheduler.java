package com.baytalilm.app;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import org.json.JSONArray;
import org.json.JSONObject;

/** One exact alarm at a time; the remaining dated prayers survive process death/reboot. */
final class AdhanScheduler {
    static final String PLAY = "com.baytalilm.app.ADHAN";
    static final String TEST = "com.baytalilm.app.TEST_ADHAN";
    static SharedPreferences prefs(Context c) { return c.getSharedPreferences("adhan", Context.MODE_PRIVATE); }
    static boolean permitted(Context c) {
        return Build.VERSION.SDK_INT < 31 || c.getSystemService(AlarmManager.class).canScheduleExactAlarms();
    }
    static PendingIntent pending(Context c, boolean test, long at, String name) {
        Intent intent = new Intent(c, AdhanReceiver.class).setAction(test ? TEST : PLAY)
            .putExtra("at", at).putExtra("name", name);
        return PendingIntent.getBroadcast(c, test ? 901 : 900, intent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }
    static void disable(Context c) {
        c.getSystemService(AlarmManager.class).cancel(pending(c, false, 0, ""));
        c.getSystemService(AlarmManager.class).cancel(pending(c, true, 0, ""));
        prefs(c).edit().putBoolean("enabled", false).putString("events", "[]").remove("next").apply();
        c.stopService(new Intent(c, AdhanService.class));
    }
    static void scheduleNext(Context c) {
        AlarmManager manager = c.getSystemService(AlarmManager.class);
        manager.cancel(pending(c, false, 0, ""));
        prefs(c).edit().remove("next").apply();
        if (!prefs(c).getBoolean("enabled", false) || !permitted(c)) return;
        try {
            JSONArray events = new JSONArray(prefs(c).getString("events", "[]"));
            for (int i = 0; i < events.length(); i++) {
                JSONObject event = events.getJSONObject(i);
                long at = event.getLong("at");
                if (at <= System.currentTimeMillis()) continue;
                manager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at,
                    pending(c, false, at, event.getString("name")));
                prefs(c).edit().putLong("next", at).apply();
                return;
            }
        } catch (Exception e) { prefs(c).edit().putString("lastError", "Impossible de programmer l’adhan. Réactivez-le dans les réglages.").apply(); }
    }
    static void test(Context c) {
        if (!permitted(c)) throw new IllegalStateException("Autorisez les alarmes et rappels.");
        long at = System.currentTimeMillis() + 15000;
        c.getSystemService(AlarmManager.class).setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at,
            pending(c, true, at, "Test de l’adhan"));
    }
}
