// Background service worker which implements webextension-polyfill

import browser from "webextension-polyfill";

console.log("Hello from background service worker!");
browser.runtime.onInstalled.addListener(() => {
  console.log("Extension has been installed");
});

browser.runtime.onMessage.addListener((request) => {
  console.log("Message from the background script:");
  console.log(request.toString());
  return Promise.resolve({ response: "Hi from content script" });
});


// browser.runtime.onMessage.addListener((request: , sender, sendResponse) => {
//   // @ts-ignore
//   if (request.action === "insertText") {
//     const chatInput = document.querySelector(
//       'textarea[data-a-target="chat-input"]',
//     ) as HTMLTextAreaElement;
//
//     if (chatInput) {
//       chatInput.value = request.value;
//       chatInput.dispatchEvent(new Event("input", { bubbles: true }));
//     }
//   }
// });


