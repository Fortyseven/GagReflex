"use strict";

var Popup = function()
{
    var _gagconfig;
    var _config_data = null;
    var _edit_element = null;
    var _edit_form = null;
    var _self = this;

    /**
     * Callback when 'cancel' is clicked.
     */
    this.onEditCancel = function ()
    {
        _edit_element.hide();
    };

    /**
     * Callback when 'delete' is clicked. Confirms and performs group deletion.
     */
    this.onEditDeleteGroup = function()
    {
        if (confirm("Really delete this group?")) {
            var id = _edit_form.data( 'group_id' );
            this._config_data.groups.splice(id,1);

            this.saveConfig();

            _self.refreshContents();

            this.onEditCancel();
        }
    };

    /**
     * Restore edit page to sane defaults.
     */
    this.resetEditForm = function ()
    {
        _edit_form.data( 'group_id', null );
        $( ".group-domains", _edit_form ).prop( "disabled", false ).removeClass( "group-disabled" );
        $( ".group-name", _edit_form ).prop( "disabled", false ).removeClass( "group-disabled" );
        $( ".group-enabled", _edit_form ).prop( "checked", true );
        $( "#btnEditDelete", _edit_form ).show();
    };

    /**
     * Sends the current config settings to the background page for storing in localStorage
     */
    this.saveConfig = function()
    {
        chrome.extension.sendMessage( { method: GagConfig.MSG_POPUP_SAVED, config: JSON.stringify( this._config_data ) } );
    };

    /**
     * Validates edit form data.
     * Throws exception if form contents are not valid.
     *
     * @param new_group
     * @param is_new
     */
    this.validateGroup = function ( new_group, is_new )
    {
        if ( new_group.name.trim().length < 1 ) {
            throw "Valid group name required.";
        }
        if ( new_group.domains.length < 1 ) {
            throw "Domain list is empty.";
        }
        if ( is_new ) {
            for ( var i in this._config_data.groups ) {
                if ( this._config_data.groups[i].name.trim().toLowerCase() == new_group.name.trim().toLowerCase() ) {
                    throw "Cannot use existing group name."
                }
            }
        }
    };

    /**
     * Callback when 'save' is clicked
     */
    this.onEditSaveGroup = function()
    {
        var id = _edit_form.data( 'group_id' );

        var new_group = _gagconfig.createGroupObject( this._config_data.groups[id] || null );

        new_group.name = $( ".group-name", _edit_form ).val();
        new_group.color_top = $( ".group-color-top", _edit_form ).val();
        //new_group.color_bottom = $( ".group-color-bottom", _edit_form ).val();

        var doms = new_group.domains = $( ".group-domains", _edit_form ).val().split( ',' );
        new_group.domains = [];

        for ( var i in doms ) {
            doms[i] = doms[i].trim();
            if ( doms[i].length > 0 ) {
                new_group.domains.push( doms[i] );
            }
        }

        new_group.is_enabled = $( ".group-enabled", _edit_form )[0].checked ? 1 : 0;

        try {
            // If this is a new group, push it onto the groups array, otherwise
            // replace the original entry with the updated record

            this.validateGroup( new_group, id == null );
            if ( id === undefined ) {
                this._config_data.groups.push( new_group );
            }
            else {
                this._config_data.groups[id] = new_group;
            }

            this.resetEditForm();

            this.saveConfig();

            _self.refreshContents();

            this.onEditCancel();
        }
        catch(e) {
            alert("Could not save: " + e);
        }
    };

    /**
     * Bind inputs on popup.html
     * (We can't do this from inside the HTML file because of Chrome security.)
     */
    function bindInputs()
    {
        $("#btnRestoreDefaults" ).click(function() {
            if (confirm("This will delete all of your groups and reset the extension. Are you sure?")) {
                chrome.extension.sendMessage( { method: GagConfig.MSG_POPUP_FACTORYRESET } );
                window.location.reload()
            }
        });
        $("#btnChromeStorePage" ).click(function() {
            chrome.tabs.create({url:"https://chrome.google.com/webstore/detail/gag-reflex/aceebhdjinpebfnbmbcgcmnldkfppanh"});
        });

        $( "#btnEditDelete", _edit_form ).click( function () {
            _self.onEditDeleteGroup();
        } );

        $( "#btnEditCancel", _edit_form ).click( function () {
            _self.onEditCancel();
        } );

        $( "#btnEditSave", _edit_form ).click( function () {
            _self.onEditSaveGroup();
        } );

        $(".btn-new button" ).click(function(){
            _self.EditGroup(null);
        });

        $("#OptionRenderFacebook" ).click(function(){
            _self._config_data.options.enabledOnFacebook = $( this ).is( ":checked" );
            _self.saveConfig();
        });

        $("#OptionRenderReddit" ).click(function(){
            _self._config_data.options.enabledOnReddit = $( this ).is( ":checked" );
            _self.saveConfig();
        });
    }


    this.TEMPLATE_GROUP_FORM = "<div data-group-id='{{id}}' class='mdl-shadow--2dp group-entry' style='{{grad_css}}'>" +
                                    "<span class='name {{is_disabled}}'>{{name}}</span>"+
                                    "<span class='count'> ({{count}} domain{{plural}})</span>" +
                               "</div>";

    /*********************************************************************
     * Refresh the contents of the popup #Contents with our config data
     */
    this.refreshContents = function()
    {
        var $content = $( "#Content" );
        $content.empty();

        for ( var i = 0; i < this._config_data.groups.length; i++ ) {

//                grad_css: "background:-webkit-gradient(linear, left top, left bottom, " +
//                          "color-stop(100%, " + this._config_data.groups[i].color_bottom + "), " +
//                          "color-stop(0%, " + this._config_data.groups[i].color_top + "))",
//                color_top:    this._config_data.groups[i].color_top,
//                color_bottom: this._config_data.groups[i].color_bottom,


            var compiled = $(MicroMustache.render( this.TEMPLATE_GROUP_FORM, {
                id:             i,
                name:           this._config_data.groups[i].name,
                is_disabled:    this._config_data.groups[i].is_enabled ? "" : "is_disabled",
                grad_css:       "background-color: " + this._config_data.groups[i].color_top,
                count:          this._config_data.groups[i].domains.length,
                plural:         (this._config_data.groups[i].domains.length > 1) ? "s" : ""
            } ));

            $(compiled).click(function(){
                _self.EditGroup( $( this ).data( "group-id" ) );
            });

//            if (this._config_data.groups[i].readonly) {
//                $("textarea, input", compiled ).attr("readonly", "1" ).attr("disabled", "1");
//            }

            $content.append( compiled );
        }

        // Fill options

        $( "#OptionRenderFacebook" ).prop( "checked", _self._config_data.options.enabledOnFacebook );
        $( "#OptionRenderReddit" ).prop( "checked", _self._config_data.options.enabledOnReddit );

        componentHandler.upgradeDom();
    };

    /*********************************************************************
     *
     */
    this.populateEditForm = function( id, group )
    {
        _edit_element.show();

        this.resetEditForm();

        var new_group = _gagconfig.createGroupObject( group );

        _edit_form.data( "group_id", id );

        $( ".group-name", _edit_form ).val( new_group.name );
        $( ".group-domains", _edit_form ).val( new_group.domains.join( ', ' ) );
        $( ".group-color-top", _edit_form ).val( new_group.color_top );

        if (new_group.is_enabled == 1)
            $( ".group-enabled", _edit_form ).prop( "checked",  true);
        else
            $( ".group-enabled", _edit_form ).prop( "checked",  false );


        if ( new_group.readonly === 1 ) {
            $( ".group-domains", _edit_form ).prop( "disabled", true ).addClass( "group-disabled" );
            $( ".group-name", _edit_form ).prop( "disabled", true ).addClass( "group-disabled" );
            $( "#btnEditDelete", _edit_form ).hide();
        }
    };

    /*********************************************************************
     *
     */
    function init()
    {
        // Send a message to our background page to let it know we've ended the popup session
        // We'll pass it the updated config information so it can save it and put it into action

        $( window ).unload( function () {
            chrome.extension.sendMessage( { method: GagConfig.MSG_POPUP_CLOSED, config: _config_data } );
        });

        _edit_element = $( "#EditBox" );
        _edit_form = $( ".dialog", _edit_element );
        _edit_element.hide();

        _gagconfig = new GagConfig(function(config) {
            _self._config_data = config;
            _self.refreshContents();
        });

        bindInputs();
    }

    // construct
    init();
};

/**************************************************************************/
Popup.prototype.EditGroup = function ( id )
{
    if ( id === null ) {
        // New group
        this.populateEditForm( null, null );
    }
    else {
        // Existing group
        this.populateEditForm( id, this._config_data.groups[id] );
    }
};


/**************************************************************************/
var popup = null;

window.onload = function()
{
    popup = new Popup();
};
