/**
 * @license
 * Portions of this code are from Silverlight.js under the Ms-PL license.
 *
 * Silverlight.js                      version 4.0.50401.0
 *
 * This file is provided by Microsoft as a helper file for websites that
 * incorporate Silverlight Objects. This file is provided under the Microsoft
 * Public License available at
 * http://code.msdn.microsoft.com/silverlightjs/Project/License.aspx.
 * You may not use or distribute this file or the code in this file except as
 * expressly permitted under that license.
 *
 * Copyright (c) Microsoft Corporation. All rights reserved.
 */

goog.provide('goog.silverlight');


/** @suppress {duplicate} */
var Silverlight = Silverlight || {};

Silverlight.disableAutoStartup = false;

//////////////////////////////////////////////////////////////////
//
// _silverlightCount:
//
// Counter of globalized event handlers
//
//////////////////////////////////////////////////////////////////
Silverlight._silverlightCount = 0;

//////////////////////////////////////////////////////////////////
//
// __onSilverlightInstalledCalled:
//
// Prevents onSilverlightInstalled from being called multiple
// times
//
//////////////////////////////////////////////////////////////////
Silverlight.__onSilverlightInstalledCalled = false;

//////////////////////////////////////////////////////////////////
//
// fwlinkRoot:
//
// Prefix for fwlink URL's
//
//////////////////////////////////////////////////////////////////
Silverlight.fwlinkRoot='http://go2.microsoft.com/fwlink/?LinkID=';

//////////////////////////////////////////////////////////////////
//
// __installationEventFired:
//
// Ensures that only one Installation State event is fired.
//
//////////////////////////////////////////////////////////////////
Silverlight.__installationEventFired = false;

//////////////////////////////////////////////////////////////////
//
// onGetSilverlight:
//
// Called by Silverlight.GetSilverlight to notify the page that a user
// has requested the Silverlight installer
//
//////////////////////////////////////////////////////////////////
Silverlight.onGetSilverlight = null;

//////////////////////////////////////////////////////////////////
//
// onSilverlightInstalled:
//
// Called by Silverlight.WaitForInstallCompletion when the page detects
// that Silverlight has been installed. The event handler is not called
// in upgrade scenarios.
//
//////////////////////////////////////////////////////////////////
Silverlight.onSilverlightInstalled = function () {window.location.reload(false);};

