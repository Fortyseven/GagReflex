"use strict";

var gag = null;

$( document ).ready( function () {
    gag = new Gag();

    chrome.extension.onMessage.addListener( function ( msg, sender, response ) {
        gag.loadDefaults();
    } );

} );