var excutedTabIds = [];
chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  if (change.status == "complete") {
    find(tab, true);
  }
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
  var tab = chrome.tabs.get(tabId, function(tab){
    find(tab);
  })
});

function find(tab, updated) {
  if(tab.url.includes("www.google")&&tab.url.includes("search?")) {
    chrome.browserAction.setIcon({path:"imgs/google.png"});
    chrome.browserAction.setTitle({title: "This page is Google Search Page"});
    if(excutedTabIds.indexOf(tab.id) == -1 || updated) {
      if(excutedTabIds.indexOf(tab.id) == -1) excutedTabIds.push(tab.id)
      chrome.tabs.executeScript(tab.id, { file: "contentScript/content_script.js"}, function(jresult) {
      });
    }
  } else if(tab.url.includes("search.naver.com")&&tab.url.includes("search.naver?")) {
    chrome.browserAction.setIcon({path:"imgs/naver.png"});
    chrome.browserAction.setTitle({title: "This page is Naver Search Page"});
    if(excutedTabIds.indexOf(tab.id) == -1 || updated) {
      if(excutedTabIds.indexOf(tab.id) == -1) excutedTabIds.push(tab.id)
      chrome.tabs.executeScript(tab.id, { file: "contentScript/naver_content_script.js"}, function() {
      });
    }
  } else if(tab.url.includes("www.kbdmania.net")) {
      chrome.browserAction.setIcon({path:"imgs/naver.png"});
      chrome.browserAction.setTitle({title: "This page is KdbMania"});
      if(excutedTabIds.indexOf(tab.id) == -1 || updated) {
          if(excutedTabIds.indexOf(tab.id) == -1) excutedTabIds.push(tab.id)
          chrome.tabs.executeScript(tab.id, { file: "contentScript/kbdmania.js"}, function() {
          });
      }
  } else {
    chrome.browserAction.setIcon({path:"imgs/inactive.png"});
    chrome.browserAction.setTitle({title: "This page is not Google Search Page"});
  }
}

// chrome.browserAction.onClicked.addListener(function(tab) {
//   // No tabs or host permissions needed!
// });

// Ensure the current selected tab is set up.
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
});
