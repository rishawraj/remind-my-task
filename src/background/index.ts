console.log("Background script loaded");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "headings") {
    console.log("Headings from page:", message.data);
    // Optionally store or process data here
  }
});

// Optional: Trigger content script manually when clicking the action
chrome.action.onClicked.addListener((tab) => {
  if (tab.id !== undefined) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => alert("Extension clicked!"),
    });
  } else {
    console.error("Tab ID is undefined");
  }
});
