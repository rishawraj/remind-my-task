console.log("Hello from my browser extension!");

// Add a listener for when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed!");
});
