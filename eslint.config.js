import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import tailwindcss from "eslint-plugin-tailwindcss";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist/", ".astro/"]),
  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  {
    // The plugin's own preset only targets js/ts files, so its plugin and rules
    // are applied directly here to cover `.astro` files too.
    name: "tailwindcss/astro",
    files: ["**/*.{astro,js,jsx,ts,tsx}"],
    plugins: tailwindcss.configs.recommended.plugins,
    rules: {
      ...tailwindcss.configs.recommended.rules,
      // Clases propias del sistema de diseño, definidas en global.css.
      "tailwindcss/no-custom-classname": [
        "warn",
        {
          whitelist: [
            "display",
            "eyebrow",
            "trace",
            "trace__fill",
            "node",
            "is-live",
            "pulse",
            "reveal",
          ],
        },
      ],
    },
    settings: {
      tailwindcss: {
        cssConfigPath: "./src/styles/global.css",
      },
    },
  },
  {
    rules: {
      // The base rule is off in favour of the TypeScript-aware one below.
      "no-unused-vars": "off",
      "no-var": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "no-multiple-empty-lines": "off",
      "no-tabs": "off",
      // avoidEscape deja usar comillas simples cuando la cadena ya contiene
      // dobles, como en las pilas de fuentes CSS.
      quotes: ["warn", "double", { avoidEscape: true }],
      "jsx-quotes": ["warn", "prefer-double"],
      "eol-last": "off",
    },
  },
  {
    // Scripts de Node que corren fuera del navegador.
    name: "node/scripts",
    files: ["cv/**/*.mjs"],
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
      },
    },
  },
]);
