import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react({
      tsDecorators: true,
      sourcemap: false,
    }),

    svgr(),

    VitePWA({
      registerType: "prompt",

      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,

        runtimeCaching: [
          {
            urlPattern: /^https:\/\/www\.googleapis\.com\/youtube\/v3\/.*/i,
            handler: "NetworkOnly",
          },
          {
            urlPattern: /^https:\/\/youtube\.googleapis\.com\/youtube\/v3\/.*/i,
            handler: "NetworkOnly",
          },
          {
            urlPattern: /^https:\/\/i\.ytimg\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "youtube-thumbnails",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
            },
          },
        ],
      },

      manifest: {
        name: "SB Music App",
        short_name: "SB Music",
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",

        icons: [
          {
            src: "/icon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      includeAssets: ["favicon.ico", "robots.txt", "icon.png"],
    }),
  ],

  build: {
    outDir: "build",
    sourcemap: false,
  },
});