//////////////////////////////////////////////////////////////////
//
// isInstalled:
//
// Checks to see if the correct version is installed
//
//////////////////////////////////////////////////////////////////
Silverlight.isInstalled = function(version)
{
    if (version == undefined)
        version = null;

    var isVersionSupported = false;
    var container = null;

    try
    {
        var control = null;
        var tryNS = false;

        if (window.ActiveXObject)
        {
            try
            {
                control = new ActiveXObject('AgControl.AgControl');
                if (version === null)
                {
                    isVersionSupported = true;
                }
                else if (control.IsVersionSupported(version))
                {
                    isVersionSupported = true;
                }
                control = null;
            }
            catch (e)
            {
                tryNS = true;
            }
        }
        else
        {
            tryNS = true;
        }
        if (tryNS)
        {
            var plugin = navigator.plugins["Silverlight Plug-In"];
            if (plugin)
            {
                if (version === null)
                {
                    isVersionSupported = true;
                }
                else
                {
                    var actualVer = plugin.description;
                    if (actualVer === "1.0.30226.2")
                        actualVer = "2.0.30226.2";
                    var actualVerArray = actualVer.split(".");
                    while (actualVerArray.length > 3)
                    {
                        actualVerArray.pop();
                    }
                    while (actualVerArray.length < 4)
                    {
                        actualVerArray.push(0);
                    }
                    var reqVerArray = version.split(".");
                    while (reqVerArray.length > 4)
                    {
                        reqVerArray.pop();
                    }

                    var requiredVersionPart;
                    var actualVersionPart;
                    var index = 0;


                    do
                    {
                        requiredVersionPart = parseInt(reqVerArray[index]);
                        actualVersionPart = parseInt(actualVerArray[index]);
                        index++;
                    }
                    while (index < reqVerArray.length && requiredVersionPart === actualVersionPart);

                    if (requiredVersionPart <= actualVersionPart && !isNaN(requiredVersionPart))
                    {
                        isVersionSupported = true;
                    }
                }
            }
        }
    }
    catch (e)
    {
        isVersionSupported = false;
    }

    return isVersionSupported;
};
//////////////////////////////////////////////////////////////////
//
// WaitForInstallCompletion:
//
// Occasionally checks for Silverlight installation status. If it
// detects that Silverlight has been installed then it calls
// Silverlight.onSilverlightInstalled();. This is only supported
// if Silverlight was not previously installed on this computer.
//
//////////////////////////////////////////////////////////////////
Silverlight.WaitForInstallCompletion = function()
{
    if ( ! Silverlight.isBrowserRestartRequired && Silverlight.onSilverlightInstalled )
    {
        try
        {
            navigator.plugins.refresh();
        }
        catch(e)
        {
        }
        if (Silverlight.isInstalled(null) && !Silverlight.__onSilverlightInstalledCalled)
        {
            Silverlight.onSilverlightInstalled();
            Silverlight.__onSilverlightInstalledCalled = true;
        }
        else
        {
              setTimeout(Silverlight.WaitForInstallCompletion, 3000);
        }
    }
};
//////////////////////////////////////////////////////////////////
//
// __startup:
//
// Performs startup tasks.
//////////////////////////////////////////////////////////////////
Silverlight.__startup = function()
{
    navigator.plugins.refresh();
    Silverlight.isBrowserRestartRequired = Silverlight.isInstalled(null);
    if (!Silverlight.isBrowserRestartRequired)
    {
        Silverlight.WaitForInstallCompletion();
        if (!Silverlight.__installationEventFired)
        {
            Silverlight.onInstallRequired();
            Silverlight.__installationEventFired = true;
        }
    }
    else if (window.navigator.mimeTypes)
    {
        var mimeSL2 =   navigator.mimeTypes["application/x-silverlight-2"];
        var mimeSL2b2 = navigator.mimeTypes["application/x-silverlight-2-b2"];
        var mimeSL2b1 = navigator.mimeTypes["application/x-silverlight-2-b1"];
        var mimeHighestBeta = mimeSL2b1;
        if (mimeSL2b2)
            mimeHighestBeta = mimeSL2b2;

        if (!mimeSL2 && (mimeSL2b1 || mimeSL2b2))
        {
            if (!Silverlight.__installationEventFired)
            {
                Silverlight.onUpgradeRequired();
                Silverlight.__installationEventFired = true;
            }
        }
        else if (mimeSL2 && mimeHighestBeta)
        {
            if (mimeSL2.enabledPlugin &&
                mimeHighestBeta.enabledPlugin)
            {
                if (mimeSL2.enabledPlugin.description !=
                    mimeHighestBeta.enabledPlugin.description)
                {
                    if (!Silverlight.__installationEventFired)
                    {
                        Silverlight.onRestartRequired();
                        Silverlight.__installationEventFired = true;
                    }
                }
            }
        }
    }
    if (!Silverlight.disableAutoStartup)
    {
        if (window.removeEventListener)
        {
            window.removeEventListener('load', Silverlight.__startup, false);
        }
        else
        {
            window.detachEvent('onload', Silverlight.__startup);
        }
    }
};

///////////////////////////////////////////////////////////////////////////////
//
// This block wires up Silverlight.__startup to be executed once the page
// loads. This is the desired behavior for most sites. If, however, a site
// prefers to control the timing of the Silverlight.__startup call then it should
// put the following block of javascript into the webpage before this file is
// included:
//
//    <script type="text/javascript">
//        if (!window.Silverlight)
//        {
//            window.Silverlight = {};
//        }
//        Silverlight.disableAutoStartup = true;
//    </script>
//
/////////////////////////////////////////////////////////////////////////////////

if (!Silverlight.disableAutoStartup)
{
    if (window.addEventListener)
    {
        window.addEventListener('load', Silverlight.__startup, false);
    }
    else
    {
        window.attachEvent('onload', Silverlight.__startup);
    }
}

