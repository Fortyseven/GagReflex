"use strict";

var gag;
var gagconfig;

$(document).ready( function () {
    gagconfig = new GagConfig(function(config){
        console.log("Config loaded!", config);
        gag = new Gag(config);
        gag.run();
    });
} );