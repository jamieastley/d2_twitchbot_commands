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
}