///////////////////////////////////////////////////////////////////////////////
// createObject:
//
// Inserts a Silverlight <object> tag or installation experience into the HTML
// DOM based on the current installed state of Silverlight.
//
/////////////////////////////////////////////////////////////////////////////////

Silverlight.createObject = function(source, parentElement, id, properties, events, initParams, userContext)
{
    var slPluginHelper = new Object();
    var slProperties = properties;
    var slEvents = events;

    slPluginHelper.version = slProperties.version;
    slProperties.source = source;
    slPluginHelper.alt = slProperties.alt;

    //rename properties to their tag property names. For bacwards compatibility
    //with Silverlight.js version 1.0
    if ( initParams )
        slProperties.initParams = initParams;
    if ( slProperties.isWindowless && !slProperties.windowless)
        slProperties.windowless = slProperties.isWindowless;
    if ( slProperties.framerate && !slProperties.maxFramerate)
        slProperties.maxFramerate = slProperties.framerate;
    if ( id && !slProperties.id)
        slProperties.id = id;

    // remove elements which are not to be added to the instantiation tag
    delete slProperties.ignoreBrowserVer;
    delete slProperties.inplaceInstallPrompt;
    delete slProperties.version;
    delete slProperties.isWindowless;
    delete slProperties.framerate;
    delete slProperties.data;
    delete slProperties.src;
    delete slProperties.alt;


    // detect that the correct version of Silverlight is installed, else display install

    var slPluginHTML;
    if (Silverlight.isInstalled(slPluginHelper.version))
    {
        //move unknown events to the slProperties array
        for (var name in slEvents)
        {
            if ( slEvents[name])
            {
                if ( name == "onLoad" && typeof slEvents[name] == "function" && slEvents[name].length != 1 )
                {
                    var onLoadHandler = slEvents[name];
                    slEvents[name]=function (sender){ return onLoadHandler(document.getElementById(id), userContext, sender)};
                }
                var handlerName = Silverlight.__getHandlerName(slEvents[name]);
                if ( handlerName != null )
                {
                    slProperties[name] = handlerName;
                    slEvents[name] = null;
                }
                else
                {
                    throw "typeof events."+name+" must be 'function' or 'string'";
                }
            }
        }
        slPluginHTML = Silverlight.buildHTML(slProperties);
    }
    //The control could not be instantiated. Show the installation prompt
    else
    {
        slPluginHTML = Silverlight.buildPromptHTML(slPluginHelper);
    }

    // insert or return the HTML
    if(parentElement)
    {
        parentElement.innerHTML = slPluginHTML;
    }
    else
    {
        return slPluginHTML;
    }

};

///////////////////////////////////////////////////////////////////////////////
//
//  buildHTML:
//
//  create HTML that instantiates the control
//
///////////////////////////////////////////////////////////////////////////////
Silverlight.buildHTML = function( slProperties)
{
    var htmlBuilder = [];

    htmlBuilder.push('<object type=\"application/x-silverlight\" data="data:application/x-silverlight,"');
    if ( slProperties.id != null )
    {
        htmlBuilder.push(' id="' + Silverlight.HtmlAttributeEncode(slProperties.id) + '"');
    }
    if ( slProperties.width != null )
    {
        htmlBuilder.push(' width="' + slProperties.width+ '"');
    }
    if ( slProperties.height != null )
    {
        htmlBuilder.push(' height="' + slProperties.height + '"');
    }
    htmlBuilder.push(' >');

    delete slProperties.id;
    delete slProperties.width;
    delete slProperties.height;

    for (var name in slProperties)
    {
        if (slProperties[name])
        {
            htmlBuilder.push('<param name="'+Silverlight.HtmlAttributeEncode(name)+'" value="'+Silverlight.HtmlAttributeEncode(slProperties[name])+'" />');
        }
    }
    htmlBuilder.push('<\/object>');
    return htmlBuilder.join('');
};



//////////////////////////////////////////////////////////////////
//
// createObjectEx:
//
// takes a single parameter of all createObject
// parameters enclosed in {}
//
//////////////////////////////////////////////////////////////////

