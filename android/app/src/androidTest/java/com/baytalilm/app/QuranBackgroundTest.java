package com.baytalilm.app;

import static org.junit.Assert.*;
import android.content.ComponentName;
import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.os.ParcelFileDescriptor;
import androidx.lifecycle.Lifecycle;
import androidx.media3.common.MediaItem;
import androidx.media3.common.Player;
import androidx.media3.session.MediaController;
import androidx.media3.session.SessionCommand;
import androidx.media3.session.SessionToken;
import androidx.test.core.app.ActivityScenario;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.platform.app.InstrumentationRegistry;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.Arrays;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;
import org.junit.Test;
import org.junit.runner.RunWith;

/** Synthetic silent WAV fixture: tests lifecycle and sequencing, not recitation contents. */
@RunWith(AndroidJUnit4.class)
@androidx.media3.common.util.UnstableApi
public class QuranBackgroundTest {
    private void main(Runnable task) { InstrumentationRegistry.getInstrumentation().runOnMainSync(task); }
    private void shell(String command) throws Exception {
        try (ParcelFileDescriptor fd = InstrumentationRegistry.getInstrumentation().getUiAutomation().executeShellCommand(command);
             FileInputStream stream = new FileInputStream(fd.getFileDescriptor())) { while (stream.read() != -1) {} }
    }
    private File fixture(Context context) throws Exception {
        File file = new File(context.getCacheDir(), "quran-lifecycle-fixture.wav");
        int bytes = 8000 * 2 * 4;
        ByteBuffer b = ByteBuffer.allocate(44 + bytes).order(ByteOrder.LITTLE_ENDIAN);
        b.put("RIFF".getBytes()).putInt(36 + bytes).put("WAVEfmt ".getBytes()).putInt(16)
            .putShort((short)1).putShort((short)1).putInt(8000).putInt(16000).putShort((short)2)
            .putShort((short)16).put("data".getBytes()).putInt(bytes);
        try (FileOutputStream out = new FileOutputStream(file)) { out.write(b.array()); }
        return file;
    }
    private MediaController connect(Context c) throws Exception {
        AtomicReference<com.google.common.util.concurrent.ListenableFuture<MediaController>> future = new AtomicReference<>();
        main(() -> future.set(new MediaController.Builder(c, new SessionToken(c,new ComponentName(c,QuranPlaybackService.class))).buildAsync()));
        return future.get().get(10,TimeUnit.SECONDS);
    }
    private int index(MediaController c) { AtomicReference<Integer> n=new AtomicReference<>();main(()->n.set(c.getCurrentMediaItemIndex()));return n.get(); }
    private boolean playing(MediaController c) { AtomicReference<Boolean> p=new AtomicReference<>();main(()->p.set(c.isPlaying()));return p.get(); }
    private long position(MediaController c) { AtomicReference<Long> p=new AtomicReference<>();main(()->p.set(c.getCurrentPosition()));return p.get(); }
    private void awaitPlaying(MediaController c) throws Exception {
        long deadline=System.currentTimeMillis()+10000;while(!playing(c)&&System.currentTimeMillis()<deadline)Thread.sleep(100);assertTrue("Native playback did not start",playing(c));
    }
    @Test public void playlistContinuesWithScreenOffAndSurvivesActivityClose() throws Exception {
        Context context=InstrumentationRegistry.getInstrumentation().getTargetContext();
        MediaController c=null;
        try(ActivityScenario<MainActivity> activity=ActivityScenario.launch(MainActivity.class)) {
            c=connect(context); final MediaController player=c; Uri uri=Uri.fromFile(fixture(context));
            main(()->{player.setMediaItems(Arrays.asList(new MediaItem.Builder().setMediaId("arabic-1").setUri(uri).build(),new MediaItem.Builder().setMediaId("french-1").setUri(uri).build(),new MediaItem.Builder().setMediaId("arabic-2").setUri(uri).build()));player.prepare();player.play();});
            awaitPlaying(c);
            activity.moveToState(Lifecycle.State.CREATED);shell("input keyevent 223");
            long deadline=System.currentTimeMillis()+7000;
            while(index(c)<1&&System.currentTimeMillis()<deadline)Thread.sleep(100);
            assertEquals("Queue did not advance while WebView was backgrounded",1,index(c));
            assertTrue(playing(c));
            main(player::pause);Thread.sleep(250);long pausedAt=position(c);Thread.sleep(500);
            assertFalse(playing(c));assertTrue(Math.abs(position(c)-pausedAt)<150);
            main(player::play);awaitPlaying(c);
            // Destroying the Activity must leave the service playing its already-loaded queue.
            activity.close();Thread.sleep(250);assertTrue(playing(c));
            main(()->{player.stop();player.clearMediaItems();});
            assertFalse(playing(c));
        } finally {
            if(c!=null){final MediaController p=c;main(()->{p.stop();p.clearMediaItems();p.release();});}
            shell("input keyevent 224");shell("wm dismiss-keyguard");
        }
    }
    @Test public void nativeSleepDeadlineStopsWithoutJavascript() throws Exception {
        Context context=InstrumentationRegistry.getInstrumentation().getTargetContext();MediaController c=null;
        try(ActivityScenario<MainActivity> activity=ActivityScenario.launch(MainActivity.class)){
            c=connect(context);final MediaController p=c;Uri uri=Uri.fromFile(fixture(context));
            main(()->{p.setMediaItem(new MediaItem.Builder().setUri(uri).build());p.setRepeatMode(Player.REPEAT_MODE_ALL);p.prepare();p.play();});
            awaitPlaying(c);
            main(()->{Bundle args=new Bundle();args.putLong("until",System.currentTimeMillis()+1500);p.sendCustomCommand(new SessionCommand(QuranPlaybackService.SLEEP,Bundle.EMPTY),args);});
            activity.moveToState(Lifecycle.State.CREATED);shell("input keyevent 223");
            Thread.sleep(2500);assertFalse("Sleep deadline depended on web timers",playing(c));
        }finally{if(c!=null){final MediaController p=c;main(()->{p.stop();p.clearMediaItems();p.release();});}shell("input keyevent 224");shell("wm dismiss-keyguard");}
    }
}
