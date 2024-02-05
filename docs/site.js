/*
Written by praetoriani
https://github.com/praetoriani/Web-Components
*/

// Set a new URL
function LoadContentPage(PageName) {
    let RootURL = "https://praetoriani.github.io/web-components/";
    window.location.assign(RootURL+PageName);
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