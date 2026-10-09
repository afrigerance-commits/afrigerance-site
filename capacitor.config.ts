import type { CapacitorConfig } from "@capacitor/cli";

/** Android loads the deployed MIRÂTH site, including its server-rendered pages.
 * Keep the existing application ID to preserve any prior installation identity.
 * Prayer alarms use native Android playback; Quran audio/offline bundling remain separate.
 */
const config: CapacitorConfig = {
  appId: "com.baytalilm.app",
  appName: "MIRÂTH",
  webDir: "public",
  server: {
    url: "https://miraath.netlify.app",
    cleartext: false,
  },
};

export default config;
