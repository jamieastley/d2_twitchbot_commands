import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import webExtension from "vite-plugin-web-extension";

const target = process.env.TARGET || "chrome";

export default defineConfig({
  plugins: [
    react(),
    webExtension({
      manifest:
        target == "chrome" ? "manifest.chrome.json" : "manifest.firefox.json",
    }),
  ],
});
