"use strict";

const SATIRE_ID = "satire_select";
const QUESTIONABLE_ID = "questionable_select";

const TEMPLATE_GROUP_FORM =
        '<!-- FILTER GROUP ---------------------------------------------------- -->' +
        '<div class="mdl-card mdl-shadow--2dp filter-group">' +
        '<span>' +
        '<div class="mdl-tooltip mdl-tooltip--large" for="group-color-top-{{id}}">Color Top</div>' +
        '<div class="mdl-tooltip mdl-tooltip--large" for="group-color-bottom-{{id}}">Color Bottom</div>' +
        '<div class="mdl-tooltip mdl-tooltip--large" for="group-name-{{id}}">Unique name for this group of sites</div>' +
        '<div class="mdl-tooltip mdl-tooltip--large" for="group-domains-{{id}}">Comma separated list of hostnames ("example.com, potato.com, chungus.com")</div>' +
        '</span>' +
        '<form action="#">' +
        '<div>' +
        '<label>Name</label><input type="text" name="group-name" id="group-name-{{id}}" value="{{name}}"/>' +
        '<span class="group-colors">' +
        '<input class="group-color-top" id="group-color-top-{{id}}" type="color" name="group-color-top" value="{{color_top}}"/>' +
        '<input class="group-color-bottom" type="color" id="group-color-bottom-{{id}}" name="group-color-bottom" value="{{color_bottom}}"/>' +
        '</span>' +
        '</div>' +

        '<div>' +
        '<label>Hostnames <textarea rows=6 id="group-domains-{{id}}" name="group-domains">{{csv_domains}}</textarea></label>' +
        '</div>' +

        '<div class="group-options mdl-card__menu" style="clear: both">' +
        '<button id="group-option-menu-{{id}}" class="mdl-button mdl-js-button mdl-button--icon">' +
        '<i class="material-icons">more_vert</i>' +
        '</button>' +
        '<ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="group-option-menu-{{id}}">' +
        '<li class="mdl-menu__item">Delete Group</li>' +
        '</ul>' +
        '</div>' +
        '</form>' +
        '</div>' +
        '<!-- FILTER GROUP END ------------------------------------------------- -->';

var gag = new Gag();
var is_first_run = false;
var config_data = null;

window.onload = function ()
{
    if ( localStorage[Gag.INIT_COMPLETE_KEY] === null ) {
        is_first_run = true;
        console.log( "First run; loading" );
    }

    bindInputs();

    // Send a message to our background page to let it know we've ended the popup session
    // We'll pass it the updated config information so it can save it and put it into action

    $( window ).unload( function () {
            var app_data = {
                items: [
                    {a: 'a', b: 'b'},
                    {a: 'a', b: 'b'},
                    {a: 'a', b: 'b'},
                    {a: 'a', b: 'b'}
                ]
            };

            chrome.extension.sendMessage(
                    {
                        type:   "popup-closed",
                        config: app_data
                    } );
        }
    );

    gag.loadConfig(function(){
        config_data = gag.getConfig();
        refreshContents();
    });
};

/**
 * Bind inputs on popup.html
 * (We can't do this from inside the HTML file because of Chrome security.)
 */
function bindInputs()
{
    $( "#btnRestoreDefaults" ).click( function () {
        if ( confirm( "This will delete all your settings, and restore default groups. Are you sure?" ) ) {
            gag.resetConfig();
        }
    } );
}

/**
 * Load up first time run defaults
 */
function setDefaults()
{
    localStorage["not_first_run"] = true;
}

/**
 * Refresh the contents of the popup #Contents with our config data
 */
function refreshContents()
{
    var $content = $( "#Content" );
    $content.empty();

    var config = gag.getConfig();

    for ( var i = 0; i < config.groups.length; i++ ) {

        var compiled = MicroMustache.render( TEMPLATE_GROUP_FORM, {
            id:           i,
            name:         config.groups[i].name,
            csv_domains:  config.groups[i].domains.join( ', ' ),
            color_top:    config.groups[i].color_top,
            color_bottom: config.groups[i].color_bottom
        } );

        $content.append( compiled );
    }

    componentHandler.upgradeDom();
}
