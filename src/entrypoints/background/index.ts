import browser from "webextension-polyfill";

export default defineBackground(() => {
  console.log("Hello from the background!");

  browser.runtime.onInstalled.addListener((details) => {
    console.log("Extension installed:", details);
  });
});
