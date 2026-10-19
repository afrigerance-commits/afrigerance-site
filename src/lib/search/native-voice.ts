import { Capacitor, registerPlugin } from '@capacitor/core';

interface NativeVoicePlugin {
  available(): Promise<{ available: boolean }>;
  recognize(options: { language: string }): Promise<{ text: string; cancelled: boolean }>;
}

export const nativeVoice = registerPlugin<NativeVoicePlugin>('MirathVoiceSearch');

export function voicePlatform(): 'web' | 'android' | 'android-update' {
  if (Capacitor.getPlatform() !== 'android') return 'web';
  return Capacitor.isPluginAvailable('MirathVoiceSearch') ? 'android' : 'android-update';
}
