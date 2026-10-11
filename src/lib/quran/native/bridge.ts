import { Capacitor, registerPlugin, type PluginListenerHandle } from "@capacitor/core";
import type { NativeTrack } from "./playlist";
export interface NativePlaybackState {
  active: boolean; paused: boolean; loading: boolean; ended: boolean;
  position: number; duration: number; track?: NativeTrack;
  tracks: NativeTrack[]; error?: string; sleepUntil: number;
}
interface NativeQuranPlugin {
  load(options: { tracks: NativeTrack[]; startIndex: number; repeat: boolean; position?: number; paused?: boolean; sleepUntil?: number }): Promise<void>;
  pause(): Promise<void>; resume(): Promise<void>; stop(): Promise<void>;
  seek(options: { seconds: number }): Promise<void>;
  setSleep(options: { until: number }): Promise<void>;
  getState(): Promise<NativePlaybackState>;
  addListener(event: "playbackState", listener: (state: NativePlaybackState) => void): Promise<PluginListenerHandle>;
}
export const nativeQuran = registerPlugin<NativeQuranPlugin>("MirathQuranAudio");
export function nativeQuranAvailable() {
  return Capacitor.getPlatform() === "android" && Capacitor.isPluginAvailable("MirathQuranAudio");
}
