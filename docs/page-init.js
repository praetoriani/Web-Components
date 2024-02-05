/*
(c) 2024 by praetoriani
https://github.com/praetoriani
*/

let URLstring = window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/"));

var CMDlines = 5;   // Total number of lines
var CMDinput = 1;   // Current text line

var CharCount= 0;
var TypeSpeed= 82;

var msgtxtcmd = {
1: " Github Repository found: ./praetoriani/Web-Components/",
2: " Directory scan completed: All files have been loaded 😍",
3: " Built-Process has finished: Amazing cool stuff is waiting for you 🤯",
4: " So, ... we're ready to go 😃",
5: " Buckle up. We,re launching the rocket 🚀",
};

var CheckMark = `[<strong class="CheckMark">&check;</strong>]`;

const sleep = (milliseconds) => {
return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function Redirect() {
    location.replace(URLstring+'/landingpage.html');
}

/* prevent right click menu */
window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
}, false);

window.onload = function() {

    setTimeout(function() {

        function typeWriter() {

            if(CMDinput <= CMDlines) {
                
                let CurrentElement = document.getElementById('CMDline0'+CMDinput);
                let CurrentMsgText = String(msgtxtcmd[CMDinput]);
    
                if(CharCount == 0) {
                    CurrentElement.classList.remove("PassiveCMDprompt");
                    CurrentElement.classList.add("CurrentCMDprompt");
                    if(CMDinput <= 3) {
                        CurrentElement.innerHTML = CheckMark;
                    }
                    CurrentElement.style.visibility = 'visible';
                }

                if(CharCount < CurrentMsgText.length ) {
                    CurrentElement.innerHTML += CurrentMsgText.charAt(CharCount);
                    CharCount++;
                    setTimeout(typeWriter, TypeSpeed);
                } else if(CharCount == CurrentMsgText.length ) {
                    setTimeout(() => {
                        CurrentElement.classList.remove("CurrentCMDprompt");
                        CurrentElement.classList.add("PassiveCMDprompt");
                        CurrentElement.style.visibility = 'visible';
                        CharCount = 0;
                        CMDinput += 1;
                        typeWriter();
                    }, 1000 + TypeSpeed);
                }
            } else {
                console.log("typeWriter() has finished");
                setTimeout(() => {
                    Redirect();
                }, 4000);
            }
        }
        typeWriter();
    }, 9000); 

};
