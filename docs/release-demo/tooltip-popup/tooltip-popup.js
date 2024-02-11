/*
Written by praetoriani
https://github.com/praetoriani/Web-Components

TOOLTIP POPUP WEB COMPONENT
Version:        v1.00.22
Last Update:  10.02.2024

*/

/*
The PrivateTooltipComponent Object stores important informations about the web component!
[!!]   D O   N O T   C H A N G E   T H E S E   L I N E S   [!!]
*/
const PrivateTooltipComponent = {};

Object.defineProperty( PrivateTooltipComponent,'classidref',{
	value: 'tooltip-popup',
	writable: false
});

Object.defineProperty( PrivateTooltipComponent,'cssfilesrc',{
	value: 'tooltip-popup.css',
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

    static ChangeVisibility(DOMinstance,ObjectID,ViewMode) {
        let [DomObj, ObjRef, Instance] = this.GetHTMLelement(DOMinstance, ObjectID);
        if (Instance) {
            Instance.style.visibility = ViewMode;
        } else {
            console.warn("ShadowDOM.ChangeVisibility() succeeded, but there was no HTML Element with the given ID '"+ObjectID+"'",
            "ShadowDOM.ChangeVisibility() was called with the following params:",
            "DOMinstance: "+DOMinstance+"","ObjectID: "+ObjectID+"","ViewMode: "+ViewMode+"");
        }
    }

}

// Define the InfoBanner-Class.
// This extends HTMLElement, which is the base class for all HTML elements.
class TooltipPopupComponent extends HTMLElement {

    // This static getter returns an array of attribute names to be observed for changes
    static get observedAttributes() {
        return ['tpid','dimw','dimh','xaxis','yaxis','stacklvl','caption','pointer','poffset','viewmode'];
    }
    
    // The constructor method is creating and initializing an object created with a class.
    constructor() {
        // Call the constructor of the parent class (HTMLElement).
        super();
        // Attach a shadow root to the custom element. The 'open' mode means that the
        // shadow root can be accessed from JavaScript outside the shadow root.
        this.attachShadow({ mode: 'open' });
        /* Init the vars for our attributes */
        this.attrTPobjid = "";
        this.attrTPsizeW = "";
        this.attrTPsizeH = "";
        this.attrTPxaxis = "";
        this.attrTPyaxis = "";
        this.attrTPzaxis = "";
        this.attrCaption = "";
        this.attrPointer = "";
        this.attrPoffset = "";
        this.attrTPvmode = "";
        this.BugSniffer  = false;
    }

    /* O N L Y   F O R   I N T E R N A L   U S A G E */
    ConsoleOutput(FunctionName,LOGmessage,ErrorMode) {
        
        switch( ErrorMode.toLowerCase() ) {
            case 'info':
                console.info("tooltip-popup.js"+"\n"+"INFO"+"\n"+"Current function: "+FunctionName+"\n"+LOGmessage);
            break;

            case 'warn':
                console.warn("tooltip-popup.js"+"\n"+"W A R N I N G"+"\n"+"Current function: "+FunctionName+"\n"+LOGmessage);
            break;

            case 'error':
                console.error("tooltip-popup.js"+"\n"+"[!!]  E R R O R  [!!]"+"\n"+"Current function: "+FunctionName+"\n"+LOGmessage);
            break;

            default:
                console.log("tooltip-popup.js"+"\n"+"Debugging Information"+"\n"+"Current function: "+FunctionName+"\n"+LOGmessage);
            break;
        }
    }

    // The connectedCallback() lifecycle hook fires
    // when the element gets inserted into the DOM.
    connectedCallback() {
        this.BugSniffer = false;
        // Get the attribute values and check/verify them
        try {
            this.CatchAttributes();
        } catch(error) {
            // INFO: error.message just includes the self-created error text. error.stack includes the self-created error message plus debugging information (filename, liennumber, etc.)
            let TempError = "Error while running this.CatchAttributes()\n\nDebugging Information (Error Stack):\n\n"+error.message+"\n";
            this.ConsoleOutput("connectedCallback()",TempError,"error");
            this.BugSniffer = true;
        }
        // The Tooltip Component will only be created/rendered, if there was no issue with the given values of the attributes!
        if( this.BugSniffer == false) {
            // Call the RenderComponent method when the element is inserted into the DOM.
            this.RenderComponent();
            // RESERVED FOR LATER USE
            //this.addEventListeners();
        } else {
            let BuildError = "----------------------------------\n(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧  YOU'RE SCREWED!\n----------------------------------\n";
            BuildError += "Building process of the Tooltip Popup Web Component has been cancelled!\n";
            BuildError += "A fatal error was encountered during creation process!\n";
            BuildError += "There is at least one error with the attributes!\n";
            BuildError += "They are either not declared or have wrong/invalid values!\n";
            BuildError += "Please check your HTML code of the Tooltip Popup Web Component!\n";
            this.ConsoleOutput("class TooltipPopupComponent extends HTMLElement",BuildError,"error");
        }
    }

    /* This function catches the attribute values from the component and checks if they are declared and have correct/valid values */
    CatchAttributes() {
        let ErrorCode = "";

        // Catch the attribute values from the component
        this.attrTPobjid = this.getAttribute('tpid');
        this.attrTPsizeW = this.getAttribute('dimw');
        this.attrTPsizeH = this.getAttribute('dimh');
        this.attrTPxaxis = this.getAttribute('xaxis');
        this.attrTPyaxis = this.getAttribute('yaxis');
        this.attrTPzaxis = this.getAttribute('stacklvl');
        this.attrCaption = this.getAttribute('caption');
        this.attrPointer = this.getAttribute('pointer');
        this.attrPoffset = this.getAttribute('poffset');
        this.attrTPvmode = this.getAttribute('viewmode');

        // Check if we have an Object-ID
        if( !this.attrTPobjid || this.attrTPobjid.length <= 0) {
            ErrorCode = "Error in CatchAttributes()\n Missing value for attribute 'tpid'!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        }
        // Check if we have a valid value for the width
        if( this.attrTPsizeW.slice(-2).toLowerCase() == "px") {
            ErrorCode = "Wrong/Invalid value for attribute 'dimw'!\n Do not use 'px' as unit (will be removed now)";
            this.ConsoleOutput("CatchAttributes()",ErrorCode,"warn");
            this.attrTPsizeW = this.attrTPsizeW.substring(0,(this.attrTPsizeW.length - 2));
        } else if(this.attrTPsizeW.length < 2) {
            ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'dimw'!\n The given value for 'dimw' is too short!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        } else if( isNaN(Number(this.attrTPsizeW)) ) {
            ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'dimw'!\n The given value seems to be in the wrong format. Please check!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        } else if( Number(this.attrTPsizeW) < 100 ) {
            ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'dimw'!\n The minimum width ot the Tooltip-Popup is '100'!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        }
        // Check if we have a valid value for the height
        if( this.attrTPsizeH.slice(-2).toLowerCase() == "px") {
            ErrorCode = "Wrong/Invalid value for attribute 'dimh'!\n Do not use 'px' as unit (will be removed now)";
            this.ConsoleOutput("CatchAttributes()",ErrorCode,"warn");
            this.attrTPsizeH = this.attrTPsizeH.substring(0,(this.attrTPsizeH.length - 2));
        } else if(this.attrTPsizeH.length < 2) {
            ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'dimh'!\n The given value for 'dimh' is too short!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        } else if( isNaN(Number(this.attrTPsizeH)) ) {
            ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'dimh'!\n The given value seems to be in the wrong format. Please check!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        } else if( Number(this.attrTPsizeH) < 70 ) {
            ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'dimh'!\n The minimum height ot the Tooltip-Popup is '70'!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        }
        // Check if we have a valid value for the x-axis
        if( isNaN(Number(this.attrTPxaxis)) ) {
            ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'xaxis'!\n The given value seems to be in the wrong format. Please check!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        }
        // Check if we have a valid value for the y-axis
        if( isNaN(Number(this.attrTPyaxis)) ) {
            ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'yaxis'!\n The given value seems to be in the wrong format. Please check!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        }
        // Check if we have a valid value for the z-axis
        if( isNaN(Number(this.attrTPzaxis)) ) {
            ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'stacklvl'!\n Only numbers like '5000' are allowed!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        } else if( Number(this.attrTPzaxis) < 1 || Number(this.attrTPzaxis) > 9999 ) {
            ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'stacklvl'!\n 'stacklvl' only accepts values between '1' and '9999'!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        }
        // Check if we have a valid value for the caption
        if( String(this.attrCaption.toLowerCase()) != "true" && String(this.attrCaption.toLowerCase()) != "false" ) {
            ErrorCode = "Wrong/Invalid value for attribute 'caption'!\n This attribute knows only 'true' or 'false'!\n Going to use 'false' as default value!";
            this.ConsoleOutput("CatchAttributes()",ErrorCode,"warn");
            this.attrCaption = "false";
        }
        // Check if we have a valid value for the pointer
        if( String(this.attrPointer.toLowerCase()) != "top" && String(this.attrPointer.toLowerCase()) != "bottom" && String(this.attrPointer.toLowerCase()) != "left" && String(this.attrPointer.toLowerCase()) != "right" ) {
            ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'pointer'!\n Only 'left' , 'right' , 'top' or 'bottom' allowed!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        }
        // Check if we have a valid value for the poffset
        if( String(this.attrPoffset.toLowerCase()) != "default" && String(this.attrPoffset.toLowerCase()) != "offsetl" && String(this.attrPoffset.toLowerCase()) != "offsetr" && String(this.attrPoffset.toLowerCase()) != "offsett" && String(this.attrPoffset.toLowerCase()) != "offsetb" ) {
            ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'poffset'!\n Only 'default' , 'offsetr' , 'offsetl' , 'offsett' or 'offsetb' allowed!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        }
        // Check if we have a valid value for the viewmode
        if( String(this.attrTPvmode.toLowerCase()) != "visible" && String(this.attrTPvmode.toLowerCase()) != "hidden" ) {
            ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'viewmode'!\n Only 'visible' or 'hidden' allowed!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        }
        /* TIME FOR SOME SPECIAL CHECKS */

        if( String(this.attrPointer.toLowerCase()) == "top" && String(this.attrPointer.toLowerCase()) == "bottom" ) {
            if( String(this.attrPoffset.toLowerCase()) == "offsett" && String(this.attrPoffset.toLowerCase()) == "offsetb" ) {
                ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid combination of attribute values found!!\n If the pointer is placed at 'top' or 'bottom' you have to use 'offsetl' or 'offsetr'!\n Component cannot be built properly!";
                throw new Error(ErrorCode);    
            }
        } else if( String(this.attrPointer.toLowerCase()) == "left" && String(this.attrPointer.toLowerCase()) == "right" ) {
            if( this.attrPoffset.toLowerCase() == "offsetl" || this.attrPoffset.toLowerCase() == "offsetr" ) {
                ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid combination of attribute values found!!\n If the pointer is placed 'left' or 'right' you have to use 'offsett' or 'offsetb'!\n Component cannot be built properly!";
                throw new Error(ErrorCode);    
            }
        }

        if( Number(this.attrTPsizeW) < Number(this.attrTPsizeH)) {
            ErrorCode = "☉ ‿ ⚆\nThe width ("+this.attrTPsizeW+") is smaller than the height ("+this.attrTPsizeH+")\n Tooltip Popup might looks a bit weird!";
            this.ConsoleOutput("CatchAttributes()",ErrorCode,"info");
        }

    }

    // The RenderComponent method will generate the HTML content of the custom element.
    // This creates an instance of the component in an isolated and separated shadow DOM!
    // IMPORTANT: Every time an instance is created, it will always have its own shadow DOM!
    RenderComponent() {
        // Needed to pre-build the code before rendering it inside the Shadow DOM
        let ComponentHTMLcode = ``;
        let ComponentCSScode  = ``;
        
        // component will be created with a header
        if( this.attrCaption.toLowerCase() == "true") {
            ComponentHTMLcode += `
            <div id="${this.attrTPobjid}" class="tooltip-mainframe">
                <div id="tooltip-border-bugfix" class="tooltip-border-bugfix"></div>
                <div id="tooltip-bodyframe" class="tooltip-bodyframe">
                    <table id="tooltip-bodyframe-table" class="tooltip-bodyframe-table" cellspacing="0" cellpadding="0">
                        <tr>
                            <td class="tooltip-body-table-caption">
                                <slot name="tooltip-caption-slot"></slot>
                            </td>
                        </tr>
                        <tr>
                            <td class="tooltip-body-table-message">
                                <slot name="tooltip-message-slot"></slot>
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="tooltip-pointerbox" class="tooltip-pointerbox"></div>
            </div>
            `;
        }
        // component will be created without header
        else {
            ComponentHTMLcode += `
            <div id="${this.attrTPobjid}" class="tooltip-mainframe">
                <div id="tooltip-border-bugfix" class="tooltip-border-bugfix"></div>
                <div id="tooltip-bodyframe" class="tooltip-bodyframe">
                    <table id="tooltip-bodyframe-table" class="tooltip-bodyframe-table" cellspacing="0" cellpadding="0">
                        <tr>
                            <td class="tooltip-body-message-only">
                                <slot name="tooltip-message-slot"></slot>
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="tooltip-pointerbox" class="tooltip-pointerbox"></div>
            </div>
            `;
        }
        ComponentCSScode += `
        <style>
            @import '${PrivateTooltipComponent.cssfilesrc}';

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
        </style>
        `;
        // Render the component inside its Shadow DOM
        this.shadowRoot.innerHTML = `
            ${ComponentCSScode}
            ${ComponentHTMLcode}
        `;
        // Call the update method to update other details
        this.UpdateComponent();
    }

    /*
    This function will update some stuff in our Shadow DOM.
    Due to we have to work with the DOM, we have to do this,
    after the component was 'rendered' inside the Shadow DOM.
    Otherwise our HTML-Elements are not available for manipulation
    */
    UpdateComponent() {
        /* 1st Step: We're applying the dimensions/position to the tooltip */
        this.shadowRoot.getElementById(this.attrTPobjid).style.width  = this.attrTPsizeW+"px";
        this.shadowRoot.getElementById(this.attrTPobjid).style.height = this.attrTPsizeH+"px";
        this.shadowRoot.getElementById(this.attrTPobjid).style.top    = this.attrTPyaxis+"px";
        this.shadowRoot.getElementById(this.attrTPobjid).style.left   = this.attrTPxaxis+"px";
        this.shadowRoot.getElementById(this.attrTPobjid).style.zIndex = this.attrTPzaxis;
        /* 2nd Step: we need to apply new z-indexes to some other elements as well */
        this.shadowRoot.getElementById("tooltip-bodyframe").style.zIndex = (Number(this.attrTPzaxis) + 10);
        this.shadowRoot.getElementById("tooltip-border-bugfix").style.zIndex = (Number(this.attrTPzaxis) + 20);
        this.shadowRoot.getElementById("tooltip-pointerbox").style.zIndex = (Number(this.attrTPzaxis) + 30);

        /* The Tooltip Popup has to be build differently, depending on the position of the pointer */
        switch( this.attrPointer.toLowerCase() ) {
            /* 3rd Step: Adjusting the Dimensions/Positions of the Tooltip and the Pointer */
            case 'top':
                this.shadowRoot.getElementById("tooltip-bodyframe").style.width = "100%";
                this.shadowRoot.getElementById("tooltip-bodyframe").style.height = ""+(Number(this.attrTPsizeH) - 24)+"px";
                this.shadowRoot.getElementById("tooltip-bodyframe").style.top = "24px";
                this.shadowRoot.getElementById("tooltip-bodyframe").style.left = "0px";
                if(this.attrPoffset.toLowerCase() == "offsetl") {
                    /* Pointer: Top | Offset: Left */
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.transform = "rotate(-135deg)";
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.top = "6px";
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.left = "36px";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.top = "24px";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.left = "30px";
                } else if(this.attrPoffset.toLowerCase() == "offsetr") {
                    /* Pointer: Top | Offset: right */
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.transform = "rotate(-135deg)";
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.top = "6px";
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.left = ""+(Number(this.attrTPsizeW) - 76)+"px";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.top = "24px";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.left = ""+(Number(this.attrTPsizeW) - 82)+"px";
                } else {
                    /* Pointer: Top | Offset: No (Center Position) */
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.transform = "rotate(-135deg)";
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.top = "6px";
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.left = ""+((Number(this.attrTPsizeW) - 40) / 2)+"px";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.top = "24px";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.left = ""+((Number(this.attrTPsizeW) - 52) / 2)+"px";
                }
            break;

            case 'bottom':
                this.shadowRoot.getElementById("tooltip-bodyframe").style.width = "100%";
                this.shadowRoot.getElementById("tooltip-bodyframe").style.height = ""+(Number(this.attrTPsizeH) - 24)+"px";
                this.shadowRoot.getElementById("tooltip-bodyframe").style.top = "0px";
                this.shadowRoot.getElementById("tooltip-bodyframe").style.left = "0px";
                if(this.attrPoffset.toLowerCase() == "offsetl") {
                    /* Pointer: Bottom | Offset: Left */
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.transform = "rotate(45deg)";
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.top = ""+(Number(this.attrTPsizeH) - 46)+"px";
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.left = "36px";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.top = ""+(Number(this.attrTPsizeH) - 27)+"px";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.left = "30px";
                } else if(this.attrPoffset.toLowerCase() == "offsetr") {
                    /* Pointer: Bottom | Offset: right */
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.transform = "rotate(45deg)";
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.top = ""+(Number(this.attrTPsizeH) - 46)+"px";
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.left = ""+(Number(this.attrTPsizeW) - 76)+"px";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.top = ""+(Number(this.attrTPsizeH) - 27)+"px";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.left = ""+(Number(this.attrTPsizeW) - 82)+"px";
                } else {
                    /* Pointer: Bottom | Offset: No (Center Position) */
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.transform = "rotate(45deg)";
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.top = ""+(Number(this.attrTPsizeH) - 46)+"px";
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.left = ""+((Number(this.attrTPsizeW) - 40) / 2)+"px";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.top = ""+(Number(this.attrTPsizeH) - 27)+"px";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.left = ""+((Number(this.attrTPsizeW) - 52) / 2)+"px";
                }
            break;

            case 'left':
                this.shadowRoot.getElementById("tooltip-bodyframe").style.width = ""+(Number(this.attrTPsizeW) - 24)+"px";
                this.shadowRoot.getElementById("tooltip-bodyframe").style.height = "100%";
                this.shadowRoot.getElementById("tooltip-bodyframe").style.top = "0px";
                this.shadowRoot.getElementById("tooltip-bodyframe").style.left = "24px";
                if(this.attrPoffset.toLowerCase() == "offsett") {
                    /* Pointer: Left | Offset: Top */
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.transform = "rotate(135deg)";
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.top = "34px";
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.left = "6px";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.transform = "rotate(90deg)";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.top = "53px";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.left = "0px";
                } else if(this.attrPoffset.toLowerCase() == "offsetb") {
                    /* Pointer: Left | Offset: Bottom */
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.transform = "rotate(135deg)";
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.top = ""+(Number(this.attrTPsizeH) - 74)+"px";
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.left = "6px";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.transform = "rotate(90deg)";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.top = ""+(Number(this.attrTPsizeH) - 53)+"px";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.left = "0px";
                } else {
                    /* Pointer: Left | Offset: No (Center Position) */
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.transform = "rotate(135deg)";
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.top = ""+((Number(this.attrTPsizeH) - 40) / 2)+"px";
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.left = "6px";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.transform = "rotate(90deg)";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.top = ""+((Number(this.attrTPsizeH) / 2)-1)+"px";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.left = "0px";
                }
            break;

            case 'right':
                this.shadowRoot.getElementById("tooltip-bodyframe").style.width = ""+(Number(this.attrTPsizeW) - 24)+"px";
                this.shadowRoot.getElementById("tooltip-bodyframe").style.height = "100%";
                this.shadowRoot.getElementById("tooltip-bodyframe").style.top = "0px";
                this.shadowRoot.getElementById("tooltip-bodyframe").style.left = "0px";
                if(this.attrPoffset.toLowerCase() == "offsett") {
                    /* Pointer: Right | Offset: Top */
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.transform = "rotate(-45deg)";
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.top = "34px";
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.left = ""+((Number(this.attrTPsizeW) - 46))+"px";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.transform = "rotate(90deg)";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.top = "53px";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.left = ""+(Number(this.attrTPsizeW) - 52)+"px";
                } else if(this.attrPoffset.toLowerCase() == "offsetb") {
                    /* Pointer: Right | Offset: Bottom */
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.transform = "rotate(-45deg)";
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.top = ""+(Number(this.attrTPsizeH) - 74)+"px";
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.left = ""+((Number(this.attrTPsizeW) - 46))+"px";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.transform = "rotate(90deg)";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.top = ""+(Number(this.attrTPsizeH) - 55)+"px";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.left = ""+(Number(this.attrTPsizeW) - 52)+"px";
                } else {
                    /* Pointer: Right | Offset: No (Center Position) */
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.transform = "rotate(-45deg)";
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.top = ""+((Number(this.attrTPsizeH) - 40) / 2)+"px";
                    this.shadowRoot.getElementById("tooltip-pointerbox").style.left = ""+((Number(this.attrTPsizeW) - 46))+"px";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.transform = "rotate(90deg)";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.top = ""+(Number(this.attrTPsizeH) / 2)+"px";
                    this.shadowRoot.getElementById("tooltip-border-bugfix").style.left = ""+(Number(this.attrTPsizeW) - 52)+"px";
                }
            break;
        }

        /* 4th Step: Update the Viewmode of the Tooltip */
        this.shadowRoot.getElementById(this.attrTPobjid).style.visibility = this.attrTPvmode;
    }

    addEventListeners() {
        // RESERVED FOR LATER USE
        //this.shadowRoot.querySelector('.tooltip-mainframe').addEventListener('click', () => ShadowDOM.ChangeVisibility(PrivateTooltipComponent.classidref,this.attrTPobjid,'hidden') );
    }

}
// Define the new custom element. This line will trigger the constructor
// The first argument is the tag name of the new element.
// The second argument is the class that controls its behavior.
window.customElements.define(PrivateTooltipComponent.classidref, TooltipPopupComponent);