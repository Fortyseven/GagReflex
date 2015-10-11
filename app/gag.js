"use strict";

/********************************************************
 * Gag Reflex main class
 * @constructor
 */
var Gag = function ( config )
{
//    this.self = this;

    this.ARTICLE_CLASS = "div[aria-label=\"Story\"]";
    this.ARTICLE_LINK_SELECTOR = "a._6kt, a._52c6, div._6m6>a, userContent a";

    this.REFRESH_DELAY = 1000;

    this._config = config;

    /***************************************
     * Callback to do highlighting on page
     */
    this.runHighlighting = function ()
    {
        var gag = this;
        $( gag.ARTICLE_CLASS ).each(
                function ()
                {
                    var href = $( gag.ARTICLE_LINK_SELECTOR, this )
                                       .attr( "onmouseover" ) || null;

                    if ( href != null ) {
                        for ( var gi in gag._config.groups ) {
                            if ( parse( gag._config.groups[gi], href, this ) ) {
                                break;
                            }
                        }
                    }
                }
        );
        setTimeout( this.runHighlighting.bind( this ), this.REFRESH_DELAY );
    };

    /**
     * Scans a string for domains from suppled group definition and
     * applies CSS rule to a given element if found.
     *
     * @param group_def Group definition object
     * @param source_url String to scan for domains
     * @param parent_element Element to add CSS class to if matched
     * @return {boolean} True if there was a match
     */
    var parse = function ( group_def, source_url, parent_element )
    {
        var has_found_match = false;

        group_def.domains.forEach(
                function ( element, index, array )
                {
                    // Does the domain match somewhere in the URL? // FIXME
                    //console.error( "Does this work?", element );
                    if ( source_url.indexOf( element ) > -1 ) {

                        // Brand it with the class belonging to the group
                        parent_element.classList.add( group_def.css_name );
                        has_found_match = true;
                        return true;
                    }
                    return false;
                }
        );

        return has_found_match;
    };

    /**
     *
     */
    this.rebuildCSSRules = function (config)
    {
        if ( !config ) {
            throw "Invalid or undefined gag reflex config";
        }

        //this.unbindAllCSSRules();

        var groups = config.groups;

        for ( var gi in groups ) {
            var css_name = "gr_" + groups[gi].name.toLowerCase().replace( " ", "-" );

            var css_grad =
                    "background:-webkit-gradient(linear, left top, left bottom, " +
                    "color-stop(100%, " + groups[gi].color_bottom + "), " +
                    "color-stop(0%, " + groups[gi].color_top + "))";

            var new_style = "<style>." + css_name + " {" + css_grad + " !important; box-shadow : 0 0 10px #a16f0e !important;}</style>";

            $( new_style ).appendTo( "head" );
            //console.warn( css_name, new_style );

            groups[gi].css_name = css_name;

        }
    };

    /********************************************************
     * Begin processing the current page
     */
    this.run = function(config)
    {
        this.rebuildCSSRules(this._config);
        setTimeout( this.runHighlighting.bind( this ), this.REFRESH_DELAY );
    };
};
