"use strict";

$( document ).ready( function () {
     console.log( 'background start' );
     chrome.extension.onMessage.addListener( function ( msg, sender, response ) {
//                 console.log( msg, sender, response );
                 if ( msg.method == GagConfig.MSG_GET_USER_CONFIG ) {
                     response( localStorage['config'] );
                 }
                 else if ( msg.method == GagConfig.MSG_POPUP_CLOSED || msg.method == GagConfig.MSG_POPUP_SAVED ) {
                     if ( msg.config ) {
                         localStorage['config'] = msg.config;
                     }
                 }
                 else if ( msg.method == GagConfig.MSG_POPUP_FACTORYRESET ) {
                     localStorage['config'] = null;
                 }
             }
     );
});