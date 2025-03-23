import browser from "webextension-polyfill";

export function SetClipboardValue(value: string) {
  // Copy to clipboard
  navigator.clipboard
    .writeText(value)
    .then(() => {
      alert("Copied to clipboard: " + value);
    })
    .catch((err) => {
      console.error("Failed to copy to clipboard: ", err);
      alert(value);
    });

  // Send message to content script
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id!, {
      action: 'insertText',
      value: value
    });
  });

}