Silverlight.createObjectEx = function(params)
{
    var parameters = params;
    var html = Silverlight.createObject(parameters.source, parameters.parentElement, parameters.id, parameters.properties, parameters.events, parameters.initParams, parameters.context);
    if (parameters.parentElement == null)
    {
        return html;
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////
//
// buildPromptHTML
//
// Builds the HTML to prompt the user to download and install Silverlight
//
///////////////////////////////////////////////////////////////////////////////////////////////
Silverlight.buildPromptHTML = function(slPluginHelper)
{
    var slPluginHTML = "";
    var urlRoot = Silverlight.fwlinkRoot;
    var version = slPluginHelper.version ;
    if ( slPluginHelper.alt )
    {
        slPluginHTML = slPluginHelper.alt;
    }
    else
    {
        if (! version)
        {
            version="";
        }
        slPluginHTML = "<a href='javascript:Silverlight.getSilverlight(\"{1}\");' style='text-decoration: none;'><img src='{2}' alt='Get Microsoft Silverlight' style='border-style: none'/></a>";
        slPluginHTML = slPluginHTML.replace('{1}', version);
        slPluginHTML = slPluginHTML.replace('{2}', urlRoot + '108181');
    }

    return slPluginHTML;
};

///////////////////////////////////////////////////////////////////////////////////////////////
//
// getSilverlight:
//
// Navigates the browser to the appropriate Silverlight installer
//
///////////////////////////////////////////////////////////////////////////////////////////////
Silverlight.getSilverlight = function(version)
{
    if (Silverlight.onGetSilverlight )
    {
        Silverlight.onGetSilverlight();
    }

    var shortVer = "";
    var reqVerArray = String(version).split(".");
    if (reqVerArray.length > 1)
    {
        var majorNum = parseInt(reqVerArray[0] );
        if ( isNaN(majorNum) || majorNum < 2 )
        {
            shortVer = "1.0";
        }
        else
        {
            shortVer = reqVerArray[0]+'.'+reqVerArray[1];
        }
    }

    var verArg = "";

    if (shortVer.match(/^\d+\056\d+$/) )
    {
        verArg = "&v="+shortVer;
    }

    Silverlight.followFWLink("149156" + verArg);
};


///////////////////////////////////////////////////////////////////////////////////////////////
//
// followFWLink:
//
// Navigates to a url based on fwlinkid
//
///////////////////////////////////////////////////////////////////////////////////////////////
Silverlight.followFWLink = function(linkid)
{
    top.location=Silverlight.fwlinkRoot+String(linkid);
};

///////////////////////////////////////////////////////////////////////////////////////////////
//
// HtmlAttributeEncode:
//
// Encodes special characters in input strings as charcodes
//
///////////////////////////////////////////////////////////////////////////////////////////////
Silverlight.HtmlAttributeEncode = function( strInput )
{
      var c;
      var retVal = '';

    if(strInput == null)
      {
          return null;
    }

      for(var cnt = 0; cnt < strInput.length; cnt++)
      {
            c = strInput.charCodeAt(cnt);

            if (( ( c > 96 ) && ( c < 123 ) ) ||
                  ( ( c > 64 ) && ( c < 91 ) ) ||
                  ( ( c > 43 ) && ( c < 58 ) && (c!=47)) ||
                  ( c == 95 ))
            {
                  retVal = retVal + String.fromCharCode(c);
            }
            else
            {
                  retVal = retVal + '&#' + c + ';';
            }
      }

      return retVal;
};
///////////////////////////////////////////////////////////////////////////////
//
//  default_error_handler:
//
//  Default error handling function
//
///////////////////////////////////////////////////////////////////////////////

Silverlight.default_error_handler = function (sender, args)
{
    var iErrorCode;
    var errorType = args.ErrorType;

    iErrorCode = args.ErrorCode;

    var errMsg = "\nSilverlight error message     \n" ;

    errMsg += "ErrorCode: "+ iErrorCode + "\n";


    errMsg += "ErrorType: " + errorType + "       \n";
    errMsg += "Message: " + args.ErrorMessage + "     \n";

    if (errorType == "ParserError")
    {
        errMsg += "XamlFile: " + args.xamlFile + "     \n";
        errMsg += "Line: " + args.lineNumber + "     \n";
        errMsg += "Position: " + args.charPosition + "     \n";
    }
    else if (errorType == "RuntimeError")
    {
        if (args.lineNumber != 0)
        {
            errMsg += "Line: " + args.lineNumber + "     \n";
            errMsg += "Position: " +  args.charPosition + "     \n";
        }
        errMsg += "MethodName: " + args.methodName + "     \n";
    }
    alert (errMsg);
};

///////////////////////////////////////////////////////////////////////////////////////////////
//
// __cleanup:
//
// Releases event handler resources when the page is unloaded
//
///////////////////////////////////////////////////////////////////////////////////////////////
Silverlight.__cleanup = function ()
{
    for (var i = Silverlight._silverlightCount - 1; i >= 0; i--) {
        window['__slEvent' + i] = null;
    }
    Silverlight._silverlightCount = 0;
    if (window.removeEventListener) {
       window.removeEventListener('unload', Silverlight.__cleanup , false);
    }
    else {
        window.detachEvent('onunload', Silverlight.__cleanup );
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////
//
// __getHandlerName:
//
// Generates named event handlers for delegates.
//
///////////////////////////////////////////////////////////////////////////////////////////////
Silverlight.__getHandlerName = function (handler)
{
    var handlerName = "";
    if ( typeof handler == "string")
    {
        handlerName = handler;
    }
    else if ( typeof handler == "function" )
    {
        if (Silverlight._silverlightCount == 0)
        {
            if (window.addEventListener)
            {
                window.addEventListener('unload', Silverlight.__cleanup , false);
            }
            else
            {
                window.attachEvent('onunload', Silverlight.__cleanup );
            }
        }
        var count = Silverlight._silverlightCount++;
        handlerName = "__slEvent"+count;

        window[handlerName]=handler;
    }
    else
    {
        handlerName = null;
    }
    return handlerName;
};
//////////////////////////////////////////////////////////////////
//
// onRequiredVersionAvailable:
//
// Called by version  verification control to notify the page that
// an appropriate build of Silverlight is available. The page
// should respond by injecting the appropriate Silverlight control
//
//////////////////////////////////////////////////////////////////
Silverlight.onRequiredVersionAvailable = function()
{

};
//////////////////////////////////////////////////////////////////
//
// onRestartRequired:
//
// Called by version verification control to notify the page that
// an appropriate build of Silverlight is installed but not loaded.
// The page should respond by injecting a clear and visible
// "Thanks for installing. Please restart your browser and return
// to mysite.com" or equivalent into the browser DOM
//
//////////////////////////////////////////////////////////////////
Silverlight.onRestartRequired = function()
{

};
//////////////////////////////////////////////////////////////////
//
// onUpgradeRequired:
//
// Called by version verification control to notify the page that
// Silverlight must be upgraded. The page should respond by
// injecting a clear, visible, and actionable upgrade message into
// the DOM. The message must inform the user that they need to
// upgrade Silverlight to use the page. They are already somewhat
// familiar with the Silverlight product when they encounter this.
// Silverlight should be mentioned so the user expects to see that
// string in the installer UI. However, the Silverlight-powered
// application should be the focus of the solicitation. The user
// wants the app. Silverlight is a means to the app.
//
// The upgrade solicitation will have a button that directs
// the user to the Silverlight installer. Upon click the button
// should both kick off a download of the installer URL and replace
// the Upgrade text with "Thanks for downloading. When the upgarde
// is complete please restart your browser and return to
// mysite.com" or equivalent.
//
// Note: For a more interesting upgrade UX we can use Silverlight
// 1.0-style XAML for this upgrade experience. Contact PiotrP for
// details.
//
//////////////////////////////////////////////////////////////////
Silverlight.onUpgradeRequired = function()
{

};
//////////////////////////////////////////////////////////////////
//
// onInstallRequired:
//
// Called by Silverlight.checkInstallStatus to notify the page
// that Silverlight has not been installed by this user.
// The page should respond by
// injecting a clear, visible, and actionable upgrade message into
// the DOM. The message must inform the user that they need to
// download and install components needed to use the page.
// Silverlight should be mentioned so the user expects to see that
// string in the installer UI. However, the Silverlight-powered
// application should be the focus of the solicitation. The user
// wants the app. Silverlight is a means to the app.
//
// The installation solicitation will have a button that directs
// the user to the Silverlight installer. Upon click the button
// should both kick off a download of the installer URL and replace
// the Upgrade text with "Thanks for downloading. When installation
// is complete you may need to refresh the page to view this
// content" or equivalent.
//
//////////////////////////////////////////////////////////////////
Silverlight.onInstallRequired = function()
{

};

//////////////////////////////////////////////////////////////////
//
// IsVersionAvailableOnError:
//
// This function should be called at the beginning of a web page's
// Silverlight error handler. It will determine if the required
// version of Silverlight is installed and available in the
// current process.
//
// During its execution the function will trigger one of the
// Silverlight installation state events, if appropriate.
//
// Sender and Args should be passed through from  the calling
// onError handler's parameters.
//
// The associated Sivlerlight <object> tag must have
// minRuntimeVersion set and should have autoUpgrade set to false.
//
//////////////////////////////////////////////////////////////////
Silverlight.IsVersionAvailableOnError = function(sender, args)
{
    var retVal = false;
    try
    {
        if (args.ErrorCode == 8001 && !Silverlight.__installationEventFired)
        {
            Silverlight.onUpgradeRequired();
            Silverlight.__installationEventFired = true;
        }
        else if (args.ErrorCode == 8002 && !Silverlight.__installationEventFired)
        {
            Silverlight.onRestartRequired();
            Silverlight.__installationEventFired = true;
        }
        // this handles upgrades from 1.0. That control did not
        // understand the minRuntimeVerison parameter. It also
        // did not know how to parse XAP files, so would throw
        // Parse Error (5014). A Beta 2 control may throw 2106
        else if (args.ErrorCode == 5014 || args.ErrorCode == 2106)
        {
            if (Silverlight.__verifySilverlight2UpgradeSuccess(args.getHost()))
            {
                retVal = true;
            }
        }
        else
        {
            retVal = true;
        }
    }
    catch (e)
    {
    }
    return retVal;
};
//////////////////////////////////////////////////////////////////
//
// IsVersionAvailableOnLoad:
//
// This function should be called at the beginning of a web page's
// Silverlight onLoad handler. It will determine if the required
// version of Silverlight is installed and available in the
// current process.
//
// During its execution the function will trigger one of the
// Silverlight installation state events, if appropriate.
//
// Sender should be passed through from  the calling
// onError handler's parameters.
//
// The associated Sivlerlight <object> tag must have
// minRuntimeVersion set and should have autoUpgrade set to false.
//
//////////////////////////////////////////////////////////////////
Silverlight.IsVersionAvailableOnLoad = function(sender)
{
    var retVal = false;
    try
    {
        if (Silverlight.__verifySilverlight2UpgradeSuccess(sender.getHost()))
        {
            retVal = true;
        }
    }
    catch (e)
    {
    }
    return retVal;
};
//////////////////////////////////////////////////////////////////
//
// __verifySilverlight2UpgradeSuccess:
//
// This internal function helps identify installation state by
// taking advantage of behavioral differences between the
// 1.0 and 2.0 releases of Silverlight.
//
//////////////////////////////////////////////////////////////////
Silverlight.__verifySilverlight2UpgradeSuccess = function(host)
{
    var retVal = false;
    var version = "4.0.50401";
    var installationEvent = null;

    try
    {
        if (host.IsVersionSupported(version + ".99"))
        {
            installationEvent = Silverlight.onRequiredVersionAvailable;
            retVal = true;
        }
        else if (host.IsVersionSupported(version + ".0"))
        {
            installationEvent = Silverlight.onRestartRequired;
        }
        else
        {
            installationEvent = Silverlight.onUpgradeRequired;
        }

        if (installationEvent && !Silverlight.__installationEventFired)
        {
            installationEvent();
            Silverlight.__installationEventFired = true;
        }
    }
    catch (e)
    {
    }
    return retVal;
};
