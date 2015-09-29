"use strict";

/**
 * Default list of domains for the "Satirical News" group
 * @type {string[]}
 */
const SATIRE_DOMAINS = [
    "onion.com", "theonion.com", "clickhole.com", "private-eye.co.uk", "newsbiscuit.com", "thespoof.com",
    "unconfirmedsources.com", "cap-news.com", "enduringvision.com", "derfmagazine.com", "newsmutiny.com",
    "p4rgaming.com", "thedailypixel.com", "dailycurrant.com", "borowitz-report", "callthecops.net",
    "empirenews.net", "empiresports.co", "freewoodpost.com", "mediafetcher.com", "globalassociatednews.com",
    "huzlers.com", "thelapine.ca", "lightlybraisedturnip.com", "mediamass.net", "nationalreport.net",
    "theracketreport.com", "weeklyworldnews.com", "worldnewsdailyreport.com", "scrappleface.com", "bongonews.com",
    "thepeoplescube.com", "utm_hp_ref=satire", "newswatch28.com", "thenewsnerd.com", "dailymediabuzz.com",
    "demyx.com", "americannews.com", "newslo.com", "shareonfb.com", "chronicle.su", "duffelblog.com",
    "duhprogressive.com", "stubhillnews.com", "nbc.com.co", "subgenius.com"
];

/**
 * Default list of domains for the "Questionable Sources" group
 * @type {string[]}
 */
const QUESTIONABLE_DOMAINS = [
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

/********************************************************
 * Gag Reflex main class
 * @constructor
 */
var Gag = function () {
    this.self = this;

    this.INIT_COMPLETE_KEY = 'init_complete';
    this.ARTICLE_CLASS = "div.mbm";
    this.ARTICLE_LINK_SELECTOR = "a._52c6";

    this.REFRESH_DELAY = 1000;

    var _config;

    /***************************************
     * Getter/Setter for current config data
     * @returns {*}
     */
    this.getConfig = function () { return _config; };
    this.setConfig = function ( config ) { _config = config; };

    /***************************************
     * Callback to do highlighting on page
     */
    this.runHighlighting = function () {
        var gag = this;
        $( gag.ARTICLE_CLASS ).each(
                function ()
                {
                    var href = $( gag.ARTICLE_LINK_SELECTOR, this ).attr( "onmouseover" ) || null;

                    if ( href != null ) {
                        if ( !parse( SATIRE_DOMAINS, "satireItem", href, this ) ) {
                            parse( QUESTIONABLE_DOMAINS, "questionableItem", href, this );
                        }
                    }
                }
        );
        setTimeout(this.runHighlighting.bind(this), this.REFRESH_DELAY );

    };

    /***************************************
     * Perform pattern matching vs a filter
     * @param source_elements
     * @param marking_class
     * @param source_url
     */
    var parse = function ( source_elements, marking_class, source_url, parent_element )
    {
        var has_matched_entry = false;
        source_url = source_url.toLowerCase();

        // Iterate through domains
        source_elements.forEach( function ( element, index, array )
                                 {
                                     // Does the domain match somewhere in the URL? // FIXME
                                     if ( source_url.indexOf( element ) >= 0 ) {

                                         // Brand it with the class belonging to the group
                                         parent_element.classList.add( marking_class );
                                         has_matched_entry = true;
                                         return false;
                                     }
                                     return true;
                                 } );
        return has_matched_entry;
    };


    /********************************************************
     * Begin processing the current page
     */
    this.run = function () {
        this.loadConfig( function () {
            setTimeout( this.runHighlighting.bind(this), this.REFRESH_DELAY );
        } );
    };

    /**
     * Construct
     */
    if ( localStorage.getItem( this.INIT_COMPLETE_KEY ) === null ) {
        this.firstRunInit();
    }
};

Gag.prototype.createGroupObject = function ( obj ) {
    return {
        name: obj.name || "",                         // Name of the group
        domains: obj.domains || [],                   // Array of hostnames to match this filter
        color_top: obj.color_top || "#ffffff",        // Gradient will fade from this
        color_bottom: obj.color_bottom || "#ffffff",  // Gradient will fade to this
        external: obj.external || false               // Read-only; will be updated on new version
    };
};

/********************************************************
 * Retrieve the config data from client local storage
 * @param on_ready_callback
 */
Gag.prototype.loadConfig = function ( on_ready_callback ) {
    //chrome.storage.sync.get
    var conf = localStorage.getItem( "config" );
    if ( conf === null ) {
        throw "No config in storage";
    }

    this.setConfig( JSON.parse( conf ) );
    // this callback is a throwback to when I was using chrome
    // storage; keeping this here in case I move back to that
    var foo = on_ready_callback.bind(this);
    foo();
};

/********************************************************
 * Returns a clean install default configuration object
 * @returns {{groups: *[]}}
 */
Gag.prototype.getDefaults = function () {
    return {
        groups: [
            this.createGroupObject( {
                                        name:         "News Satire",
                                        domains:      SATIRE_DOMAINS,
                                        color_top:    "#ffdd88",
                                        color_bottom: "#ffffee"
                                    } ),
            this.createGroupObject( {
                                        name:         "Questionable Sources",
                                        domains:      QUESTIONABLE_DOMAINS,
                                        color_top:    "#c0c76a",
                                        color_bottom: "#ffffee"
                                    } )
        ]
    };
};

/********************************************************
 * Reset and save config data
 */
Gag.prototype.loadDefaults = function () {
    this.setConfig( this.getDefaults() );
    //chrome.storage.sync.set( {'config': this.getConfig()} );
    localStorage.setItem( 'config', JSON.stringify( this.getConfig() ) );
};

/********************************************************
 * Run these commands to intialize the extension if this
 * is our first time being loaded.
 */
Gag.prototype.firstRunInit = function () {
    console.log( "First time being run; installing defaults" )
    this.loadDefaults();
    var self = this;
    this.loadConfig( function () {
        localStorage.setItem( "init_complete", true );
        self.loadDefaults();
    } );

}


