"use strict";

var GagConfig = function ( on_loading_complete_callback )
{

    // FIXME: Don't forget to remove the test links ('subgenius', etc.)

    /**
     * Default list of domains for the "Satirical News" group
     * @type {string[]}
     */
    this.SATIRE_DOMAINS = [
        "onion.com", "theonion.com", "clickhole.com", "private-eye.co.uk", "newsbiscuit.com", "thespoof.com",
        "unconfirmedsources.com", "cap-news.com", "enduringvision.com", "derfmagazine.com", "newsmutiny.com",
        "p4rgaming.com", "thedailypixel.com", "dailycurrant.com", "borowitz-report", "callthecops.net",
        "empirenews.net", "empiresports.co", "freewoodpost.com", "mediafetcher.com", "globalassociatednews.com",
        "huzlers.com", "thelapine.ca", "lightlybraisedturnip.com", "mediamass.net", "nationalreport.net",
        "theracketreport.com", "weeklyworldnews.com", "worldnewsdailyreport.com", "scrappleface.com", "bongonews.com",
        "thepeoplescube.com", "utm_hp_ref=satire", "newswatch28.com", "thenewsnerd.com", "dailymediabuzz.com",
        "demyx.com", "americannews.com", "newslo.com", "shareonfb.com", "chronicle.su", "duffelblog.com",
        "duhprogressive.com", "stubhillnews.com", "nbc.com.co", "starwipe.com"
    ];

    /**
     * Default list of domains for the "Questionable Sources" group
     * @type {string[]}
     */
    this.QUESTIONABLE_DOMAINS = [
        "infowars.com", "prisonplanet.com", "prisonplanet.tv", "in5d.com", "whatreallyhappened.com",
        "wanttoknow.info", "beforeitsnews.com", "cabaltimes.com", "rense.com", "crossroad.to", "alternet.org",
        "watch-unto-prayer.org", "madcowprod.com", "globalresearch.ca", ".rt.com", "presstv.ir", "barrychamish.com",
        "godlikeproductions.com", "stj911.org", "goroadachi.com", "henrymakow.com", "educate-yourself.org",
        "letsrollforums.com", "vigilantcitizen.com", "voltairenet.org", "larouchepub.com", "theblaze.com",
        "septemberclues.info", "thetruthseeker.co.uk", "mufon.com", "mufoncanada.com", "openminds.tv",
        "drudgereport.com", "naturalnews.com", "coasttocoastam.com", "davidicke.com", "activistpost.com",
        "stevequayle.com", "shtfplan.com", "thedailysheeple.com", "informationclearinghouse.info",
        "americanfreepress.net", "antiwar.com", "truthstreammedia.com", "thenewamerican.com", "tarpley.net",
        "911truth.org", "wnd.com", "propagandamatrix.com", "oathkeepers.org", "cryptogon.com", "alt-market.com",
        "legitgov.org", "whatdoesitmean.com", "ronpaulinstitute.org", "tvnewslies.org", "dprogram.net", "smoloko.com",
        "themindunleashed.org", "waykiwayki.com", "disclose.tv", "mirror.co.uk", "dailystar.co.uk", "dailymail.co.uk",
        "thesun.co.uk", "mercola.com", "agoracosmopolitan.com", "cryptozoologynews.com", "newshounds.us",
        "topekasnews.com", "pravda.ru", "eutimes.net", "examiner.com", "theepochtimes.com", "yournewswire.com",
        "worldtruth.tv", "wakeup-world.com", "ewao.com", "ufointernationalproject.com", "spiritlibrary.com",
        "theinsider.org", "collective-evolution.com", "ufosonline.blogspot.com.br", "ufocasebook.com",
        "exopolitics.org", "doctoroz.com", "drphil.com", "conspiracytheorist.com.au", "ijreview.com",
        "thefreethoughtproject.com", "21stcenturywire.com", "800WhistleBlower.com", "therundownlive.com",
        "consciouslifenews.com", "conspiracywire.com", "countdowntozerotime.com", "counterpsyops.com",
        "dailybuzzlive.com", "dcclothesline.com", "elitereaders.com", "sputniknews.com", "federalistpress.com",
        "fromthetrenchesworldreport.com", "geoengineeringwatch.org", "govtslaves.info", "gulagbound.com",
        "hangthebankers.com", "healthimpactnews.com", "humansarefree.com", "intellihub.com", "lewrockwell.com",
        "libertynews.com", "livefreelivenatural.com", "newswire-24.com", "nodisinfo.com", "notallowedto.com",
        "nowtheendbegins.com", "politicalblindspot.com", "rawforbeauty.com", "realfarmacy.com", "redflagnews.com",
        "responsibletechnology.org", "secretsofthefed.com", "thecommonsenseshow.com", "thecontroversialfiles.net",
        "thelastgreatstand.com", "therightplanet.com", "theuspatriot.com", "topinfopost.com", "truthandaction.org",
        "truthbroadcastnetwork.com", "usahitman.com", "veteranstoday.com", "westernjournalism.com", "crazed.com",
        "whydontyoutrythis.com", "healthyandnaturallife.com", "dailycaller.com", "consciouslyenlightened.com"
    ];

    //this._config = {};

    this.loadConfig( on_loading_complete_callback );
};

