"use strict";

$( document ).ready( function () {
    chrome.extension.onMessage.addListener(
            function ( msg, sender, response )
            {
                if ( msg.method == GagConfig.MSG_GET_USER_CONFIG ) {
                    response(localStorage['config']);
                }
            }
    );
} );