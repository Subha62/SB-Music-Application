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
      registerType: "autoUpdate",
      workbox: {
        skipWaiting: true,
        clientsClaim: true,

        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.origin.includes("youtube.com") ||
              url.origin.includes("googleapis.com"),
            handler: "NetworkOnly", // 🚨 VERY IMPORTANT
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
            src: "/image (1).png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/image (1).png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      includeAssets: [
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
        "icons/*.png",
      ],
    }),
  ],
  build: {
    outDir: "build",
    sourcemap: false,
  },
});
