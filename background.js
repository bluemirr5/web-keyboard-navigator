var excutedTabIds = [];
chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  if (change.status == "complete") {
    console.log(tab);
    find(tab, true);
  }
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
  selectedId = tabId;
  var tab = chrome.tabs.get(tabId, function(tab){
    console.log(tab);
    find(tab);
  })
});

function find(tab, updated) {
  if(tab.url.includes("www.google")&&tab.url.includes("search?")) {
    chrome.browserAction.setIcon({path:"active.png"});
    chrome.browserAction.setTitle({title: "This page is Google Search Page"});
    if(!excutedTabIds.includes(tab.id) || updated) {
      excutedTabIds.push(tab.id)
      chrome.tabs.executeScript(null, { file: "jquery-3.2.1.js"}, function() {
        chrome.tabs.executeScript(null, { file:"content_script.js"});
      });
    }
  } else {
    chrome.browserAction.setIcon({path:"inactive.png"});
    chrome.browserAction.setTitle({title: "This page is not Google Search Page"});
  }
}

// chrome.browserAction.onClicked.addListener(function(tab) {
//   // No tabs or host permissions needed!
// });

// Ensure the current selected tab is set up.
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
});
