chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.fullUrl) {
    const url = new URL(message.fullUrl);
    const fragment = url.hash.substring(1);
    if (fragment) {  // Only send if there's a fragment
      url.protocol = 'http:';  // Force HTTP 
      url.host = url.host + '.local';
      url.pathname = url.pathname + '#' + fragment;
      url.hash = '';  // Remove hash
      //url.searchParams.set('caidohash', fragment); 
      fetch(url.toString(), {
        method: 'GET',
        mode: 'no-cors'
      }).catch(() => {});  // Send dummy request, ignore errors
    }
  }
});
