let lastHash = '';
function sendHash() {
  if (location.hash && location.hash !== lastHash) {
    lastHash = location.hash;
    chrome.runtime.sendMessage({ fullUrl: location.href });
  }
}
window.addEventListener('hashchange', sendHash);
sendHash();  // Initial send if hash present
