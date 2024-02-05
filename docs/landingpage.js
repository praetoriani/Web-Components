/*
(c) 2024 by praetoriani
https://github.com/praetoriani
*/

let URLstring = window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/"));

var UserScreenX = "";
var UserScreenY = "";

var UserScreenPopup = false;

/* prevent right click menu */
window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
}, false);

/* Simple function to switch to another page/url */
function Redirect(SiteName) {
  window.location.assign(URLstring+'/'+SiteName);
}

function GetUserScreenRes() {
  
  UserScreenX = window.screen.width;
  UserScreenY = window.screen.height;

  // Check if the screen resolution is 1366x768 (or lower)
  if (UserScreenX <= 1366 && UserScreenY <= 768) {
    if (!document.fullscreenElement) {
      console.info("Current Screen Resolution: "+UserScreenX+"x"+UserScreenY+"");
      console.warn("Recommendet Resolution: 1280x1024 [!!]");
      console.info("Looks like you're using a small screen. We recommend that you view this website in full screen mode. All you have to do is press the [F11] key once.");
    }
  } else {
    console.info("Current Screen Resolution: "+UserScreenX+"x"+UserScreenY+"");
    console.info("Perfect Resolution :-)");
  }
}

/* Due to we're going to manipulate the DOM, we have to make sure, that the DOM is fully loaded */
document.addEventListener('DOMContentLoaded', function() {
  /* The following two anonymous functions are fired 100ms and 5100ms after loading the dom has finished.
     They simply check the screen resolution and will display a message for 5 seconds (if resolution is too small)
  */
  setTimeout(function() {
    let UserScreenInfo = document.getElementById("ScreenResInfo").style;
    UserScreenX = window.screen.width;
    UserScreenY = window.screen.height;
  
    if (UserScreenX <= 1366 && UserScreenY <= 768) {
      if( window.innerWidth >= UserScreenX && window.innerHeight >= UserScreenY) {
        UserScreenInfo.visibility = 'hidden';
        UserScreenPopup = false;
      } else {
        UserScreenInfo.visibility = 'visible';
        UserScreenPopup = true;
      }
    }
  }, 4500);

  setTimeout(function() {
    let UserScreenInfo = document.getElementById("ScreenResInfo").style;
    if (UserScreenPopup == true) {
      UserScreenInfo.visibility = 'hidden';
      UserScreenPopup = false;
    }
  }, 9500);

  /* Let's configure some timed functions to make those animations look gret :) */
  setTimeout(function() {
    document.getElementById("SiteFooterGlassFX").style.visibility = "visible";
    document.getElementById("SiteFooter").style.visibility = "visible";
  }, 3200);

  setTimeout(function() {
    var SFBlrBox = document.getElementById("SiteFooterGlassFX");
    document.body.removeChild(SFBlrBox);
  }, 4100);

  setTimeout(function() {
    var CShield1 = document.getElementById("CardShield1");
    var CShiled2 = document.getElementById("CardShield2");
    var CShiled3 = document.getElementById("CardShield3");
    document.body.removeChild(CShield1);
    document.body.removeChild(CShiled2);
    document.body.removeChild(CShiled3);
  }, 2250);

});