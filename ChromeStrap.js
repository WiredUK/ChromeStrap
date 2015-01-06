$popup = '<div id="bs-bp-notify" style="display: none;">'+
            '<span class="bs-bp-dismiss">'+
                '<a title="Dismiss">x</a>'+
                '<div class="bs-bp-message">message</div>'+
            '</span>'+
         '</div>';
$style = '<style>'+
             '#bs-bp-notify{position:fixed;bottom:0;right:0;margin:20px;padding:15px;padding-top:5px;padding-bottom:5px;color:#000000;background-color:#cccccc;border:1px solid #777777;border-radius:5px;text-align:left;font-family:monospace;font-size:12px;z-index:10000;}'+
             '.bs-bp-dismiss>a{text-align:right;display:block;float:right;margin-right:-10px;margin-top:-5px;cursor:pointer;}'+
             'a.info{vertical-align:super;font-size:9px;}'+
         '</style>';
 
$('body').append($popup);
$('body').append($style);
 
var timeout;
 
$(window).resize(function() {
    var spec = viewport();
    var bp = findBootstrapEnvironment();
    var range = getBootstrapRange(bp);
    clearTimeout(timeout);
    $('#bs-bp-notify .bs-bp-message').html('<div><strong>W:</strong> '+spec.width+'px</div>'+
                                           '<div><strong>H:</strong> '+spec.height+'px</div>'+
                                           '<div><strong>Break:</strong> '+bp+'</div>'+
                                           '<div><strong>Range<a class="info" title="Assuming default Bootstrap settings">?</a>:</strong> '+range.min+'px - '+range.max+'px</div>');
    $('#bs-bp-notify').stop().fadeIn("fast");
    timeout = setTimeout(function() { $('#bs-bp-notify').stop().fadeOut("fast"); }, 2000);
});
 
$(".bs-bp-dismiss").click(function() {
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