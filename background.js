var excutedTabIds = [];
chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  if (change.status == "complete") {
    find(tab, true);
  }
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
  selectedId = tabId;
  var tab = chrome.tabs.get(tabId, function(tab){
    find(tab);
  })
});

function find(tab, updated) {
  if(tab.url.includes("www.google")&&tab.url.includes("search?")) {
    chrome.browserAction.setIcon({path:"active.png"});
    chrome.browserAction.setTitle({title: "This page is Google Search Page"});
    if(!excutedTabIds.includes(tab.id) || updated) {
      excutedTabIds.push(tab.id)
      chrome.tabs.executeScript(tab.id, { file: "jquery-3.2.1.js"}, function() {
        chrome.tabs.executeScript(tab.id, { file:"content_script.js"}, function() {
        });
      });
    }
  } else if(tab.url.includes("search.naver.com")&&tab.url.includes("search.naver?")) {
    chrome.browserAction.setIcon({path:"active.png"});
    chrome.browserAction.setTitle({title: "This page is Naver Search Page"});
    if(!excutedTabIds.includes(tab.id) || updated) {
      excutedTabIds.push(tab.id)
      chrome.tabs.executeScript(tab.id, { file: "jquery-3.2.1.js"}, function() {
        chrome.tabs.executeScript(tab.id, { file:"naver_content_script.js"}, function() {
        });
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
