/*
Written by praetoriani
https://github.com/praetoriani/Web-Components

CODEBOX WEB COMPONENT
Version:        v1.00.24
Last Update:  08.02.2024

*/
/*
The PrivateCodeBoxComponent Object stores important informations about the web component!
[!!]   D O   N O T   C H A N G E   T H E S E   L I N E S   [!!]
*/
const PrivateCodeBoxComponent = {};

Object.defineProperty( PrivateCodeBoxComponent,'construcor',{
	value: 'code-box',
	writable: false
});

Object.defineProperty( PrivateCodeBoxComponent,'cssfilesrc',{
	value: 'codebox.css',
	writable: false
});

/*
The ShadowDOM Class provides several functions to deal with instances of web components created in a Shadow DOM.
DEPENDENCIES: No dependencies!

ChangeVisibility(DOMinstance,ObjectID,ViewMode)
This function can be used to change the CSS “Visibility” property of an HTML element. You must pass a reference of the
Web Component Class that was used to create the component. Every time a web component is created, it is rendered in its own,
isolated Shadow DOM. The class (that creates the web component) creates an instance of the component.
This is important to understand. By referencing the web component class, the ChangeVisibility() function knows which Shadow DOM
holds the Web Component! It can then search all possible instances of the object in all Shadow DOMs created by the Web Component Class.

DOMinstance  (string)  [required]
This is the reference to the Web Component Class. Here is an example: A Web Component Class has the following line:
window.customElements.define('my-web-component', MyOwnWebComponent);
In this case, the string 'my-web-component' is the reference we need as DOMinstance for the ChangeVisibility() function

ObjectID     (string)  [required]
This is a reference to the ID of your HTML ELement. The ChangeVisibility() function tries to find this HTML Element in
all instances of all Shadow DOMs created by the Web Component Class.

ViewMode     (string)  [required]
The ViewMode param can only be 'visible' or 'hidden'. 
*/
class ShadowDOM {

    static GetHTMLelement(DOMinstance,ObjectID) {
        // Try to get access to all possible instances created by the web component class
        const ShadowDOMnode = document.querySelectorAll(DOMinstance);
        // let's "walk" through all possible shadow DOMs
        for (const NodeObject of ShadowDOMnode) {
            // Try to get the Shadow DOM of the current HTML element
            const ShadowDOMroot = NodeObject.shadowRoot;
            // If a Shadow DOM exists, search within it for the element with the given ID
            if (ShadowDOMroot) {
                const foundElement = ShadowDOMroot.getElementById(ObjectID);
                if (foundElement) {
                    // If the element is found, we're going to return to the caller with a reference to the object
                    return [DOMinstance, ObjectID, foundElement];
                }
            }
        }
        // If no element was found at all, we're going to return 'null'
        return [DOMinstance, ObjectID, null];
    }

    static GetComponent(DOMinstance,ObjectID) {
        // Try to get access to all possible instances created by the web component class
        const ShadowDOMnode = document.querySelectorAll(DOMinstance);
        // let's "walk" through all possible shadow DOMs
        for (const NodeObject of ShadowDOMnode) {
            // Try to get the Shadow DOM of the current HTML element
            const ShadowDOMroot = NodeObject.shadowRoot;
            // If a Shadow DOM exists, search within it for the element with the given ID
            if (ShadowDOMroot) {
                const foundElement = ShadowDOMroot.getElementById(ObjectID);
                if (foundElement) {
                    // If the element is found, we're going to return to the caller with a reference to the object
                    return [true, foundElement];
                }
            }
        }
        // If no element was found at all, we're going to return 'null'
        return [false, null];
    }

    static ChangeVisibility(DOMinstance,ObjectID,ViewMode) {
        let [DomObj, ObjRef, Instance] = this.GetHTMLelement(DOMinstance, ObjectID);
        if (Instance) {
            Instance.style.visibility = ViewMode;
        } else {
            console.warn("ShadowDOM.ChangeVisibility() failed. There was no HTML Element with the given ID '"+ObjectID+"'",
            "ShadowDOM.ChangeVisibility() was called with the following params:",
            "DOMinstance: "+DOMinstance+"","ObjectID: "+ObjectID+"","ViewMode: "+ViewMode+"");
        }
    }

    static SetInnerHTML(DOMinstance,ObjectID,HTMLcode) {
        let [DomObj, ObjRef, Instance] = this.GetHTMLelement(DOMinstance, ObjectID);
        if (Instance) {
            Instance.style.innerHTML = HTMLcode;
        } else {
            console.warn("ShadowDOM.SetInnerHTML() failed. There was no HTML Element with the given ID '"+ObjectID+"'",
            );
        }
    }

}

