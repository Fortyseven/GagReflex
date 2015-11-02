"use strict";

var gag;
var gagconfig;

// via http://stackoverflow.com/questions/280634/endswith-in-javascript
String.prototype.endsWith = function ( suffix ) {
    return this.indexOf( suffix, this.length - suffix.length ) !== -1;
};


$(document).ready( function () {
    gagconfig = new GagConfig(function(config){
        console.info( "Gag Reflex ready.👍" );
        gag = new Gag(config);
        gag.run();
    });
} );