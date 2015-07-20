"use strict";

const SATIRE_ID = "satire_select";
const QUESTIONABLE_ID = "questionable_select";

var gag = new Gag();

function bindInputs() {
    // bind inputs
    $( "#btnRestoreDefaults" ).click( function () {
        if ( confirm( "This will delete all your settings, and restore default groups. Are you sure?" ) ) {
            gag.resetConfig();
        }

    } );
}
window.onload = function () {
    //$( "#satire_select" ).checked = true;
    if ( !localStorage["not_first_run"] ) {
        setDefaults();
    }

    $( "#" + SATIRE_ID ).prop( "checked", localStorage[ SATIRE_ID ] );
    $( "#" + QUESTIONABLE_ID ).prop( "checked", localStorage[ QUESTIONABLE_ID ] );

    bindInputs();

//    var background_page = chrome.extension.getBackgroundPage();

    // Send a message to our background page to let it know we've ended the popup session
    // We'll pass it the updated config information so it can save it and put it into action

    $( window ).unload( function () {
        var app_data = {
            items: [
                {a: 'a', b: 'b'},
                {a: 'a', b: 'b'},
                {a: 'a', b: 'b'},
                {a: 'a', b: 'b'}
            ]
        };

        chrome.extension.sendMessage(
                {
                    type:   "popup-closed",
                    config: app_data
                } );
    } );
};

function setDefaults() {
    localStorage[ SATIRE_ID ] = true;
    localStorage[ QUESTIONABLE_ID ] = true;
    localStorage["not_first_run"] = true;
}

function toggleSatire() {
    var from = localStorage[ SATIRE_ID ];
    localStorage[ SATIRE_ID ] = !localStorage[ SATIRE_ID ];
    var to = localStorage[ SATIRE_ID ];

    alert( "from: " + from + ", to: " + to );
}
function toggleQuest() {
    localStorage[ QUESTIONABLE_ID ] = !localStorage[ QUESTIONABLE_ID ];
}

