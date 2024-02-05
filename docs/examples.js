/*
(c) 2024 by praetoriani
https://github.com/praetoriani
*/

let URLstring = window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/"));

var UserScreenX = "";
var UserScreenY = "";

/* prevent right click menu */
window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
}, false);

/* Simple function to switch to another page/url */
function Redirect(SiteName) {
  window.location.assign(URLstring+'/'+SiteName);
}

function HandleTooltip(tpid) {
  if( document.getElementById(tpid) ) {
    if( document.getElementById(tpid).style.visibility == 'visible' ) {
      document.getElementById(tpid).style.visibility = 'hidden';
    } else {
      document.getElementById(tpid).style.visibility = 'visible';
    }
  }
}

/* Due to we're going to manipulate the DOM, we have to make sure, that the DOM is fully loaded */
document.addEventListener('DOMContentLoaded', function() {

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
    document.getElementById("PopupInfo3").style.visibility = "visible";
  }, 1250);

  setTimeout(function() {
    document.getElementById("PopupInfo2").style.visibility = "visible";
  }, 1500);

  setTimeout(function() {
    document.getElementById("PopupInfo1").style.visibility = "visible";
  }, 1750);

});