// Define the InfoBanner-Class.
// This extends HTMLElement, which is the base class for all HTML elements.
class CodeboxComponent extends HTMLElement {
    // This static getter returns an array of attribute names to be observed for changes
    static get observedAttributes() {
        return ['cbid','header','sizex','sizey','design','codefont','codesize'];
    }
    
    // The constructor method is creating and initializing an object created with a class.
    constructor() {
        // Call the constructor of the parent class (HTMLElement).
        super();
        // Attach a shadow root to the custom element. The 'open' mode means that the
        // shadow root can be accessed from JavaScript outside the shadow root.
        this.attachShadow({ mode: 'open' });
        /* Init the vars for our attributes */
        this.varObjectID = "";
        this.varUseHead  = "";
        this.varBoxSizeX = "";
        this.varBoxSizeY = "";
        this.varDesignID = "";
        this.varCodeFont = "";
        this.varCodeSize = "";
        this.BugSniffer  = false;

    }

    // The connectedCallback() lifecycle hook fires
    // when the element gets inserted into the DOM.
    connectedCallback() {
        this.BugSniffer = false;
        // Get the user-defined attribute values (stops on error!)
        try {
            this.CatchAttributes();
        } catch(error) {
            // INFO: error.message just includes the self-created error text. error.stack includes the self-created error message plus debugging information (filename, liennumber, etc.)
            let TempError = "Error while running this.CatchAttributes()\n\nDebugging Information (Error Stack):\n\n"+error.message+"\n";
            this.ReportError("connectedCallback()",TempError,"error");
            this.BugSniffer = true;
        }
        // Following code will only be executed, if the CatchAttributes() didn't throw any errors!
        // The Tooltip Component will only be created/rendered, if there was no issue with the given values of the attributes!
        if( this.BugSniffer === false) {
            // Call the RenderComponent method when the element is inserted into the DOM.
            this.RenderComponent();
            // RESERVED FOR LATER USE
            this.addEventListeners();
        } else {
            let BuildError = "----------------------------------\n(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧  YOU'RE SCREWED!\n----------------------------------\n";
            BuildError += "Building process of the Codebox Web Component has been cancelled!\n";
            BuildError += "A fatal error was encountered during creation process!\n";
            BuildError += "There is at least one error with the attributes!\n";
            BuildError += "They are either not declared or have wrong/invalid values!\n";
            BuildError += "Please check your HTML code of the Codebox Web Component!\n";
            this.ReportError("class CodeboxComponent extends HTMLElement",BuildError,"error");
        }

    }

    /* O N L Y   F O R   I N T E R N A L   U S A G E */
    ReportError(FunctionName,LOGmessage,ErrorMode) {
        
        switch( ErrorMode.toLowerCase() ) {
            case 'info':
                console.info("codebox.js"+"\n"+"INFO"+"\n"+"Current function: "+FunctionName+"\n"+LOGmessage);
            break;

            case 'warn':
                console.warn("codebox.js"+"\n"+"W A R N I N G"+"\n"+"Current function: "+FunctionName+"\n"+LOGmessage);
            break;

            case 'error':
                console.error("codebox.js"+"\n"+"[!!]  E R R O R  [!!]"+"\n"+"Current function: "+FunctionName+"\n"+LOGmessage);
            break;

            default:
                console.log("codebox.js"+"\n"+"Debugging Information"+"\n"+"Current function: "+FunctionName+"\n"+LOGmessage);
            break;
        }
    }

