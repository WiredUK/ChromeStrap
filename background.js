var tabData = {};

chrome.extension.onMessage.addListener(function(message, sender) {
    chrome.browserAction.setBadgeText({text: message});
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    	tabData["bs"+tabs[0].id] = message;
	});
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if(tabData["bs"+tabId.tabId]) {
	   chrome.browserAction.setBadgeText({text: tabData["bs"+tabId.tabId]});
	} else {
		chrome.browserAction.setBadgeText({text: ""});
	}
});

chrome.tabs.onActivated.addListener(function(tabId, changeInfo, tab) {
	if(tabData["bs"+tabId.tabId]) {
	   chrome.browserAction.setBadgeText({text: tabData["bs"+tabId.tabId]});
	} else {
		chrome.browserAction.setBadgeText({text: ""});
	}
});