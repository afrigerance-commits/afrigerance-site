package com.baytalilm.app;

import android.content.ComponentName;
import android.net.Uri;
import android.util.Base64;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import androidx.core.content.ContextCompat;
import androidx.media3.common.C;
import androidx.media3.common.MediaItem;
import androidx.media3.common.MediaMetadata;
import androidx.media3.common.Player;
import androidx.media3.session.MediaController;
import androidx.media3.session.SessionCommand;
import androidx.media3.session.SessionToken;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.common.util.concurrent.ListenableFuture;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;
import org.json.JSONObject;

@CapacitorPlugin(name = "MirathQuranAudio")
@androidx.annotation.OptIn(markerClass = androidx.media3.common.util.UnstableApi.class)
public class QuranAudioPlugin extends Plugin {
    private ListenableFuture<MediaController> future;
    private MediaController controller;
    private final Handler handler = new Handler(Looper.getMainLooper());
    private final Runnable tick = new Runnable() {
        @Override public void run() { emit(false); handler.postDelayed(this, 500); }
    };
    @Override public void load() {
        handler.post(() -> {
            future = new MediaController.Builder(getContext(), new SessionToken(getContext(),
                new ComponentName(getContext(), QuranPlaybackService.class))).buildAsync();
            future.addListener(() -> {
                try {
                    controller = future.get();
                    controller.addListener(new Player.Listener() {
                        @Override public void onEvents(Player player, Player.Events events) { emit(); }
                    });
                    handler.post(tick);
                } catch (Exception ignored) { /* Method calls return a concrete connection failure. */ }
            }, ContextCompat.getMainExecutor(getContext()));
        });
    }
    private void withController(PluginCall call, Consumer<MediaController> action) {
        handler.post(() -> {
            if (future == null) { call.reject("Le lecteur Android n’est pas connecté."); return; }
            future.addListener(() -> {
                try { action.accept(future.get()); }
                catch (Exception e) { call.reject("Le lecteur Android n’est pas disponible.", e); }
            }, ContextCompat.getMainExecutor(getContext()));
        });
    }
    private JSObject state(MediaController c, boolean includeTracks) {
        JSObject result = new JSObject();
        boolean ended = c.getPlaybackState() == Player.STATE_ENDED;
        result.put("active", c.getMediaItemCount() > 0 && !ended);
        result.put("repeat", c.getRepeatMode() != Player.REPEAT_MODE_OFF);
        result.put("ended", ended); result.put("paused", !c.getPlayWhenReady() || (c.getPlaybackSuppressionReason() != Player.PLAYBACK_SUPPRESSION_REASON_NONE));
        result.put("loading", c.getPlaybackState() == Player.STATE_BUFFERING);
        result.put("position", Math.max(0, c.getCurrentPosition()) / 1000.0);
        result.put("duration", c.getDuration() == C.TIME_UNSET ? 0 : Math.max(0, c.getDuration()) / 1000.0);
        result.put("sleepUntil", c.getSessionExtras().getLong("sleepUntil", 0));
        JSArray tracks = new JSArray();
        try {
            for (int i = 0; includeTracks && i < c.getMediaItemCount(); i++) {
                Bundle extras = c.getMediaItemAt(i).mediaMetadata.extras;
                if (extras != null) tracks.put(new JSONObject(extras.getString("track", "{}")));
            }
            MediaItem item = c.getCurrentMediaItem();
            if (item != null && item.mediaMetadata.extras != null) result.put("track", new JSONObject(item.mediaMetadata.extras.getString("track", "{}")));
        } catch (Exception ignored) { }
        result.put("tracks", tracks);
        if (c.getPlayerError() != null) result.put("error", "Cette piste n’a pas pu être chargée. Vérifiez votre connexion puis touchez Reprendre.");
        return result;
    }
    private void emit() { emit(true); }
    private void emit(boolean includeTracks) { if (controller != null) notifyListeners("playbackState", state(controller, includeTracks)); }
    private static boolean allowed(String value) {
        Uri uri = Uri.parse(value);
        if ("asset:///quran_pause.wav".equals(value)) return true;
        if (!"https".equals(uri.getScheme()) || uri.getUserInfo() != null || uri.getPort() != -1 || uri.getQuery() != null || uri.getFragment() != null) return false;
        String host = uri.getHost(), path = uri.getPath();
        return ("cdn.islamic.network".equals(host) && path.matches("/quran/audio/[0-9]+/[\\w.-]+/[0-9]+\\.mp3"))
            || ("everyayah.com".equals(host) && path.matches("/data/[\\w-]+/[0-9]{6}\\.mp3"))
            || ("download.tvquran.com".equals(host) && path.matches("/download/recitations/355/280/[0-9]{3}\\.mp3"));
    }
    @PluginMethod public void load(PluginCall call) {
        final List<MediaItem> items = new ArrayList<>();
        try {
            JSArray tracks = call.getArray("tracks");
            if (tracks == null || tracks.length() == 0 || tracks.length() > 13000) throw new IllegalArgumentException();
            for (int i = 0; i < tracks.length(); i++) {
                JSONObject track = tracks.getJSONObject(i);
                org.json.JSONArray urls = track.getJSONArray("urls");
                if (urls.length() == 0 || urls.length() > 10) throw new IllegalArgumentException();
                for (int n = 0; n < urls.length(); n++) if (!allowed(urls.getString(n))) throw new IllegalArgumentException();
                Bundle extras = new Bundle(); extras.putString("track", track.toString());
                MediaItem.Builder item = new MediaItem.Builder().setMediaId(track.getString("id"))
                    .setUri(localUri(urls.getString(0))).setMediaMetadata(new MediaMetadata.Builder()
                        .setTitle(track.getString("title")).setArtist(track.getString("artist"))
                        .setAlbumTitle("MIRÂTH").setExtras(extras).build());
                if (track.has("silenceMs")) {
                    long delay = track.getLong("silenceMs");
                    if (delay <= 0 || delay > 30000 || !"asset:///quran_pause.wav".equals(urls.getString(0))) throw new IllegalArgumentException();
                    item.setClippingConfiguration(new MediaItem.ClippingConfiguration.Builder().setEndPositionMs(delay).build());
                }
                items.add(item.build());
            }
        } catch (Exception e) { call.reject("La liste audio est invalide."); return; }
        int start = call.getInt("startIndex", 0);
        if (start < 0 || start >= items.size()) { call.reject("Position audio invalide."); return; }
        withController(call, c -> {
            c.setMediaItems(items, start, Math.max(0, (long)(call.getDouble("position", 0.0) * 1000)));
            c.setRepeatMode(call.getBoolean("repeat", false) ? Player.REPEAT_MODE_ALL : Player.REPEAT_MODE_OFF);
            c.prepare(); c.setPlayWhenReady(!call.getBoolean("paused", false));
            sleep(c, call.getDouble("sleepUntil", 0.0).longValue());
            call.resolve();
        });
    }
    private void sleep(MediaController c, long until) {
        Bundle args = new Bundle(); args.putLong("until", until);
        c.sendCustomCommand(new SessionCommand(QuranPlaybackService.SLEEP, Bundle.EMPTY), args);
    }
    private File audioFile(String url) throws Exception {
        byte[] hash=MessageDigest.getInstance("SHA-256").digest(url.getBytes(StandardCharsets.UTF_8));
        StringBuilder name=new StringBuilder();for(byte b:hash)name.append(String.format("%02x",b));
        File directory=new File(getContext().getFilesDir(),"quran-downloads");
        if(!directory.exists()&&!directory.mkdirs())throw new IllegalStateException("Stockage indisponible");
        return new File(directory,name+".mp3");
    }
    private Uri localUri(String url) throws Exception {
        if(url.startsWith("https:")){File file=audioFile(url);if(file.isFile()&&file.length()>0)return Uri.fromFile(file);}
        return Uri.parse(url);
    }
    @PluginMethod public void cacheAudio(PluginCall call) {
        try {
            String url=call.getString("url"), data=call.getString("base64");
            if(url==null||!url.startsWith("https:")||!allowed(url)||data==null||data.length()>42*1024*1024)throw new IllegalArgumentException();
            File target=audioFile(url);
            if(!target.isFile()||target.length()==0){
                byte[] bytes=Base64.decode(data,Base64.DEFAULT);
                if(bytes.length==0||bytes.length>30*1024*1024)throw new IllegalArgumentException();
                File temporary=new File(target.getPath()+".tmp");
                try(FileOutputStream out=new FileOutputStream(temporary)){out.write(bytes);}
                if(!temporary.renameTo(target)){temporary.delete();throw new IllegalStateException();}
            }
            call.resolve();
        }catch(Exception e){call.reject("Impossible de préparer cette piste hors connexion.",e);}
    }
    @PluginMethod public void removeCachedAudio(PluginCall call) {
        try {
            JSArray urls=call.getArray("urls");if(urls==null||urls.length()>13000)throw new IllegalArgumentException();
            for(int i=0;i<urls.length();i++){String url=urls.getString(i);if(!allowed(url)||!url.startsWith("https:"))throw new IllegalArgumentException();File file=audioFile(url);if(file.exists()&&!file.delete())throw new IllegalStateException();}
            call.resolve();
        }catch(Exception e){call.reject("Impossible de supprimer les pistes téléchargées.",e);}
    }
    @PluginMethod public void getState(PluginCall call) { withController(call, c -> call.resolve(state(c, true))); }
    @PluginMethod public void pause(PluginCall call) { withController(call, c -> { c.pause(); call.resolve(); }); }
    @PluginMethod public void resume(PluginCall call) { withController(call, c -> { c.prepare(); c.play(); call.resolve(); }); }
    @PluginMethod public void stop(PluginCall call) { withController(call, c -> { c.stop(); c.clearMediaItems(); sleep(c, 0); call.resolve(); }); }
    @PluginMethod public void seek(PluginCall call) { withController(call, c -> { c.seekTo(Math.max(0, (long)(call.getDouble("seconds", 0.0) * 1000))); call.resolve(); }); }
    @PluginMethod public void setSleep(PluginCall call) { withController(call, c -> { sleep(c, call.getDouble("until", 0.0).longValue()); call.resolve(); }); }
    @Override protected void handleOnResume() { handler.removeCallbacks(tick); if (controller != null) { emit(); handler.post(tick); } }
    @Override protected void handleOnStop() { handler.removeCallbacks(tick); }
    @Override protected void handleOnDestroy() {
        handler.removeCallbacksAndMessages(null);
        // Releasing this UI connection must NOT stop the service or its playlist.
        if (future != null) MediaController.releaseFuture(future);
        controller = null;
    }
}
