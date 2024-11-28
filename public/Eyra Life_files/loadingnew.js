/* ===================================================
*
* loading.js
* http://www.ocxers.com/demo/loading.html
* ===================================================
* Copyright 2013 Sharing.Chi
*
* Feel free to use (download, change or whatever) this plugin
* Please don't hesitate to email me if any problems
* ocxers@gmail.com
*
* ========================================================== */

// the loading img url
// please asign your own loading img url to imgUrl
var imgUrl = 'Icon-Search-loader.gif';

var $backdrop = null; // let it default
var subModal = false; // let it default

// please call this function to addLoading
// if the modalId is null or undefined, the modal will cover the whole screen (web browser)
// else the modal will cover the specific div box
function addLoading(modalId) {
    $('.modal-backdrop').parent().remove();
    subModal = false;
    if (modalId === undefined || modalId == null) {
        subModal = false;
        // this is a demo
        // please remove the event: onclick="clearLoading()" when you use it in your our project
        $backdrop = $('<div onclick="clearLoading()"><div class="modal-backdrop"></div><div class="modal"><img src="'
                    + imgUrl + '" alt="" title="" /></div></div>').appendTo(document.body);
    } else {
        subModal = true;
        var p = $("#" + modalId);
        p.css('position', 'relative');

        var cover = "style='position: absolute; width:" + p.outerWidth() + "px; height: " + p.outerHeight() + "px; left: 0px; top: 0px;'";
        var modal = "style='position: absolute; left: " + (p.outerWidth() / 2 * 1) + "px; top: " + (p.outerHeight() / 2 * 1) + "px;'";

        // this is a demo
        // please remove the event: onclick="clearloading()" when you use it in your our project
        $backdrop = $('<div onclick="clearLoading()"><div class="modal-backdrop" ' + cover + '></div><div class="modal" ' + modal + '><img src="' + imgUrl + '" alt="" title="" /></div></div>').appendTo(p);
    }
}
// please call clearLoading if you want to clear the modal
function clearLoading() {
    $($backdrop).fadeOut(300, function () {
        $('.modal-backdrop').parent().remove();
    });
}