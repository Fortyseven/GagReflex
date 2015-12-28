"use strict";

/********************************************************
 * Gag Reflex main class
 * @constructor
 */
var Gag = function ( config )
{
    this._renderer = null;
    this._config = config;

    /**
     *
     */
    this.rebuildCSSRules = function ( config )
    {
        if ( !config ) {
            throw "Invalid or undefined gag reflex config";
        }

        var groups = config.groups;

        for ( var gi in groups ) {
            var css_name = "gr_" + groups[gi].name.toLowerCase().replace( " ", "-" );

            var css_grad = "background-color: " + groups[gi].color_top;
            var new_style = "<style>." + css_name + " {transition: background-color 0.75s;  " + css_grad + " !important; box-shadow : 0 0 10px darkred !important;}</style>";

            $( new_style ).appendTo( "head" );

            groups[gi].css_name = css_name;

        }
    };

    /********************************************************
     * Begin processing the current page
     */
    this.run = function ()
    {
        this.rebuildCSSRules( this._config );

        var site = document.location.hostname;

        if ( site.indexOf( "facebook.com" ) > -1 ) {
            if ( !this._config.options.enabledOnFacebook ) return;

            this._renderer = new GagFacebook( this._config );
        }
        else if ( site.indexOf( "reddit.com" ) > -1 ) {
            if ( !this._config.options.enabledOnReddit ) return;

            this._renderer = new GagReddit( this._config );
        }
        else {
            throw "Could not find proper renderer for '" + site + "'";
            return;
        }

        this._renderer.start();
    };
};
