const ARTICLE_CLASS = "div.mbm";

const ARTICLE_LINK_SELECTOR = "a._52c6";

const SATIRE_DOMAINS = [
    "onion.com", "theonion.com", "clickhole.com", "private-eye.co.uk", "newsbiscuit.com", "thespoof.com",
    "unconfirmedsources.com", "cap-news.com", "enduringvision.com", "derfmagazine.com", "newsmutiny.com",
    "p4rgaming.com", "thedailypixel.com", "dailycurrant.com", "borowitz-report", "callthecops.net",
    "empirenews.net", "empiresports.co", "freewoodpost.com", "mediafetcher.com", "globalassociatednews.com",
    "huzlers.com", "thelapine.ca", "lightlybraisedturnip.com", "mediamass.net", "nationalreport.net",
    "theracketreport.com", "weeklyworldnews.com", "worldnewsdailyreport.com", "scrappleface.com",
    "bongonews.com", "thepeoplescube.com", "utm_hp_ref=satire", "newswatch28.com", "thenewsnerd.com",
    "dailymediabuzz.com", "demyx.com"
];

const REFRESH_DELAY = 750;

$().ready(function (){
    parsePage();
});

function parsePage()
{
    $(ARTICLE_CLASS).each(
        function (index)
        {
            var self = $(this);
            var href = $(ARTICLE_LINK_SELECTOR, self).attr("onmouseover") || null;
            if (href != null)
            {
                href = href.toLowerCase();
                SATIRE_DOMAINS.forEach(
                    function (element, index, array)
                    {
                        if (href.indexOf(element) >= 0)
                        {
                            self.addClass("satireItem");
//                        var title = $("h5 a :first", self);
//                        if (title && !title.data("modified")) {
//                            title.html( title.html() + "<span class=\"satire_label\">* Satire</span>");
//                            title.data("modified", true);
//                        }
                            return false;
                        }
                        return true;
                    });
            }
        }
    );

    setTimeout(parsePage, REFRESH_DELAY);
}