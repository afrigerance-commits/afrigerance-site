package com.baytalilm.app;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.media.AudioAttributes;
import android.media.AudioFocusRequest;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.os.Build;
import androidx.core.app.NotificationCompat;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.os.PowerManager;

public class AdhanService extends Service {
    private MediaPlayer player;
    private AudioFocusRequest focus;
    private final Handler handler = new Handler(Looper.getMainLooper());
    static volatile boolean playing = false;
    private final AudioManager.OnAudioFocusChangeListener focusListener = change -> { if (change < 0) stopSelf(); };
    @Override public int onStartCommand(Intent intent, int flags, int id) {
        if (intent == null || "STOP".equals(intent.getAction())) { stopSelf(); return START_NOT_STICKY; }
        if (player != null) return START_NOT_STICKY;
        NotificationManager manager = getSystemService(NotificationManager.class);
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationChannel channel = new NotificationChannel("adhan_playback", "Lecture de l’adhan", NotificationManager.IMPORTANCE_LOW);
            channel.setSound(null, null);
            manager.createNotificationChannel(channel);
        }
        PendingIntent stop = PendingIntent.getService(this, 902,
            new Intent(this, AdhanService.class).setAction("STOP"), PendingIntent.FLAG_IMMUTABLE);
        PendingIntent open = PendingIntent.getActivity(this, 903,
            new Intent(this, MainActivity.class), PendingIntent.FLAG_IMMUTABLE);
        startForeground(904, new NotificationCompat.Builder(this, "adhan_playback")
            .setSmallIcon(android.R.drawable.ic_lock_idle_alarm).setContentTitle("MIRÂTH · " + intent.getStringExtra("name"))
            .setContentText("Adhan de La Mecque").setContentIntent(open).setOngoing(true)
            .addAction(android.R.drawable.ic_media_pause, "Arrêter", stop).build());
        AudioAttributes attributes = new AudioAttributes.Builder()
            .setUsage(AudioAttributes.USAGE_ALARM).setContentType(AudioAttributes.CONTENT_TYPE_MUSIC).build();
        AudioManager audio = getSystemService(AudioManager.class);
        int granted;
        if (Build.VERSION.SDK_INT >= 26) {
            focus = new AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN_TRANSIENT)
                .setAudioAttributes(attributes).setOnAudioFocusChangeListener(focusListener).build();
            granted = audio.requestAudioFocus(focus);
        } else {
            granted = audio.requestAudioFocus(focusListener, AudioManager.STREAM_ALARM, AudioManager.AUDIOFOCUS_GAIN_TRANSIENT);
        }
        if (granted != AudioManager.AUDIOFOCUS_REQUEST_GRANTED) {
            AdhanScheduler.prefs(this).edit().putString("lastError", "Le son est occupé par un appel ou une autre application.").apply();
            stopSelf(); return START_NOT_STICKY;
        }
        try {
            player = new MediaPlayer();
            player.setAudioAttributes(attributes);
            player.setWakeMode(this, PowerManager.PARTIAL_WAKE_LOCK);
            try (android.content.res.AssetFileDescriptor file = getResources().openRawResourceFd(R.raw.makkah_adhan)) {
                player.setDataSource(file.getFileDescriptor(), file.getStartOffset(), file.getLength());
            }
            player.setOnCompletionListener(p -> stopSelf());
            player.setOnErrorListener((p, what, extra) -> {
                AdhanScheduler.prefs(this).edit().putString("lastError", "La lecture a été interrompue.").apply();
                stopSelf(); return true;
            });
            player.prepare();
            player.start();
            playing = true;
            AdhanScheduler.prefs(this).edit().putLong("lastPlayed", System.currentTimeMillis()).remove("lastError").apply();
            handler.postDelayed(this::stopSelf, 600000);
        } catch (Exception e) {
            AdhanScheduler.prefs(this).edit().putString("lastError", "Impossible de lire l’adhan.").apply();
            stopSelf();
        }
        return START_NOT_STICKY;
    }
    @Override public void onDestroy() {
        playing = false;
        handler.removeCallbacksAndMessages(null);
        if (player != null) { player.release(); player = null; }
        if (Build.VERSION.SDK_INT >= 26 && focus != null) getSystemService(AudioManager.class).abandonAudioFocusRequest(focus);
        else getSystemService(AudioManager.class).abandonAudioFocus(focusListener);
        stopForeground(STOP_FOREGROUND_REMOVE);
        super.onDestroy();
    }
    @Override public IBinder onBind(Intent intent) { return null; }
}
