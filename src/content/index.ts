console.log("Hello from content script!");

function getAllHeadings() {
  const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
  return Array.from(headings).map((heading, index) => ({
    tag: heading.tagName.toLowerCase(),
    text: heading.textContent && heading.textContent.trim(),
    id: heading.id || null,
    index: index,
  }));
}

// Send headings to background script or popup
const headings = getAllHeadings();
chrome.runtime.sendMessage({
  type: "headings",
  data: headings,
});
