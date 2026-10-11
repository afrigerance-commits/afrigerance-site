package com.baytalilm.app;

import android.app.PendingIntent;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import androidx.annotation.Nullable;
import androidx.media3.common.AudioAttributes;
import androidx.media3.common.C;
import androidx.media3.common.MediaItem;
import androidx.media3.common.PlaybackException;
import androidx.media3.common.Player;
import androidx.media3.exoplayer.ExoPlayer;
import androidx.media3.session.MediaSession;
import androidx.media3.session.MediaSessionService;
import androidx.media3.session.SessionCommand;
import androidx.media3.session.SessionResult;
import com.google.common.util.concurrent.Futures;
import com.google.common.util.concurrent.ListenableFuture;
import org.json.JSONArray;
import org.json.JSONObject;

/** The queue, audio focus and sleep deadline live here, independently of the WebView. */
@androidx.media3.common.util.UnstableApi
public class QuranPlaybackService extends MediaSessionService {
    static final String SLEEP = "mirath.SET_SLEEP";
    private MediaSession session;
    private ExoPlayer player;
    private final Handler handler = new Handler(Looper.getMainLooper());
    private long sleepUntil = 0;
    private String retryId = "";
    private int retryIndex = 0;
    private final Runnable sleep = () -> {
        if (player != null) { player.stop(); player.clearMediaItems(); }
        setSleep(0);
    };

    @Override public void onCreate() {
        super.onCreate();
        player = new ExoPlayer.Builder(this).build();
        player.setAudioAttributes(new AudioAttributes.Builder().setUsage(C.USAGE_MEDIA)
            .setContentType(C.AUDIO_CONTENT_TYPE_SPEECH).build(), true);
        player.setHandleAudioBecomingNoisy(true);
        player.setWakeMode(C.WAKE_MODE_NETWORK);
        PendingIntent open = PendingIntent.getActivity(this, 1101,
            new Intent(this, MainActivity.class), PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);
        session = new MediaSession.Builder(this, player).setSessionActivity(open)
            .setCallback(new MediaSession.Callback() {
                @Override public MediaSession.ConnectionResult onConnect(MediaSession s, MediaSession.ControllerInfo c) {
                    MediaSession.ConnectionResult base = MediaSession.Callback.super.onConnect(s, c);
                    if (!getPackageName().equals(c.getPackageName())) return base;
                    return new MediaSession.ConnectionResult.AcceptedResultBuilder(s)
                        .setAvailableSessionCommands(base.availableSessionCommands.buildUpon()
                            .add(new SessionCommand(SLEEP, Bundle.EMPTY)).build()).build();
                }
                @Override public ListenableFuture<SessionResult> onCustomCommand(MediaSession s,
                    MediaSession.ControllerInfo c, SessionCommand command, Bundle args) {
                    if (SLEEP.equals(command.customAction) && getPackageName().equals(c.getPackageName())) {
                        setSleep(args.getLong("until", 0));
                        return Futures.immediateFuture(new SessionResult(SessionResult.RESULT_SUCCESS));
                    }
                    return Futures.immediateFuture(new SessionResult(SessionResult.RESULT_ERROR_NOT_SUPPORTED));
                }
            }).build();
        player.addListener(new Player.Listener() {
            @Override public void onMediaItemTransition(@Nullable MediaItem item, int reason) {
                if (item != null && !item.mediaId.equals(retryId)) { retryId = item.mediaId; retryIndex = 0; }
            }
            @Override public void onPlaybackStateChanged(int state) {
                if (state == Player.STATE_ENDED) handler.post(() -> { if (player != null && player.getPlaybackState() == Player.STATE_ENDED) { player.clearMediaItems(); setSleep(0); } });
            }
            @Override public void onPlayerError(PlaybackException error) {
                // Exhaust the verified alternatives for this same verse; never skip a failed verse.
                MediaItem item = player.getCurrentMediaItem();
                if (item == null || item.mediaMetadata.extras == null) return;
                try {
                    JSONObject track = new JSONObject(item.mediaMetadata.extras.getString("track", "{}"));
                    JSONArray urls = track.getJSONArray("urls");
                    int next = ++retryIndex;
                    if (next >= urls.length()) return;
                    int index = player.getCurrentMediaItemIndex();
                    player.replaceMediaItem(index, item.buildUpon().setUri(Uri.parse(urls.getString(next))).build());
                    player.seekTo(index, 0); player.prepare(); player.play();
                } catch (Exception ignored) { /* UI exposes the player error; no unrelated recording is substituted. */ }
            }
        });
    }
    private void setSleep(long until) {
        handler.removeCallbacks(sleep);
        sleepUntil = until > System.currentTimeMillis() ? until : 0;
        Bundle extras = new Bundle(); extras.putLong("sleepUntil", sleepUntil); session.setSessionExtras(extras);
        if (sleepUntil > 0) handler.postDelayed(sleep, sleepUntil - System.currentTimeMillis());
    }
    @Nullable @Override public MediaSession onGetSession(MediaSession.ControllerInfo controller) {
        return getPackageName().equals(controller.getPackageName()) || controller.isTrusted() ? session : null;
    }
    @Override public void onDestroy() {
        handler.removeCallbacksAndMessages(null);
        if (session != null) { player.release(); session.release(); session = null; player = null; }
        super.onDestroy();
    }
}
