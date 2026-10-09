package com.baytalilm.app;

import static org.junit.Assert.*;
import android.app.AlarmManager;
import android.content.Context;
import android.content.Intent;
import android.os.ParcelFileDescriptor;
import androidx.lifecycle.Lifecycle;
import androidx.test.core.app.ActivityScenario;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.platform.app.InstrumentationRegistry;
import java.io.FileInputStream;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(AndroidJUnit4.class)
public class AdhanAlarmTest {
    private void shell(String command) throws Exception {
        try (ParcelFileDescriptor fd = InstrumentationRegistry.getInstrumentation().getUiAutomation().executeShellCommand(command);
             FileInputStream stream = new FileInputStream(fd.getFileDescriptor())) {
            while (stream.read() != -1) { /* wait for shell completion */ }
        }
    }
    @Test public void exactAlarmPlaysWhileScreenOffAndCanBeStopped() throws Exception {
        Context c = InstrumentationRegistry.getInstrumentation().getTargetContext();
        shell("appops set com.baytalilm.app SCHEDULE_EXACT_ALARM allow");
        shell("pm grant com.baytalilm.app android.permission.POST_NOTIFICATIONS");
        assertTrue(AdhanScheduler.permitted(c));
        try (ActivityScenario<MainActivity> scenario = ActivityScenario.launch(MainActivity.class)) {
            AdhanScheduler.disable(c);
            long first = System.currentTimeMillis() + 8000;
            long second = first + 3600000;
            JSONArray events = new JSONArray().put(new JSONObject().put("at", first).put("name", "Test prière"))
                .put(new JSONObject().put("at", second).put("name", "Prière suivante"));
            AdhanScheduler.prefs(c).edit().putBoolean("enabled", true).putString("events", events.toString()).commit();
            AdhanScheduler.scheduleNext(c);
            assertEquals(first, AdhanScheduler.prefs(c).getLong("next", 0));
            // A boot event must only restore the pending alarm, never play audio immediately.
            new AdhanReceiver().onReceive(c, new Intent(Intent.ACTION_BOOT_COMPLETED));
            assertFalse(AdhanService.playing);
            scenario.moveToState(Lifecycle.State.CREATED);
            shell("input keyevent 223"); // KEYCODE_SLEEP
            long deadline = System.currentTimeMillis() + 35000;
            while (!AdhanService.playing && System.currentTimeMillis() < deadline) Thread.sleep(250);
            assertTrue("Alarm receiver did not start native audio with screen off: " + AdhanScheduler.prefs(c).getString("lastError", ""), AdhanService.playing);
            assertTrue(AdhanScheduler.prefs(c).getLong("lastPlayed", 0) >= first);
            assertEquals(second, AdhanScheduler.prefs(c).getLong("next", 0));
            c.startService(new Intent(c, AdhanService.class).setAction("STOP"));
            deadline = System.currentTimeMillis() + 5000;
            while (AdhanService.playing && System.currentTimeMillis() < deadline) Thread.sleep(100);
            assertFalse("Stop notification action did not release audio", AdhanService.playing);
            AdhanScheduler.disable(c);
            assertFalse(AdhanScheduler.prefs(c).getBoolean("enabled", true));
            assertEquals(0, AdhanScheduler.prefs(c).getLong("next", 0));
        } finally {
            AdhanScheduler.disable(c);
            shell("input keyevent 224"); // KEYCODE_WAKEUP
            shell("wm dismiss-keyguard");
        }
    }
}
