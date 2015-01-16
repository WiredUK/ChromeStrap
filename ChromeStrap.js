var $popup = '<div id="bs-bp-notify" style="display: none;">'+
            '<span class="bs-bp-dismiss">'+
                '<a title="Dismiss">x</a>'+
                '<div class="bs-bp-message">message</div>'+
            '</span>'+
         '</div>';

var timeout;
var options;
var defaultSites = new Array();
defaultSites[0] = "http://.*";

chrome.storage.sync.get({
    enabled: 'true',
    popupenabled: 'true',
    showtype: 0,
    sites: defaultSites
}, function(items) {
    options = items;
    initChromeStrap();
});

function reloadOptions() {
    chrome.storage.sync.get({
        enabled: 'true',
        popupenabled: 'true',
        showtype: 0,
        sites: defaultSites
    }, function(items) {
        options = items;
    });
}

function initChromeStrap() {
    if(timeout) clearTimeout(timeout);

    if(!options || !options.enabled || !siteMatch(options.showtype, options.sites)) {
        return;
    }

    $('body').append($popup);
     
    $(window).resize(runBootstrapCheck);
     
    $(".bs-bp-dismiss a").click(function() {
        $("#bs-bp-notify").stop().fadeOut("fast");
    });

    $(".bs-bp-dismiss").hover(
        function() {
            clearTimeout(timeout);
            $('#bs-bp-notify').stop().fadeIn("fast");
        },
        function() {
            timeout = setTimeout(function() { $('#bs-bp-notify').stop().fadeOut("fast"); }, 1000);
        }
    );

}

function runBootstrapCheck() {
    if(!options || !options.enabled || !siteMatch(options.showtype, options.sites)) {
        return;
    }

    var spec = viewport();
    var bp = findBootstrapEnvironment();
    var range = getBootstrapRange(bp);
    clearTimeout(timeout);

    if(options.popupenabled) {
        var message = '<div><strong>W:</strong> '+spec.width+'px</div>'+
                      '<div><strong>H:</strong> '+spec.height+'px</div>'+
                      '<div><strong>Break:</strong> '+bp+'</div>';

        if(range!=null) {
            message = message+'<div><strong>Range<a class="info" title="Assuming default Bootstrap settings">?</a>:</strong> '+range.min+'px - '+range.max+'px</div>';
        }

        $('#bs-bp-notify .bs-bp-message').html(message);
        $('#bs-bp-notify').stop().fadeIn("fast");
        timeout = setTimeout(function() { $('#bs-bp-notify').stop().fadeOut("fast"); }, 2000);
    }

    if(bp.length <= 4) {
        chrome.extension.sendMessage(bp);
    } else {
        chrome.extension.sendMessage("");
    }
}

function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e [ a+'Width' ], height : e [ a+'Height' ] };
}
 
function findBootstrapEnvironment() {
    var envs = ["xs", "sm", "md", "lg"];
    var doc = window.document;
    var temp = doc.createElement("div");
    doc.body.appendChild(temp);
 
    for (var i = envs.length - 1; i >= 0; i--) {
        var env = envs[i];
 
        temp.className = "hidden-" + env;
 
        if (temp.offsetParent === null) {
            doc.body.removeChild(temp);
            return env;
        }
    }
    doc.body.removeChild(temp);
    return "Bootstrap not in use";
}

function getBootstrapRange(bp) {
    switch(bp) {
        case "xs":
            return { min: 1, max: 767 };
        case "sm":
            return { min: 768, max: 991 };
        case "md":
            return { min: 992, max: 1199 };
        case "lg":
            return { min: 1200, max: screen.width };
    }
}

function siteMatch(showType, sites) {
    if(showType == 0) {
        for (i = 0; i < sites.length; ++i) {
            if(document.URL.match(sites[i])) {
                return true;
            }
        }
        return false;
    } else {
        for (i = 0; i < sites.length; ++i) {
            if(document.URL.match(sites[i])) {
                return false;
            }
        }
        return true;

    }
    
}