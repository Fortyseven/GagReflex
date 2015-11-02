"use strict";

/********************************************************
 * Gag Reflex main class
 * @constructor
 */
var GagFacebook = function ( config )
{
    //this.self = this;

    //this.ARTICLE_CLASS = "div[aria-label=\"Story\"] div._1dwg";
    this.ARTICLE_CLASS = "div[role=\"article\"]";
    //this.ARTICLE_CLASS = "div._5pcr";
    this.ARTICLE_LINK_SELECTOR = "a._6kt, a._52c6, div._6m6>a, userContent a";

    this.REFRESH_DELAY = 1000;

    this._config = config;

    this.start = function()
    {
        //setTimeout( this.runHighlighting.bind( this ), this.REFRESH_DELAY );
        this.runHighlighting();
    }

    /**
     *
     * @param link
     * @return {string}
     */
    function deShimFacebookLink( link )
    {
        var href_match = link.href.match( /\?u=(.*)&/ );
        if ( href_match[1] ) {
            var url = decodeURIComponent( href_match[1] );
            var host = url.match( /http[s?]:\/\/(.*)\// );
            if (host) return host[1];
        }
        return null;
    }

    /***************************************
     * Callback to do highlighting on page
     */
    this.runHighlighting = function ()
    {
        var gag = this;
        $( gag.ARTICLE_CLASS ).each(
                function ()
                {
                    var article = this;

                    $( gag.ARTICLE_LINK_SELECTOR, article ).each( function ()
                    {
                        var href = this.host;

                        if ( href != null ) {
                            if ( href.indexOf( "facebook.com" ) > -1 ) {
                                href = deShimFacebookLink( this );
                                if ( href == null ) {
                                    return;
                                }
                            }
                            for ( var gi in gag._config.groups ) {
                                if ( gag._config.groups[gi].is_enabled ) {
                                    if ( parse( gag._config.groups[gi], href, article ) ) {
                                        break;
                                    }
                                }
                            }
                        }
                    });
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
                    // Does the domain match?
                    if ( source_url == element ||
                         source_url.endsWith( "." + element ) ) {
                        // Brand it with the class belonging to the group
                        //parent_element.classList.add( group_def.css_name );
                        $(parent_element).addClass( group_def.css_name );
                        has_found_match = true;
                        return true;
                    }
                    return false;
                }
        );

        return has_found_match;
    };
};
