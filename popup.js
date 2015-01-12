function saveOptions() {
    var enabled = document.getElementById('enabled').checked;

    chrome.storage.sync.set({
        enabled: enabled
    }, function() {
        setTimeout(function() {
            //Do something...
        }, 500);
    });
}

function restoreOptions() {
    chrome.storage.sync.get({
        enabled: 'true'
    }, function(items) {
        document.getElementById('enabled').checked = items.enabled;
    });
}

function addSite() {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.storage.sync.get({
            sites: new Array()
        }, function(items) {
            items.sites.push(tab.url);
            chrome.storage.sync.set({sites: items.sites});
        });

    });
    alert('Site added');
}

document.addEventListener('DOMContentLoaded', restoreOptions);

document.getElementById('enabled').addEventListener('click', saveOptions);
document.getElementById('addsite').addEventListener('click', addSite);
