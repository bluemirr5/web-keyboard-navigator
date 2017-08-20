var excutedTabIds = [];
chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  console.log(change.status);
  if (change.status == "complete") {
    console.log(tabId)
    console.log(excutedTabIds);
    find(tab, true);
  }
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
  var tab = chrome.tabs.get(tabId, function(tab){
    find(tab);
  })
});

function find(tab, updated) {
  console.log(tab.url);
  if(tab.url.includes("www.google")&&tab.url.includes("search?")) {
    chrome.browserAction.setIcon({path:"google.png"});
    chrome.browserAction.setTitle({title: "This page is Google Search Page"});
    console.log('icon setting')
    if(excutedTabIds.indexOf(tab.id) == -1 || updated) {
      if(excutedTabIds.indexOf(tab.id) == -1) excutedTabIds.push(tab.id)
      chrome.tabs.executeScript(tab.id, { file: "jquery-3.2.1.js"}, function(jresult) {
        console.log(jresult);
        chrome.tabs.executeScript(tab.id, { file:"content_script.js"}, function(result) {
          console.log(result)
        });
      });
    }
  } else if(tab.url.includes("search.naver.com")&&tab.url.includes("search.naver?")) {
    chrome.browserAction.setIcon({path:"naver.png"});
    chrome.browserAction.setTitle({title: "This page is Naver Search Page"});
    if(excutedTabIds.indexOf(tab.id) == -1 || updated) {
      if(excutedTabIds.indexOf(tab.id) == -1) excutedTabIds.push(tab.id)
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
