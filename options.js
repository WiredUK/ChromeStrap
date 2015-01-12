function saveOptions() {
    var enabled = document.getElementById('enabled').checked;
    var showtype = document.getElementById('showtype').value;
    var siteOptions = document.getElementById('sitelist').options;
    var sites = new Array();
    for (index = 0; index < siteOptions.length; ++index) {
        sites[index] = siteOptions[index].text;
    }

    chrome.storage.sync.set({
        enabled: enabled,
        showtype: showtype,
        sites: sites
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 1000);
    });
}

function restoreOptions() {
    var defaultSites = new Array();
    defaultSites[0] = "http://.*";

    chrome.storage.sync.get({
        enabled: 'true',
        showtype: 0,
        sites: defaultSites
    }, function(items) {
        document.getElementById('enabled').checked = items.enabled;
        document.getElementById('showtype').selectedIndex = items.showtype;
        var siteList = document.getElementById('sitelist');
        for(index = 0; index < items.sites.length; index++) {
            addSiteToList(items.sites[index]);
        }
    });
}

function addSiteToList(site) {
    var newSite = document.createElement('option');
    newSite.text = site;
    document.getElementById('sitelist').add(newSite);
}

function addNewSite() {
    addSiteToList(document.getElementById('newsite').value);
    document.getElementById('newsite').value = "";
    saveOptions();
}

function removeSite() {
    document.getElementById('sitelist').remove(
        document.getElementById('sitelist').selectedIndex
    );
    saveOptions();
}

function checkNewSite() {
    if(document.getElementById('newsite').value == "") {
        document.getElementById('addnewsite').disabled = true;
    } else {
        document.getElementById('addnewsite').disabled = false;
    }
}

function checkSiteSelected() {
    if(document.getElementById('sitelist').selectedIndex >= 0) {
        document.getElementById('removesite').disabled = false;
    } else {
        document.getElementById('removesite').disabled = true;
    }
}

document.addEventListener('DOMContentLoaded', restoreOptions);

document.getElementById('enabled').addEventListener('click', saveOptions);
document.getElementById('showtype').addEventListener('change', saveOptions);
document.getElementById('addnewsite').addEventListener('click', addNewSite);
document.getElementById('removesite').addEventListener('click', removeSite);
document.getElementById('newsite').addEventListener('keydown', checkNewSite);
document.getElementById('sitelist').addEventListener('click', checkSiteSelected);
