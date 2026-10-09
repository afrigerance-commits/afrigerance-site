package com.baytalilm.app;

import android.Manifest;
import android.app.NotificationManager;
import android.content.Intent;
import android.media.AudioManager;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;
import org.json.JSONArray;
import org.json.JSONObject;

@CapacitorPlugin(name = "MirathAdhan", permissions = {
    @Permission(alias = "notifications", strings = {Manifest.permission.POST_NOTIFICATIONS})
})
public class AdhanPlugin extends Plugin {
    @PluginMethod public void status(PluginCall call) {
        JSObject result = new JSObject();
        result.put("enabled", AdhanScheduler.prefs(getContext()).getBoolean("enabled", false));
        result.put("exact", AdhanScheduler.permitted(getContext()));
        result.put("notifications", getContext().getSystemService(NotificationManager.class).areNotificationsEnabled());
        result.put("next", AdhanScheduler.prefs(getContext()).getLong("next", 0));
        result.put("until", AdhanScheduler.prefs(getContext()).getLong("until", 0));
        result.put("place", AdhanScheduler.prefs(getContext()).getString("place", ""));
        result.put("lastError", AdhanScheduler.prefs(getContext()).getString("lastError", ""));
        result.put("alarmVolume", getContext().getSystemService(AudioManager.class).getStreamVolume(AudioManager.STREAM_ALARM));
        call.resolve(result);
    }
    @PluginMethod public void notifications(PluginCall call) {
        if (Build.VERSION.SDK_INT >= 33) requestPermissionForAlias("notifications", call, "notificationResult");
        else status(call);
    }
    @PermissionCallback private void notificationResult(PluginCall call) { status(call); }
    @PluginMethod public void settings(PluginCall call) {
        String kind = call.getString("kind", "exact");
        Intent intent;
        if ("notifications".equals(kind)) {
            intent = new Intent(Settings.ACTION_APP_NOTIFICATION_SETTINGS).putExtra(Settings.EXTRA_APP_PACKAGE, getContext().getPackageName());
        } else if ("volume".equals(kind)) {
            intent = new Intent(Settings.ACTION_SOUND_SETTINGS);
        } else if ("battery".equals(kind)) {
            intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS).setData(Uri.parse("package:" + getContext().getPackageName()));
        } else if (Build.VERSION.SDK_INT >= 31) {
            intent = new Intent(Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM).setData(Uri.parse("package:" + getContext().getPackageName()));
        } else { status(call); return; }
        getActivity().startActivity(intent);
        call.resolve();
    }
    @PluginMethod public void schedule(PluginCall call) {
        try {
            if (!AdhanScheduler.permitted(getContext())) throw new IllegalStateException("Autorisez les alarmes et rappels.");
            if (!getContext().getSystemService(NotificationManager.class).areNotificationsEnabled()) throw new IllegalStateException("Autorisez les notifications.");
            JSONArray input = call.getArray("events");
            if (input == null || input.length() == 0 || input.length() > 320) throw new IllegalArgumentException("Horaires invalides.");
            long previous = System.currentTimeMillis();
            for (int i = 0; i < input.length(); i++) {
                JSONObject event = input.getJSONObject(i);
                long at = event.getLong("at");
                if (at <= previous || at > System.currentTimeMillis() + 65L * 86400000 || event.getString("name").length() > 80) throw new IllegalArgumentException("Horaires invalides.");
                previous = at;
            }
            AdhanScheduler.prefs(getContext()).edit().putString("events", input.toString())
                .putBoolean("enabled", true).putLong("until", previous)
                .putString("place", call.getString("place", "")).remove("lastError").commit();
            AdhanScheduler.scheduleNext(getContext());
            status(call);
        } catch (Exception e) { call.reject(e.getMessage()); }
    }
    @PluginMethod public void disable(PluginCall call) { AdhanScheduler.disable(getContext()); status(call); }
    @PluginMethod public void test(PluginCall call) {
        try { AdhanScheduler.test(getContext()); call.resolve(); }
        catch (Exception e) { call.reject(e.getMessage()); }
    }
    @PluginMethod public void stop(PluginCall call) {
        getContext().stopService(new Intent(getContext(), AdhanService.class));
        getContext().getSystemService(android.app.AlarmManager.class).cancel(AdhanScheduler.pending(getContext(), true, 0, ""));
        call.resolve();
    }
}
