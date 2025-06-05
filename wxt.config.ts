import { defineConfig } from "wxt";

export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  srcDir: "src",
  outDir: "dist",
  entrypointsDir: "entrypoints",
  manifest: ({ browser }) => ({
    name: "D2 TwitchBot Commands",
    version: "0.2.1",
    description: "Browser extension for D2 TwitchBot Commands",
    // Browser-specific manifest version
    manifest_version: browser === "firefox" ? 2 : 3,

    // Browser-specific action
    ...(browser === "firefox"
      ? { browser_action: { default_popup: "popup.html" } }
      : { action: { default_popup: "popup.html" } }),
  }),
});
