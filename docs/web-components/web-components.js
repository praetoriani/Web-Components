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

/* Due to we're going to manipulate the DOM, we have to make sure, that the DOM is fully loaded */
document.addEventListener('DOMContentLoaded', function() {

  /* Let's configure some timed functions to make those animations look gret :) */
  setTimeout(function() {
    document.getElementById("SiteFooterGlassFX").style.visibility = "visible";
    document.getElementById("SiteFooter").style.visibility = "visible";
  }, 2000);

  setTimeout(function() {
    var SFBlrBox = document.getElementById("SiteFooterGlassFX");
    document.body.removeChild(SFBlrBox);
  }, 2800);

  setTimeout(function() {
    var Curtain1 = document.getElementById("CurtainPosL");
    var Curtain2 = document.getElementById("CurtainPosR");
    document.body.removeChild(Curtain1);
    document.body.removeChild(Curtain2);
  }, 2100);

});