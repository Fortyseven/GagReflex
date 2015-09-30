"use strict";

var gag = null;

$( document ).ready( function () {
    gag = new Gag();

    chrome.extension.onMessage.addListener( function ( msg, sender, response ) {
        gag.loadDefaults();
    } );

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.method == "getStatus")
            sendResponse({status: localStorage['config']});
        else
            sendResponse({}); // snub them.
    });
} );