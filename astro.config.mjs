import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://andresvizcaino.com",
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    // El español se queda en la raíz para conservar las URLs ya indexadas;
    // el inglés vive bajo /en/.
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
