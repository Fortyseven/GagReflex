"use strict";

const REFRESH_DELAY = 750;

var gag;

$().ready( function () {
    gag = new Gag();
    gag.run();
} );