/**
 * Returns a new, valid group object. If group_obj is provided, it will clone the
 * contents into the new object. Defaults will be provided, if new or missing.
 *
 * @param group_obj
 * @return {{name: string, domains: Array, color_top: string, readonly: number, is_enabled: number}}
 */
GagConfig.prototype.createGroupObject = function ( obj )
{
    obj = obj || {};

    if (obj.is_enabled === undefined) {
        obj.is_enabled == 1;
    }

    return {
        name: obj.name || "",                        // Name of the group
        domains: obj.domains || [],                  // Array of hostnames to match this filter
        color_top: obj.color_top || "#ffffff",       // Gradient will fade from this
        //color_bottom: obj.color_bottom || "#ffffff", // Gradient will fade to this
        readonly: obj.readonly || false,              // Read only (implies built-in, immutable group)
        is_enabled: obj.is_enabled
    };
};

/**
 *
 * @param group
 * @returns {*}
 */
GagConfig.prototype.cloneGroup = function ( group )
{
    var clone = this.createGroupObject();

    for ( var i in clone ) {
        if ( group.hasOwnProperty( i ) ) {
            clone[i] = group[i];
        }
    }

    return clone;
}

/**
 * Merges two config objects. This is used to overwrite the built-in config with
 * user modified settings.
 *
 * @param group_a
 * @param group_b
 * @returns {Array}
 */
GagConfig.prototype.mergeBaseAndUser = function ( group_a, group_b )
{
    var merged = [];

    for ( var a in group_a ) {
        merged.push( group_a[a] );
    }

    for ( var b in group_b ) {
        var have_found_existing = false;
        for ( var m in merged ) {
            if ( merged[m].name.trim().toLowerCase() == group_b[b].name.trim().toLowerCase() ) {
                // existing item, merge them
                var foo = this.cloneGroup( merged[m] );
                for ( var field in merged[m] ) {

                    // skip protected fields, preserving the existing group_a version
//                    if ( merged[m].readonly ) {
                            if ( field == "name" || field == "domains" ) {
                                continue;
                            }
//                    }

                    if ( foo.hasOwnProperty( field ) ) {
                        foo[field] = group_b[b][field];
                    }
                }
                have_found_existing = true;
                merged[m] = foo;
            }

        }
        if ( !have_found_existing ) {
            merged.push( group_b[b] );
        }
    }

    return merged;
};

/**
/********************************************************
 * Returns a clean install default configuration object
 *
 * @return {{groups: *[]}}
 */
GagConfig.prototype.getBuiltInGroups = function ()
{
    return {
        groups: [
            this.createGroupObject( {
                                        name:         "News Satire",
                                        domains:      this.SATIRE_DOMAINS,
                                        color_top:    "#ffdd88",
//                                        color_bottom: "#ffffee",
                                        readonly:     1,
                                        is_enabled:   1
                                    } ),
            this.createGroupObject( {
                                        name:         "Questionable Sources",
                                        domains:      this.QUESTIONABLE_DOMAINS,
                                        color_top:    "#c0c76a",
//                                        color_bottom: "#ffffee",
                                        readonly:     1,
                                        is_enabled:   1
                                    } )
        ]
    };
};

/**
 * Retrieve the config data from client local storage. Calls on_ready_callback with
 * when config object when ready.
 *
 * @param on_ready_callback
 */
GagConfig.prototype.loadConfig = function ( on_ready_callback )
{
    var config = this.getBuiltInGroups();

    //chrome.storage.sync.get
    //var user_conf = localStorage.getItem( "config" );

    var self = this;

    // Since we're running in the context of the host page, not the extension
    // we have to pass a message to the 'background' page, saying, "Hey, give
    // me that shit, bro!"

    chrome.runtime.sendMessage( { method: GagConfig.MSG_GET_USER_CONFIG },
        function ( user_conf )
        {
            // So, we have to wait through the callback, and there might not even
            // be anything. Geesh.

            if ( user_conf ) {
                try {
                    var parsed_user_shit = JSON.parse( user_conf );
                    config.groups = self.mergeBaseAndUser( config.groups, parsed_user_shit.groups );
                }
                catch(e) {
                    console.error("Corrupted config. Ignoring. (" + e + ")");
                }
            }

//            var arr = [];
//            for ( var i in config.groups ) {
//                config.groups[i] = self.createGroupObject( config.groups[i] );
//                arr.push( config.groups[i] );
//            }
//            console.table( arr );

            // this callback is a throwback to when I was using chrome cloud
            // storage; keeping this here in case I move back to that

            var foo = on_ready_callback.bind( self );
            foo( config ); //FIXME: m0ar el3gan7 plz
        }
    );
};

GagConfig.MSG_GET_USER_CONFIG = "getUserConfig";
GagConfig.MSG_POPUP_SAVED = "popupSaved";
GagConfig.MSG_POPUP_CLOSED = "popupClosed";
GagConfig.MSG_POPUP_FACTORYRESET = "popupFactoryReset";
