/*
Written by praetoriani
https://github.com/praetoriani/Web-Components
*/

// Set a new URL
function LoadContentPage(PageName) {
    // Get the URL and remove the filename
    var FullURL = window.location.href;
    var lastIndex = FullURL.lastIndexOf("/");
    FullURL = FullURL.substring(0, lastIndex + 1);

    // Check if we are in a sub-folder
    if (FullURL.endsWith("web-components/")) {
        // If yes, we're shorten the URL to get the root-folder
        FullURL = FullURL.substring(0, FullURL.length - "web-components/".length);
    }

    // Check if we are in a sub-folder
    if (FullURL.endsWith("demo/")) {
        // If yes, we're shorten the URL to get the root-folder
        FullURL = FullURL.substring(0, FullURL.length - "web-components/demo/".length);
    }

    window.location.assign(FullURL+PageName);
}


function BrowserCompatibilityScan() {
    var userAgent = navigator.userAgent;
    var browserName = "unknown";

    // Prüfen auf Firefox
    if (userAgent.indexOf("Firefox") > -1) {
    browserName = "firefox";
    }
    // Prüfen auf Safari (nicht Chrome und nicht Edge, da diese auch den String "Safari" enthalten)
    else if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1 && userAgent.indexOf("Chromium") === -1 && userAgent.indexOf("Edg") === -1) {
    browserName = "safari";
    }
    // Prüfen auf Chromium-basierte Browser (Chrome, Edge, Opera, etc.)
    else if (userAgent.indexOf("Chrome") > -1 || userAgent.indexOf("Chromium") > -1 || userAgent.indexOf("Edg") > -1) {
    browserName = "chromium-based";
    }

    if(browserName == 'firefox' || browserName == 'safari') {
        document.querySelector('simple-popup').UpdateViewMode('InfoPopup','visible');
    } else {
        document.querySelector('simple-popup').UpdateViewMode('InfoPopup','hidden');
    }
}