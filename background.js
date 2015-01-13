chrome.extension.onMessage.addListener(function(message, sender) {
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		chrome.browserAction.setBadgeText({text: message, tabId: tabs[0].id});
	});
});
