function saveOptions() {
    var enabled = document.getElementById('enabled').checked;
    var popupenabled = document.getElementById('popupenabled').checked;

    chrome.storage.sync.set({
        enabled: enabled,
        popupenabled: popupenabled
    }, function() {
        chrome.tabs.executeScript(null, {code:"reloadOptions()"});
    });
}

function restoreOptions() {
    chrome.storage.sync.get({
        enabled: 'true',
        popupenabled: 'true',
        showtype: 0
    }, function(items) {
        document.getElementById('enabled').checked = items.enabled;
        document.getElementById('popupenabled').checked = items.popupenabled;
        if(items.showtype == 0) {
            document.getElementById('addsite').innerText = "Add this site to whitelist";
        } else {
            document.getElementById('addsite').innerText = "Add this site to blacklist";
        }
    });
}

function addSite() {
    var defaultSites = new Array();
    defaultSites[0] = "http://.*";

    chrome.tabs.getSelected(null, function(tab) {
        chrome.storage.sync.get({
            sites: defaultSites
        }, function(items) {
            items.sites.push(tab.url);
            chrome.storage.sync.set({sites: items.sites});
        });

    });
    setTimeout(function() {
        window.close();    
    }, 1000);
    
}

document.addEventListener('DOMContentLoaded', restoreOptions);

document.getElementById('enabled').addEventListener('click', saveOptions);
document.getElementById('popupenabled').addEventListener('click', saveOptions);
document.getElementById('addsite').addEventListener('click', addSite);