    CatchAttributes() {
        let ErrorCode = "";

        // Catch the attribute values from the component (this should only be performed once)
        this.varObjectID = this.getAttribute('cbid');
        this.varUseHead  = this.getAttribute('header');
        this.varBoxSizeX = this.getAttribute('sizex');
        this.varBoxSizeY = this.getAttribute('sizey');
        this.varDesignID = this.getAttribute('design');
        this.varCodeFont = this.getAttribute('codefont');
        this.varCodeSize = this.getAttribute('codesize');
        // Get the last 3 signs from the 'codefont'
        let varCodeFontStyle = this.getAttribute('codefont').slice(-3);

        // Check if we have an Object-ID
        if( !this.varObjectID || this.varObjectID.length <= 0) {
            ErrorCode = "Error in CodeboxComponent.CatchAttributes()\n Missing value for attribute 'cbid'!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        }
        // Check if we have a valid attribute value for the header
        if( this.varUseHead.toLowerCase() != "true" &&  this.varUseHead.toLowerCase() != "false") {
            ErrorCode = "Error in CodeboxComponent.CatchAttributes()\n Wrong/Invalid value for attribute 'header'\n 'header' must be either 'true' or 'false'!\n 'header' will be set to 'true' (as default value)";
            this.varUseHead = 'true';
            throw new Error(ErrorCode);
        }
        // Check if we have a valid width
        if( this.varBoxSizeX.indexOf("px") == -1 && this.varBoxSizeX.toLowerCase() != "auto" ) {
            ErrorCode = "Error in CodeboxComponent.CatchAttributes()\n Wrong/Invalid value for attribute 'sizex'!\n 'sizex' must be set like '100px'\n 'sizex' will be set to 'auto' (as default value)";
            this.varBoxSizeX = 'auto';
            throw new Error(ErrorCode);
        }
        // Check if we have a valid height
        if( this.varBoxSizeY.indexOf("px") == -1 && this.varBoxSizeY.toLowerCase() != "auto" ) {
            ErrorCode = "Error in CodeboxComponent.CatchAttributes()\n Wrong/Invalid value for attribute 'sizey'!\n 'sizey' must be set like '100px'\n 'sizey' will be set to 'auto' (as default value)";
            this.varBoxSizeY = 'auto';
            throw new Error(ErrorCode);    
        }
        // Check if we have a valid value for the design attribute
        if( this.varDesignID.toLowerCase() != "black" && this.varDesignID.toLowerCase() != "white" ) {
            ErrorCode = "Error in CodeboxComponent.CatchAttributes()\n Wrong/Invalid value for attribute 'design'!\n 'design' must be either 'black' or 'white'\n 'design' will be set to 'black' (as default value)";
            this.varDesignID = 'black';
            throw new Error(ErrorCode);    
        }
        // Check if we have a valid value for the codefont attribute
        if( this.varCodeFont.toLowerCase() != 'monospace' && this.varCodeFont.toLowerCase().indexOf('gfsourcecode') == -1 && this.varCodeFont.toLowerCase().indexOf('gfrobotomono') == -1 && this.varCodeFont.toLowerCase().indexOf('gfnotomono') == -1 && this.varCodeFont.toLowerCase().indexOf('gfjetbrains') == -1 ) {
            ErrorCode = "Error in CodeboxComponent.CatchAttributes()\n Wrong/Invalid value for attribute 'codefont'!\n 'codefont' will be set to 'monospace' (as default value)";
            this.varCodeFont = 'monospace';
            throw new Error(ErrorCode);    
        } else if( this.varCodeFont.toLowerCase().indexOf('gfsourcecode') == 1 || this.varCodeFont.toLowerCase().indexOf('gfrobotomono') == 1 || this.varCodeFont.toLowerCase().indexOf('gfnotomono') == 1 || this.varCodeFont.toLowerCase().indexOf('gfjetbrains') == 1 ) {
            // Seems like we should use a google font. so let's check if we have a valid 'font style'
            if( varCodeFontStyle != '300' || varCodeFontStyle !=  '400' || varCodeFontStyle != '600') {
                ErrorCode = "Error in CodeboxComponent.CatchAttributes()\n Wrong/Invalid value for attribute 'codefont'!\n 'codefont' doesn't include a font style (300/400/600)!n '300' will be used as font style (as default value) ";
                if( this.varCodeFont.toLowerCase().indexOf('gfsourcecode') == 1 ) { this.varCodeFont = 'gfSoureCode300'; }
                if( this.varCodeFont.toLowerCase().indexOf('gfrobotomono') == 1 ) { this.varCodeFont = 'gfRobotoMono300'; }
                if( this.varCodeFont.toLowerCase().indexOf('gfnotomono') == 1 ) { this.varCodeFont = 'gfNotoMono300'; }
                if( this.varCodeFont.toLowerCase().indexOf('gfjetbrains') == 1 ) { this.varCodeFont = 'gfJetBrains300'; }
                throw new Error(ErrorCode);    
            }
        }
        // Check if we have a valid value for the codesize attribute
        if( this.varCodeSize.toLowerCase().indexOf("px") == -1 ) {
            ErrorCode = "Error in CodeboxComponent.CatchAttributes()\n Wrong/Invalid value for attribute 'codesize' (unit must be 'px')!\n 'codesize' will be set to '14px' (as default value)";
            this.varCodeSize = '14px';
            throw new Error(ErrorCode);    
        } else if( this.varCodeSize.length < 3 || this.varCodeSize.length > 4 ) {
            ErrorCode = "Error in CodeboxComponent.CatchAttributes()\n Wrong/Invalid value for attribute 'codesize'!\n 'codesize' will be set to '14px' (as default value)";
            this.varCodeSize = '14px';
            throw new Error(ErrorCode);    

        }

    }


    /*
    The RenderComponent method will generate the HTML content of the custom element.
    IMPORTANT NOTE TO THE DEVELOPER:
    THIS FUNCTION IS CALL WHILE RENDERING THE OBJECT INSIDE ITS OWN SHADOW DOM.
    WE DO NOT HAVE TO "LOOK" FOR THE OBJECT IN ALL SHADOW DOMS. AT THE TIME WHEN
    UpdateComponent() IS CALLED, WE'RE ALREADY IN THE SHADOW DOM OF THE INSTANCE OF OUR COMPONENT!
    */
    RenderComponent() {
        // Create a pre-built of the HTML Code
        let ComponentHTMLcode = ``;
        // Create a pre-built of the CSS Code
        let ComponentCSScode = ``;
        // We need it 'lower case' to assign the styles
        this.varCodeFont = this.varCodeFont.toLowerCase();

        // We need to create a separate CSS Code for the scrollbars (depending on the chosen design)
        if( this.varDesignID.toLowerCase() == "black") {
            ComponentCSScode = `/* SCROLLBAR MODIFICATION FOR CHROME/EDGE/SAFARI (NOT FIREFOX) */
            /* CSS CODE (Chrome/Safari) TO MODIFY THE SCROLL BARS */
            ::-webkit-scrollbar {
                /* SET THE SCROLLBAR TO 6px WIDTH/HEIGHT */
                width: 6px;
                height: 6px;
                border-radius: 16px;
                margin: 4px;
            }
            ::-webkit-scrollbar-track {
                /* SET THE BACKGROUND OF THE SCROLLBAR-TRACK (MUST BE THE SAME COLOR AS THE BACKGROUND OF THE TABLE) */
                background: #333333;
                border-radius: 16px;
            }
            ::-webkit-scrollbar-thumb {
                /* SET THE COLOR OF THE SCROLLBAR-HANDLE (MUST BE THE SAME COLOR AS THE TEXT COLOR) */
                background: #DFDFDF;
                border-radius: 16px;
            }
            ::-webkit-scrollbar-corner {
                /* THAT LITTLE CORNER-BOX THAT APPEARS IF WE HAVE BOTH SCROLLBARS */
                background: #333333;
            }
            ::-webkit-resizer {
                /* TRY TO HIDE THE RESIZE-OPTION */
                display: none;
            }
            `;
        } else {
            ComponentCSScode = `/* SCROLLBAR MODIFICATION FOR CHROME/EDGE/SAFARI (NOT FIREFOX) */
            /* CSS CODE (Chrome/Safari) TO MODIFY THE SCROLL BARS */
            ::-webkit-scrollbar {
                /* SET THE SCROLLBAR TO 6px WIDTH/HEIGHT */
                width: 6px;
                height: 6px;
                border-radius: 16px;
                margin: 4px;
            }
            ::-webkit-scrollbar-track {
                /* SET THE BACKGROUND OF THE SCROLLBAR-TRACK (MUST BE THE SAME COLOR AS THE BACKGROUND OF THE TABLE) */
                background: #DFDFDF;
                border-radius: 16px;
            }
            ::-webkit-scrollbar-thumb {
                /* SET THE COLOR OF THE SCROLLBAR-HANDLE (MUST BE THE SAME COLOR AS THE TEXT COLOR) */
                background: #111111;
                border-radius: 16px;
            }
            ::-webkit-scrollbar-corner {
                /* THAT LITTLE CORNER-BOX THAT APPEARS IF WE HAVE BOTH SCROLLBARS */
                background: #DFDFDF;
            }
            ::-webkit-resizer {
                /* TRY TO HIDE THE RESIZE-OPTION */
                display: none;
            }
            `;
        }
        
        // Use requested the header. So we need to create the component with the header-area
        if( this.varUseHead.toLowerCase() == "true") {
            ComponentHTMLcode = `
            <!-- CODEBOX WEB COMPONENT -->
            <table id="${this.varObjectID}" class="CodeboxPreviewTable CodeboxPreviewSize" cellspacing="0" cellpadding="0">
                <tr>
                    <td class="CodeboxPreviewFilename">
                        <slot name="codeboxhead"></slot>
                    </td>
                    <td rowspan="2" class="CodeboxPreviewSVG">
                        <svg class="CodeboxClipboardSVG" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0a3 3 0 0 0-3 3H5.4A2.4 2.4 0 0 0 3 5.4v15.2A2.4 2.4 0 0 0 5.4 23h13.2a2.4 2.4 0 0 0 2.4-2.4V5.4A2.4 2.4 0 0 0 18.6 3H15a3 3 0 0 0-3-3Zm-1 3a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm-5 7a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Z">
                        </svg>
                        <br>
                        <div id="${this.varObjectID}-okay" class="CodeboxCopyOkay">
                            <svg class="CodeboxCopyOkaySVG" viewBox="0 0 2134 2134" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/">
                                <circle class="CopyOkaySVGbgcol" cx="1066.67" cy="1066.67" r="1041.67"/>
                                <path class="CopyOkaySVGstroke" d="M1640.34,508.471c-23.935,-20.084 -59.673,-16.958 -79.757,6.978l-800.573,954.086c-20.084,23.935 -16.958,59.673 6.977,79.757l86.736,72.779c23.935,20.084 59.673,16.958 79.757,-6.977l800.573,-954.087c20.084,-23.935 16.957,-59.673 -6.978,-79.757l-86.735,-72.779Z"/>
                                <path class="CopyOkaySVGstroke" d="M551.818,1087.5c-23.935,-20.084 -59.673,-16.957 -79.757,6.978l-72.78,86.735c-20.084,23.936 -16.957,59.674 6.978,79.758l433.676,363.897c23.935,20.084 59.673,16.957 79.757,-6.978l72.779,-86.735c20.084,-23.936 16.958,-59.674 -6.978,-79.758l-433.675,-363.897Z"/>
                            </svg>
                        </div>
                   </td>
                </tr>
                <tr>
                    <td class="CodeboxPreviewSourceCode">
                        <div id="${this.varObjectID}-flexbox" class="CodeboxPreviewFlexBox">
                            <code id="${this.varObjectID}-code" class="${this.varCodeFont}">
                                <slot id="${this.varObjectID}-codeslot" name="codeboxbody"></slot>
                            </code>
                        </div>
                    </td>
                </tr>
            </table>
            `;
        } else {
        // User doesn't want to use the header. So we have to create the component without the header-area
            ComponentHTMLcode = `
            <!-- CODEBOX WEB COMPONENT -->
            <table id="${this.varObjectID}" class="CodeboxPreviewTable CodeboxPreviewSize" cellspacing="0" cellpadding="0">
                <tr>
                    <td class="CodeboxPreviewSourceCode">
                        <div id="${this.varObjectID}-flexbox" class="CodeboxPreviewFlexBox">
                            <code id="${this.varObjectID}-code" class="${this.varCodeFont}">
                                <slot id="${this.varObjectID}-codeslot" name="codeboxbody"></slot>
                            </code>
                        </div>
                    </td>
                    <td class="CodeboxPreviewSVG">
                        <svg class="CodeboxClipboardSVG" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0a3 3 0 0 0-3 3H5.4A2.4 2.4 0 0 0 3 5.4v15.2A2.4 2.4 0 0 0 5.4 23h13.2a2.4 2.4 0 0 0 2.4-2.4V5.4A2.4 2.4 0 0 0 18.6 3H15a3 3 0 0 0-3-3Zm-1 3a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm-5 7a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Z">
                        </svg>
                        <br>
                        <div id="${this.varObjectID}-okay" class="CodeboxCopyOkay">
                            <svg class="CodeboxCopyOkaySVG" viewBox="0 0 2134 2134" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/">
                                <circle class="CopyOkaySVGbgcol" cx="1066.67" cy="1066.67" r="1041.67"/>
                                <path class="CopyOkaySVGstroke" d="M1640.34,508.471c-23.935,-20.084 -59.673,-16.958 -79.757,6.978l-800.573,954.086c-20.084,23.935 -16.958,59.673 6.977,79.757l86.736,72.779c23.935,20.084 59.673,16.958 79.757,-6.977l800.573,-954.087c20.084,-23.935 16.957,-59.673 -6.978,-79.757l-86.735,-72.779Z"/>
                                <path class="CopyOkaySVGstroke" d="M551.818,1087.5c-23.935,-20.084 -59.673,-16.957 -79.757,6.978l-72.78,86.735c-20.084,23.936 -16.957,59.674 6.978,79.758l433.676,363.897c23.935,20.084 59.673,16.957 79.757,-6.978l72.779,-86.735c20.084,-23.936 16.958,-59.674 -6.978,-79.758l-433.675,-363.897Z"/>
                            </svg>
                        </div>
                    </td>
                </tr>
            </table>
            `;
        }

        // Set the inner HTML of the shadow root and attach the pre-built html code
        this.shadowRoot.innerHTML = `
            <style>
                @import '${PrivateCodeBoxComponent.cssfilesrc}';

                /* Import Google Font: Roboto Mono (300/400/600) */
                @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');
                /* Import Google Font: Source Code Pro (300/400/600) */
                @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');
                /* Import Google Font: Noto Sans Mono (300/400/600) */
                @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@300;400;600&display=swap');
                /* Import Google Font: JetBrains Mono */
                @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');

                .gfrobotomono300 {
                    font-family: 'Roboto Mono', monospace;
                    font-weight: 300;
                    font-style: normal;
                    font-size: ${this.varCodeSize};
                }
                .gfrobotomono400 {
                    font-family: 'Roboto Mono', monospace;
                    font-weight: 400;
                    font-style: normal;
                    font-size: ${this.varCodeSize};
                }
                .gfrobotomono600 {
                    font-family: 'Roboto Mono', monospace;
                    font-weight: 600;
                    font-style: normal;
                    font-size: ${this.varCodeSize};
                }
                .gfsourcecode300 {
                    font-family: 'Source Code Pro', monospace;
                    font-weight: 300;
                    font-style: normal;
                    font-size: ${this.varCodeSize};
                }
                .gfsourcecode400 {
                    font-family: 'Source Code Pro', monospace;
                    font-weight: 400;
                    font-style: normal;
                    font-size: ${this.varCodeSize};
                }
                .gfsourcecode600 {
                    font-family: 'Source Code Pro', monospace;
                    font-weight: 600;
                    font-style: normal;
                    font-size: ${this.varCodeSize};
                }
                .gfnotomono300 {
                    font-family: 'Noto Sans Mono', monospace;
                    font-weight: 300;
                    font-style: normal;
                    font-size: ${this.varCodeSize};
                }
                .gfnotomono400 {
                    font-family: 'Noto Sans Mono', monospace;
                    font-weight: 400;
                    font-style: normal;
                    font-size: ${this.varCodeSize};
                }
                .gfnotomono600 {
                    font-family: 'Noto Sans Mono', monospace;
                    font-weight: 600;
                    font-style: normal;
                    font-size: ${this.varCodeSize};
                }
                .gfjetbrains300 {
                    font-family: 'JetBrains Mono', monospace;
                    font-weight: 300;
                    font-style: normal;
                    font-size: ${this.varCodeSize};
                }
                .gfjetbrains400 {
                    font-family: 'JetBrains Mono', monospace;
                    font-weight: 400;
                    font-style: normal;
                    font-size: ${this.varCodeSize};
                }
                .gfjetbrains600 {
                    font-family: 'JetBrains Mono', monospace;
                    font-weight: 600;
                    font-style: normal;
                    font-size: ${this.varCodeSize};
                }

                /* SLOTTED CSS PATTERNS -> THESE PROPERTIES CAN BE CHANGED BY THE USER */
                ::slotted([slot="codeboxhead"]) {
                    font-family: inherit;
                    font-weight: inherit;
                    font-style: inherit;
                    font-size: inherit;
                    color: inherit;
                    text-align: inherit;
                    vertical-align: inherit;
                }
                ::slotted([slot="codeboxbody"]) {
                    font-family: inherit;
                    font-weight: inherit;
                    font-style: inherit;
                    font-size: inherit;
                    color: inherit;
                    text-align: inherit;
                    vertical-align: inherit;
                }
                /* CREADE A DEMON-CLASS FOR THE BOX-SIZE (ALREADY ASSIGNED IN THE SOURCECODE) */
                .CodeboxPreviewSize {
                    width: ${this.varBoxSizeX}px;
                    heigt: ${this.varBoxSizeY}px;
                }
                /* PASTE THE PRE-CONFIGURED CSS-CODE FOR THE SCROLLBARS */
                ${ComponentCSScode}
            </style>
        <!-- PASTE THE PRE-CONFIGURED HTML-CODE OF OUR COMPONENT -->
        ${ComponentHTMLcode}`;

        // Call the update method to update other details
        // MUST BE AT THE END OF RenderComponent()! OTHERWISE WE'RE HAVING ISSUES WITH THE SHADOW DOM!!
        this.UpdateComponent();
    }

    /*
    This function will update some stuff in our shaddow DOM.
    Due to we have to work with the DOM, we have to do this,
    after the component was 'rendered' inside the shaddow DOM.
    Otherwise our HTML-Elements are not available
    IMPORTANT NOTE TO THE DEVELOPER:
    THIS FUNCTION IS CALL WHILE RENDERING THE OBJECT INSIDE ITS OWN SHADOW DOM.
    WE DO NOT HAVE TO "LOOK" FOR THE OBJECT IN ALL SHADOW DOMS. AT THE TIME WHEN
    UpdateComponent() IS CALLED, WE'RE ALREADY IN THE SHADOW DOM OF THE INSTANCE OF OUR COMPONENT!
    */
    UpdateComponent() {
        // Access the DOM Elements
        let MainCodeBox = this.shadowRoot.getElementById(this.varObjectID);
        let FlexCodeBox = this.shadowRoot.getElementById(this.varObjectID+"-flexbox");
        // Resize the main table plus the code area (depending if we have a header or not)
        if( this.varUseHead.toLowerCase() == "true") {
            MainCodeBox.style.width  = this.varBoxSizeX;
            MainCodeBox.style.height = this.varBoxSizeY;
            FlexCodeBox.style.width  = "calc("+this.varBoxSizeX+" - 46px)";
            FlexCodeBox.style.height = "calc("+this.varBoxSizeY+" - 46px)";
        } else {
            MainCodeBox.style.width  = this.varBoxSizeX;
            MainCodeBox.style.height = this.varBoxSizeY;
            FlexCodeBox.style.width  = "calc("+this.varBoxSizeX+" - 46px)";
            FlexCodeBox.style.height = "calc("+this.varBoxSizeY+" - 18px)";
        }
        // Apply the "black" design to the codebox
        if( this.varDesignID.toLowerCase() == "black") {
            this.shadowRoot.getElementById(this.varObjectID).style.border = "1px solid #000000";
            this.shadowRoot.getElementById(this.varObjectID).style.backgroundColor = "#333333";
            this.shadowRoot.getElementById(this.varObjectID).style.color = "#DFDFDF";
            this.shadowRoot.querySelector(".CodeboxClipboardSVG").style.fill = "#DFDFDF";
        }

        // Apply the "white" design to the codebox
        if( this.varDesignID.toLowerCase() == "white") {
            this.shadowRoot.getElementById(this.varObjectID).style.border = "1px solid #000000";
            this.shadowRoot.getElementById(this.varObjectID).style.backgroundColor = "#DFDFDF";
            this.shadowRoot.getElementById(this.varObjectID).style.color = "#111111";
            this.shadowRoot.querySelector(".CodeboxClipboardSVG").style.fill = "#303030";
        }
    }

    /*
    THIS FUNCTION MUST BE USED TO WRITE THE CODE INTO THE CODEBOX!!!
    The plain code has to be passed as a param to the CreateCodeSnippet() function.
    It will then re-format the given code to text and trows it to the codebox
    */
    CreateCodeSnippet(CodeboxID,PureCode) {
        /*
        VERY IMPORTANT NOTE TO THE DEVELOPER!!
        EVERY TIME A COMPONENT IS CREATED WITH THIS CLASS, IT WILL CREATE AN INSTANCE OF THIS WEB COMPONENT AND RENDERS IT IN A SEPARATE SHADOW DOM!!
        THIS MEANS, THAT IF WE HAVE TWO (OR MORE) INSTANCES OF TIS WEB COMPONENT, WE HAVE ALSO TWO (OR MORE) SHADOW DOMS!! AND THIS FINALLY MEANS:
        IN ORDER TO AVOID ERRORS WHILE SEARCHING FOR THE HTML OBJECT, WE HAVE TO SEARCH IN ALL POSSIBLE SHADOW DOMS FOR THIS OBJECT. SO WE
        A L W A Y S (!!!)   NEED TO GET THE NUMBER OF SHADOW DOMS FIRST, AND THEN "WALK" THROUGH EACH SHADOW DOM, SEARCHING FOR THE DESIRED HTML OBJECT
        */

        // Get the given code and re-format it
        PureCode = PureCode.replace(/</g, '&lt;');
        PureCode = PureCode.replace(/>/g, '&gt;');
        PureCode = PureCode.replace(/\n/g, '<br>');
        PureCode = PureCode.replace(/ /g, '&nbsp;');
        PureCode = PureCode.replaceAll('[B+]', '<strong>');
        PureCode = PureCode.replaceAll('[B-]', '</strong>');
        PureCode = PureCode.replaceAll('[U+]', '<u>');
        PureCode = PureCode.replaceAll('[U-]', '</u>');
        PureCode = PureCode.replaceAll('[I+]', '<i>');
        PureCode = PureCode.replaceAll('[I-]', '</i>');
        PureCode = PureCode.replaceAll('[BLI]', '&#8226;&nbsp;');

        // Select all code-box elements as they could contain a Shadow DOM
        const CodeboxShadowDOM = document.querySelectorAll('code-box');
        var LookupSuccess = false;
        // let's "walk" through all possible shadow DOMs
        for (const CurrentShadowDOM of CodeboxShadowDOM) {
            // Try to get the Shadow DOM of the current code-box element
            const CurrentRoot = CurrentShadowDOM.shadowRoot;
            // If a Shadow DOM exists, search within it for the element with the given ID
            if (CurrentRoot) {
                const ObjectLookup = CurrentRoot.getElementById(CodeboxID+"-code");
                // If the element is found, we can print a message, write the code into the box and set the LookupSuccess to true
                if(ObjectLookup) {
                    this.ReportError("CreateCodeSnippet(CodeboxID,PureCode)",`Element with given ID '${CodeboxID}-code' successfully found in shadow DOM.`,"info")
                    CurrentRoot.getElementById(CodeboxID+"-code").innerHTML = PureCode;
                    LookupSuccess = true;
                    //return;
                }
            }
        }
        // Make sure that we only throw an error if the element wasn't found at all
        if( LookupSuccess == false ) {
            // If the element was not found in any of the Shadow DOMs, output an error message
            console.error(`Element with given ID '${CodeboxID}-code' doesn't exists in all shadow DOMs.`);
        }
    }

    /*#####################################################################*/
    /* [!!!]   O N L Y   F O R   D E B U G G I N G   P U R P O S E   [!!!] */
    /*#####################################################################*/
    GetShadowDOMobject(ObjectID) {
        // Select all code-box elements as they could contain a Shadow DOM
        const codeBoxes = document.querySelectorAll('code-box');
        // Iterate over all found code-box elements
        for (const codeBox of codeBoxes) {
            // Try to get the Shadow DOM of the current code-box element
            const shadowRoot = codeBox.shadowRoot;
            // If a Shadow DOM exists, search within it for the element with the given ID
            if (shadowRoot) {
                const element = shadowRoot.getElementById(ObjectID);
                // If the element is found, print a success message and exit the loop
                if (element) {
                    console.log(`Element with given ID ${ObjectID} successfully found in shadow DOM.`);
                    return; // Exit the function because the element was found
                }
            }
        }
        // If the element was not found in any of the Shadow DOMs, output an error message
        console.error(`Element with given ID ${ObjectID} doesn't exists in all shadow DOMs.`);
    }


    /*
    This function will handle the click-event (if the user clicks the clipboard svg).
    CodeboxCopyEvent() gets access to the 'codeboxbody' slot and re-formats the code/text in real code.
    After re-formatting the text to code it tries to copy the content to the clipboard.
    IMPORTANT NOTE FOR THE DECELOPER !
    THIS FUNCTION IS ONLY FOR INTERNAL USAGE FOR THE INSTANCE OF THE COMPONENTS. THIS MEANS:
    AS LONG AS THIS FUNCTION IS NOT CALLED FROM OUTSIDE, WE DO NOT NEED TO HANDLE MULTIPLE SHADOW DOMs!
    AT THAT TIME WHEN THE FUNCTION IS FIRED, WE'RE ALREADY IN THE RIGHT SHADOW DOM. WHY? WELL, THINK
    OF THE TRIGGER! WHERE IS THE FUNCION CALLED FROM? CORRECT! FROM INSIDE THE SHADOW DOM!
    */
    CodeboxCopyEvent() {
        // Try to get access to the <code></code> block
        try {
            let CodeboxObject = this.shadowRoot.getElementById(this.varObjectID+"-code");
            let CopyOKsvgicon = this.shadowRoot.getElementById(this.varObjectID+"-okay");
            if( !CodeboxObject ) {
                throw new Error("codebox.js"+"\n"+"Error in function: CodeboxCopyEvent(): ");
            } else {
                // We have access to the <code></code> block :)
                // Let's get the content, re-format it and copy it to the clipboard!
                let ModifiedSourceCode = CodeboxObject.innerHTML;
                ModifiedSourceCode = ModifiedSourceCode.replaceAll('&#8226;', '-')
                .replaceAll('&bull;', '-')
                .replaceAll('<strong>', '')
                .replaceAll('</strong>', '')
                .replaceAll('<u>', '')
                .replaceAll('</u>', '')
                .replaceAll('<i>', '')
                .replaceAll('</i>', '')
                .replaceAll('&nbsp;', ' ')
                .replaceAll('&lt;', '<')
                .replaceAll('&gt;', '>')
                .replaceAll('<br>', '\n');
                //ModifiedSourceCode = ModifiedSourceCode.replace(/^\s*[\r\n]/gm, '');

                // Try to copy the re-formatted text into the clipboard
                if (navigator.clipboard && window.isSecureContext) {
                    // Use the Navigator-Clipboard-API (if available)
                    navigator.clipboard.writeText(ModifiedSourceCode).then(function() {
                        //console.log('Code successfully copied to clipboard');
                        CopyOKsvgicon.style.visibility = 'visible';
                        setTimeout(function() {
                            CopyOKsvgicon.style.visibility = 'hidden';
                        }, 1500);
                    }, function(error) {
                        console.error("codebox.js"+"\n"+"Error in function: CodeboxCopyEvent(): ", error);
                    });
                } else {
                    // Fallback for older browsers
                    /*
                    const textarea = document.createElement('textarea');
                    textarea.value = ModifiedCode;
                    document.body.appendChild(textarea);
                    textarea.select();
                    try {
                        const successful = document.execCommand('copy');
                        if (!successful) {
                            console.error('Fehler beim Kopieren in die Zwischenablage.');
                        }
                    } catch (err) {
                        console.error('Fehler beim Kopieren in die Zwischenablage: ', err);
                    }
                    document.body.removeChild(textarea);
                    */
                    console.error("codebox.js"+"\n"+"Error in function: CodeboxCopyEvent(): ", 'Cannot access the clipboard!');
                }
            }
        } catch (errormsg) {
            console.error(errormsg.stack,"Element '"+this.varObjectID+"-code' doesn't exist in the shadow DOM!");
        }
    }

    addEventListeners() {
        // Add an event listener to the clipboard icon
        this.shadowRoot.querySelector('.CodeboxClipboardSVG').addEventListener('click', () => this.CodeboxCopyEvent());
    }

}
// Define the new custom element. This line will trigger the constructor
// The first argument is the tag name of the new element.
// The second argument is the class that controls its behavior.
window.customElements.define(PrivateCodeBoxComponent.construcor, CodeboxComponent);