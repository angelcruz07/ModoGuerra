// @ts-check
import { defineConfig, fontProviders, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  env: {
    schema: {
      CLOUDINARY_CLOUDNAME: envField.string({
        context: "server",
        access: "secret",
      }),
      CLOUDINARY_API_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      CLOUDINARY_API_SECRET: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },

  adapter: vercel(),
  output: "server",

  experimental: {
    fonts: [
      {
        name: "Raleway",
        provider: fontProviders.google(),
        weights: ["300", "400", "600", "800", "900"],
        cssVariable: "--font-raleway",
        fallbacks: ["sans-serif"],
      },
      {
        name: "Space Mono",
        provider: fontProviders.google(),
        weights: ["300", "400", "600", "800", "900"],
        cssVariable: "--font-space-mono",
        fallbacks: ["monospace"],
      },
    ],
  },

  integrations: [react()],
});
