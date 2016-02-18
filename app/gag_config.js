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
        "thepeoplescube.com", /*"utm_hp_ref=satire",*/ "newswatch28.com", "thenewsnerd.com", "dailymediabuzz.com",
        "demyx.com", "newslo.com", "shareonfb.com", "chronicle.su", "duffelblog.com", "duhprogressive.com", 
        "stubhillnews.com", "nbc.com.co", "starwipe.com", "liberaldarkness.com", "politicalgarbagechute.com", 
        "christwire.org", "civictribune.com", "creambmp.com", "dcgazette.com", "msnbc.website", "newsmutiny.com", 
        "politicalears.com", "realnewsrightnow.com", "rilenews.com", "witscience.org", "gomerblog.com", "nahadaily.com", 
        "rockcitytimes.com", "thedailymash.co.uk", "thedime.ca", "newswatch33.com", "cbsnews.com.co", "now8news.com", 
        "syruptrap.ca", "reportquickly.com", "news.bfnn.co.uk", "article107news.com", "totalfratmove.com",
        "neomongolianewsnetwork.com", "onionstudios.com"
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
        "whydontyoutrythis.com", "healthyandnaturallife.com", "dailycaller.com", "consciouslyenlightened.com",
        "mrconservative.com", "forbes.com", "thesleuthjournal.com", "investmentresearchdynamics.com",
        "tomatobubble.com", "bunkerville.wordpress.com", "theunhivedmind.com", "theantimedia.org",
        "truthcdm.com", "mycatbirdseat.com", "rt.com", "truth-out.org", "whatsupic.com", "whatsupic.com",
        "911blogger.com", "zerohedge.com", "thefederalist.com", "blacklistednews.com",
        "thefederalist-gary.blogspot.com", "rinf.com", "vdare.com", "christopherketcham.com",
        "iceagenow.info", "hiduth.com", "whowhatwhy.org", "zerocensorship.com", "inquisitr.com",
        "topsecretwriters.com", "alternativenewsproject.org", "unreddit.com", "independenceday.pro",
        "blog.world-mysteries.com", "tradyouth.org", "collectivelyconscious.net",
        "americablog.com", "republicreport.org", "opednews.com", "therightscoop.com", "nationaltribune.com",
        "thegoodsurvivalist.com", "anonhq.com", "indian-skeptic.org", "indiansceptic.in",
        "philosophers-stone.co.uk", "kendoc911.files.wordpress.com", "freerepublic.com", "sott.net",
        "wattsupwiththat.com", "subvertednation.net", "jewishcrimenetworkdid911.blogspot.com.au",
        "seeker401.wordpress.com", "revelation13.net", "gotnews.com", "reason.com", "thegatewaypundit.com",
        "tvoinews.com", "rightwingwatch.org", "boilingfrogspost.com", "allnewspipeline.com", "greenlifes.net",
        "therealnews.com", "bigamericannews.com", "jewsnews.co.il", "foodbabe.com", "donotlink.com",
        "americannews.com", "healthiswealthofheart.com", "rightwingnews.com", "clashdaily.com",
        "ddsdtv.blogspot.com", "rebeldietitian.us", "prevention.com", "mindbodygreen.com", "thespiritscience.net",
        "enenews.com", "returnofkings.com", "rooshv.com", "fixedearth.com", "freerepublic.com", "angrywhitedude.com",
        "eagleforum.org", "afa.net", "metapedia.org", "rexresearch.com", "whitehonor.com", "conservapedia.com",
        "stormfront.org", "godvine.com", "patriotaction.net", "newsbusters.org", "greenmedinfo.com",
        "conservativetribune.com", "southideas.net", "shockingtimes.co.uk"

        // If Drudge Report actually hosted its own original content, rest assured, a link to the site would go here.
    ];

    this.loadConfig( on_loading_complete_callback );
};

/**
 * Returns a new, valid group object. If group_obj is provided, it will clone the
 * contents into the new object. Defaults will be provided, if new or missing.
 *
 * @param group_obj
 * @return {{name: string, domains: Array, color_top: string, readonly: number, is_enabled: number}}
 */
GagConfig.prototype.createGroupObject = function ( group_obj )
{
    var new_obj = {
        name:       "",
        domains:    [],
        color_top:  "#FFFFFF",
        readonly:   0,
        is_enabled: 1
    };

    if ( !group_obj ) {
        return new_obj;
    }

    for ( var i in new_obj ) {
        if ( group_obj.hasOwnProperty( i ) ) {
            if ( group_obj[i] !== undefined ) {
                new_obj[i] = group_obj[i];
            }
        }
    }

    return new_obj;
};

/**
 * Merges two config objects. This is used to overwrite the built-in groups with
 * modified user and built-in groups.
 *
 * @param group_a
 * @param group_b
 * @returns {Array}
 */
GagConfig.prototype.mergeBaseAndUserGroups = function ( group_a, group_b )
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
                var foo = this.createGroupObject( merged[m] );

                for ( var field in merged[m] ) {

                    // skip protected fields, preserving the existing group_a version
                    if ( field == "name" || field == "domains" ) {
                        continue;
                    }

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
 * Merges two JS objects. This is used to overwrite the built-in config with
 * user modified settings.
 * @param base_obj
 * @param override_obj
 * @return {{}}
 */
GagConfig.prototype.mergeBaseAndUserObjects = function ( base_obj, override_obj )
{
    var merged = {};

    for ( var base in base_obj ) {
        merged[base] = base_obj[base];
    }

    for ( var over in override_obj ) {
        merged[over] = override_obj[over];
    }

    return merged;
};

/**
 * Returns a clean install default configuration object
 *
 * @return {{groups: *[]}}
 */
GagConfig.prototype.getDefaultConfig = function ()
{
    return {
        options: {
            enabledOnReddit:          true,
            enabledOnFacebook:        true,
            enabledOnIndividualSites: true,
        },
        groups:  [
            this.createGroupObject( {
                                        name:       GagConfig.GROUP_NAME_SATIRE_DOMAINS,
                                        domains:    this.SATIRE_DOMAINS,
                                        color_top:  "#ffdd88",
                                        readonly:   1,
                                        is_enabled: 1
                                    } ),
            this.createGroupObject( {
                                        name:       GagConfig.GROUP_NAME_QUESTIONABLE_DOMAINS,
                                        domains:    this.QUESTIONABLE_DOMAINS,
                                        color_top:  "#e39f9f",
                                        readonly:   1,
                                        is_enabled: 1
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
    var config = this.getDefaultConfig();

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
                                            config.options = self.mergeBaseAndUserObjects( config.options, parsed_user_shit.options );
                                            config.groups = self.mergeBaseAndUserGroups( config.groups, parsed_user_shit.groups );
                                        }
                                        catch ( e ) {
                                            console.warn( "Corrupted config or non-existent. Ignoring." );// (" + e + ")");
                                        }
                                    }

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
GagConfig.GROUP_NAME_SATIRE_DOMAINS = "Satire and Fake News";
GagConfig.GROUP_NAME_QUESTIONABLE_DOMAINS = "Questionable Content";
