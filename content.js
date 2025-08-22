// send href to background.js
function sendHash() {
 if (location.hash){
    browser.runtime.sendMessage({ fullUrl: location.href });
 }
}

// Track the current hash
let currentHash = window.location.hash;

// Save original methods
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

// Wrap pushState
history.pushState = function() {
  const oldHash = currentHash;
  originalPushState.apply(history, arguments);
  const newHash = window.location.hash;
  if (oldHash !== newHash) {
    sendHash();
    currentHash = newHash;
  }
};

// Wrap replaceState
history.replaceState = function() {
  const oldHash = currentHash;
  originalReplaceState.apply(history, arguments);
  const newHash = window.location.hash;
  if (oldHash !== newHash) {
    sendHash();
    currentHash = newHash;
  }
};

// Add the hashchange event listener for direct hash changes
window.addEventListener('hashchange', () => {
  const newHash = window.location.hash;
  if (newHash !== currentHash) {
    sendHash();
    currentHash = newHash;
  }
});

// Add the popstate event listener for history navigation (back/forward)
window.addEventListener('popstate', () => {
  const newHash = window.location.hash;
  if (newHash !== currentHash) {
    sendHash();
    currentHash = newHash;
  }
});

// Fallback polling for hash changes
setInterval(() => {
  const newHash = window.location.hash;
  if (newHash !== currentHash) {
    sendHash();
    currentHash = newHash;
  }
}, 250); // Check every 250ms

sendHash();

