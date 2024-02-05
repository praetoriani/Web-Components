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

function CopyCodeToClipboard(CodeBoxID) {
  var code = document.getElementById(CodeBoxID).innerText;
  var modifiedCode = code.replace(/\u00A0/g, ' ');
  navigator.clipboard.writeText(modifiedCode).then(function() {
    document.getElementById(CodeBoxID+"-okay").style.visibility = "visible";
    console.info("Code successfully copied to clipboard");
    setTimeout(function() {
      document.getElementById(CodeBoxID+"-okay").style.visibility = "hidden";
    }, 1500);
  })
  .catch(function(err) {
    console.error('Error copying text to clipboard: ', err);
  });
}

/* Due to we're going to manipulate the DOM, we have to make sure, that the DOM is fully loaded */
document.addEventListener('DOMContentLoaded', function() {
  
  /* Let's configure some timed functions to make those animations look gret :) */
  setTimeout(function() {
    document.getElementById("SiteFooterGlassFX").style.visibility = "visible";
    document.getElementById("SiteFooter").style.visibility = "visible";
  }, 4000);

  setTimeout(function() {
    var SFBlrBox = document.getElementById("SiteFooterGlassFX");
    document.body.removeChild(SFBlrBox);
  }, 4850);

});