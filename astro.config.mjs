// @ts-check
import { defineConfig, fontProviders, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.modoguerra.com",
  vite: {
    plugins: [tailwindcss()],
  },

  env: {
    schema: {
      DATABASE_URL: envField.string({
        context: "server",
        access: "secret",
      }),
      DISCORD_CLIENT_ID: envField.string({
        context: "server",
        access: "secret",
      }),
      DISCORD_CLIENT_SECRET: envField.string({
        context: "server",
        access: "secret",
      }),
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

  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
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

  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !page.startsWith("https://www.modoguerra.com/dashboard"),
    }),
  ],
});
