"use strict";

var Gag = function () {
//    this.self = this;

    const ARTICLE_CLASS = "div.mbm";

    const ARTICLE_LINK_SELECTOR = "a._52c6";

    const SATIRE_DOMAINS = [
        "onion.com", "theonion.com", "clickhole.com", "private-eye.co.uk", "newsbiscuit.com", "thespoof.com",
        "unconfirmedsources.com", "cap-news.com", "enduringvision.com", "derfmagazine.com", "newsmutiny.com",
        "p4rgaming.com", "thedailypixel.com", "dailycurrant.com", "borowitz-report", "callthecops.net",
        "empirenews.net", "empiresports.co", "freewoodpost.com", "mediafetcher.com", "globalassociatednews.com",
        "huzlers.com", "thelapine.ca", "lightlybraisedturnip.com", "mediamass.net", "nationalreport.net",
        "theracketreport.com", "weeklyworldnews.com", "worldnewsdailyreport.com", "scrappleface.com", "bongonews.com",
        "thepeoplescube.com", "utm_hp_ref=satire", "newswatch28.com", "thenewsnerd.com", "dailymediabuzz.com",
        "demyx.com", "americannews.com", "newslo.com", "shareonfb.com", "chronicle.su", "duffelblog.com",
        "duhprogressive.com", "stubhillnews.com"
    ];

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
        "truthbroadcastnetwork.com", "usahitman.com", "veteranstoday.com", "westernjournalism.com",
        "whydontyoutrythis.com", "healthyandnaturallife.com", "dailycaller.com"
    ];

    var _config = this.getDefaults();

    var runHighlighting = function () {

        $( ARTICLE_CLASS ).each(
                function () {

                    var self = $( this );
                    var href = $( ARTICLE_LINK_SELECTOR, self ).attr( "onmouseover" ) || null;
                    if ( href != null ) {
                        parse( SATIRE_DOMAINS, "satireItem", href );
                        parse( QUESTIONABLE_DOMAINS, "questionableItem", href );
                    }

                }
        );
    };

    this.getConfig = function () { return _config; }

    var parse = function ( source_elements, marking_class, source_url ) {

        source_url = source_url.toLowerCase();

        source_elements.forEach( function ( element, index, array ) {
            if ( source_url.indexOf( element ) >= 0 ) {
                self.addClass( marking_class );
//                                console.log(marking_class + " type MATCHED", element);
//                                var title = $("h5 a :first", self);
//                                if (title && !title.data("modified")) {
//                                   title.html( title.html() + "<span class=\"satire_label\">* Satire</span>");
//                                   title.data("modified", true);
//                                }
                return false;
            }
            return true;
        } );

    };
};

Gag.prototype.loadConfig = function ( on_ready_callback ) {
    chrome.storage.sync.get( "config",
                             function ( response ) {
                                 if ( response === null ) {
                                     throw "No config in storage";
                                 }
                                 on_ready_callback();
                             } );
}

Gag.prototype.getDefaults = function () {
    return {
        groups: [
            {
                'name':    "News Satire",
                'domains': self.SATIRE_DOMAINS
            },
            {
                'name':    "Questionable Sources",
                'domains': self.QUESTIONABLE_DOMAINS
            }
        ]
    }
};

Gag.prototype.loadDefaults = function () {
    var config = this.getDefaults();
    chrome.storage.sync.set( {'config': this.getConfig()} );
};

Gag.prototype.run = function () {
    self.loadConfig();
    setTimeout( this.runHighlighting(), this.REFRESH_DELAY );
};
