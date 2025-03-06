console.log("Popup script loaded");

// Define types for the heading data (matching content.js response)
interface Heading {
  tag: string;
  text: string;
  id: string | null;
  index: number;
}

// Define the expected response from content.js
interface MessageResponse {
  data: Heading[];
}

// Ensure the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Type the DOM elements
  const headingList = document.getElementById(
    "headingList"
  ) as HTMLUListElement;
  const refreshBtn = document.getElementById("refreshBtn") as HTMLButtonElement;

  // Function to fetch and display headings
  function displayHeadings(): void {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      (tabs: chrome.tabs.Tab[]) => {
        if (!tabs || tabs.length === 0) {
          headingList.innerHTML = "<li>Error: No active tab found.</li>";
          return;
        }

        const tabId = tabs[0].id;
        if (typeof tabId !== "number") {
          headingList.innerHTML = "<li>Error: Invalid tab ID.</li>";
          return;
        }

        // Send message to content script
        chrome.tabs.sendMessage(
          tabId,
          { type: "getHeadings" },
          (response: MessageResponse | undefined) => {
            // Check for runtime.lastError
            if (chrome.runtime.lastError) {
              console.error(
                "Error sending message:",
                chrome.runtime.lastError.message
              );
              headingList.innerHTML =
                "<li>Error: Content script not loaded. Try refreshing the page.</li>";
              return;
            }

            // Handle the response
            if (response && response.data) {
              headingList.innerHTML = ""; // Clear existing list
              response.data.forEach((heading: Heading) => {
                const li = document.createElement("li");
                li.textContent = `${heading.tag}: ${heading.text}`;
                headingList.appendChild(li);
              });
            } else {
              headingList.innerHTML = "<li>No headings found.</li>";
            }
          }
        );
      }
    );
  }

  // Initial load
  displayHeadings();

  // Refresh button event listener
  refreshBtn.addEventListener("click", displayHeadings);
});
