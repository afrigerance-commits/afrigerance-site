import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Bayt Al-'Ilm fonctionne avec des pages dynamiques (authentification,
 * recherche, pagination des hadiths) que l'export statique de Next.js ne
 * supporte pas. L'app native charge donc directement le site déployé sur
 * Netlify dans une coquille native (icône, écran de démarrage, présence sur
 * le Play Store/App Store) plutôt que de dupliquer le code en React Native.
 *
 * Remplacer `server.url` par l'URL définitive du site une fois le domaine
 * personnalisé configuré (voir docs/DEPLOYMENT.md).
 */
const config: CapacitorConfig = {
  appId: "com.baytalilm.app",
  appName: "Bayt Al-'Ilm",
  webDir: "public",
  server: {
    url: "https://afrigerance-site.netlify.app",
    cleartext: false,
  },
};

export default config;
