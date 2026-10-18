import type { CapacitorConfig } from "@capacitor/cli";

/** Android loads the deployed MIRÂTH site, including its server-rendered pages.
 * Keep the existing application ID to preserve any prior installation identity.
 * Prayer alarms and Quran listening use separate native Android playback services.
 * The Quran bridge requires the matching web update; native audio streams use Internet.
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
