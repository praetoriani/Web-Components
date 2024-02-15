
/*
Written by praetoriani
https://github.com/praetoriani

MODAL WINDOW WEB COMPONENT
Version:        v1.01.06
Last Update:  10.02.2024

*/

/* ******************************************************************************************************************************************************
The PrivateModWinComponent Object stores important informations about the web component!
[!!]   D O   N O T   C H A N G E   T H E S E   L I N E S   [!!]
*/
const PrivateModWinComponent = {};

Object.defineProperty( PrivateModWinComponent,'classidref',{
	value: 'modal-win',
	writable: false
});

Object.defineProperty( PrivateModWinComponent,'cssfilesrc',{
	value: 'modal-win.css',
	writable: false
});


/* ******************************************************************************************************************************************************
The ModalWindowConfig Object is required to configure the design (colors) of the Modal Window Web Component. The ModalWindowConfig Object will be
configured through the ShadowDOM.PreloadMWdesign() function. The pre-defined values are used as default (if there is no)
*/
const ModalWindowConfig = {};

// The ModalWindowConfig.status (string) can only be 'use' or 'off'. This defines if we have to use the global configuration for the design
Object.defineProperty( ModalWindowConfig,'status',{
	value: 'off',
	writable: true
});
Object.defineProperty( ModalWindowConfig,'componentid',{
	value: 'unknown',
	writable: true
});

Object.defineProperty( ModalWindowConfig,'bgcolor',{
	value: '#EFEFEF',
	writable: true
});

Object.defineProperty( ModalWindowConfig,'border',{
	value: '2px solid rgba(51, 51, 51, 0.8)',
	writable: true
});

Object.defineProperty( ModalWindowConfig,'buttonbar',{
	value: '#E4E4E4',
	writable: true
});

Object.defineProperty( ModalWindowConfig,'btnhover',{
	value: '#DADADA',
	writable: true
});

/* ******************************************************************************************************************************************************
The ShadowDOM Class provides several functions to deal with instances of web components created in a Shadow DOM.
DEPENDENCIES: No dependencies!
*/
class ShadowDOM {
    
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

    static ShowModalWindow(ObjectID) {
        let [Lookup1,ModWinShield] = this.GetComponent(PrivateModWinComponent.classidref, ObjectID+"-shield");
        let [Lookup2,ModWinObject] = this.GetComponent(PrivateModWinComponent.classidref, ObjectID);
        if (ModWinObject) {
            ModWinObject.style.visibility = 'visible';
            if( ModWinShield ) {
                ModWinShield.style.visibility = 'visible';
            }
        } else {
            console.warn("ShadowDOM.ShowModalWindow() failed.","Result of the Lookup is '"+Lookup2+"'",
            "ShadowDOM.ShowModalWindow() was called with the following params:",
            "ObjectID: "+ObjectID+"");
        }
    }

    static HideModalWindow(ObjectID) {
        let [Lookup1,ModWinShield] = this.GetComponent(PrivateModWinComponent.classidref, ObjectID+"-shield");
        let [Lookup2,ModWinObject] = this.GetComponent(PrivateModWinComponent.classidref, ObjectID);
        if (ModWinObject) {
            ModWinObject.style.visibility = 'hidden';
            if( ModWinShield ) {
                ModWinShield.style.visibility = 'hidden';
            }
        } else {
            console.warn("ShadowDOM.ShowModalWindow() failed.","Result of the Lookup is '"+Lookup2+"'",
            "ShadowDOM.ShowModalWindow() was called with the following params:",
            "ObjectID: "+ObjectID+"");
        }
    }

    static ValidateHEX(HEXstring) {
        const validHEX = /^#([0-9A-F]{3}([0-9A-F]{3})?)$/i;
        return validHEX.test(HEXstring);
    }

    static ConvertHexToRGBA(HEXstring) {
        HEXstring = HEXstring.replace('#', '');
        if (HEXstring.length === 3) {
            HEXstring = HEXstring.split('').map(char => char + char).join('');
        }
        let r = parseInt(HEXstring.substring(0, 2), 16);
        let g = parseInt(HEXstring.substring(2, 4), 16);
        let b = parseInt(HEXstring.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, 0.8)`;
    }

    static PreloadMWdesign(MWobjID,MWbgcolor,MWborder,MWbuttonbar,MWbtnhover) {
        let ErrSniffer = false;
        if( !MWobjID) { ErrSniffer = true; }
        // validate the background-color
        if( this.ValidateHEX(MWbgcolor) === false) { ErrSniffer = true; }
        // validate the color for the button-bar
        if( this.ValidateHEX(MWbuttonbar) === false) { ErrSniffer = true; }
        // validate the hover-color for the button(s)
        if( this.ValidateHEX(MWbtnhover) === false) { ErrSniffer = true; }
        // validate the color for the border
        if( this.ValidateHEX(MWborder) === false) { ErrSniffer = true; }
        // we had at least one error, so we cannot continue, pre-loading a user-defined design!
        if( ErrSniffer === true ) {
            ErrMessage = "ShadowDOM.PreloadMWdesign() failed! At least one given value is not corret!\n"+
                         "Unable to apply user defined css colors to the component.\n"
                         "The white design will be applied to the component now.";
            ModalWindowConfig.status = 'off';
            console.error(ErrMessage);
        } else {
            // Everything seems to be correct at this point, so we can assign the user-defined colors to the global objects
            ModalWindowConfig.status      = 'use';
            ModalWindowConfig.componentid = MWobjID;
            ModalWindowConfig.bgcolor     = MWbgcolor;
            ModalWindowConfig.border      = '2px solid '+this.ConvertHexToRGBA(MWborder)+'';
            ModalWindowConfig.buttonbar   = MWbuttonbar;
            ModalWindowConfig.btnhover    = MWbtnhover;
            /* ONLY FOR DEBUGGING PURPOSE
            console.info("User-Design created with following values:\n",
            "ModalWindowConfig.status: "+ModalWindowConfig.status+"\n",
            "ModalWindowConfig.componentid: "+ModalWindowConfig.componentid+"\n",
            "ModalWindowConfig.bgcolor: "+ModalWindowConfig.bgcolor+"\n",
            "ModalWindowConfig.border: "+ModalWindowConfig.border+"\n",
            "ModalWindowConfig.buttonbar: "+ModalWindowConfig.buttonbar+"\n",
            "ModalWindowConfig.btnhover: "+ModalWindowConfig.btnhover+"\n",
            );
            */
        }
    }

}

/* ******************************************************************************************************************************************************
This extends HTMLElement, which is the base class for all HTML elements.
*/
class ModalWindowComponent extends HTMLElement {

    // This static getter returns an array of attribute names to be observed for changes
    static get observedAttributes() {
        return ['mwid','winsize','pos','stacklvl','caption','btncount','shield','view','design'];
    }
    
    // The constructor method is creating and initializing an object created with a class.
    constructor() {
        // Call the constructor of the parent class (HTMLElement).
        super();
        // Attach a shadow root to the custom element. The 'open' mode means that the
        // shadow root can be accessed from JavaScript outside the shadow root.
        this.attachShadow({ mode: 'open' });
        /* Init the vars for our attributes */
        this.attrMWid     = "";
        this.attrMWsize   = "";
        this.attrMWpos    = "";
        this.attrMWzlvl   = "";
        this.attrMWhead   = "";
        this.attrMWbtns   = "";
        this.attrMWshield = "";
        this.attrMWview   = "";
        this.attrMWstyle  = "";
        this.BugSniffer   = false;
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
        if( this.BugSniffer === false) {
            // Call the RenderComponent method when the element is inserted into the DOM.
            this.RenderComponent();
            // RESERVED FOR LATER USE
            this.addEventListeners();
        } else {
            let BuildError = "----------------------------------\n(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧  YOU'RE SCREWED!\n----------------------------------\n";
            BuildError += "Building process of the Modal-Win Web Component has been cancelled!\n";
            BuildError += "A fatal error was encountered during creation process!\n";
            BuildError += "There is at least one error with the attributes!\n";
            BuildError += "They are either not declared or have wrong/invalid values!\n";
            BuildError += "Please check your HTML code of the Modal-Win Web Component!\n";
            this.ConsoleOutput("class ModalWindowComponent extends HTMLElement",BuildError,"error");
        }
    }

    /* This function catches the attribute values from the component and checks if they are declared and have correct/valid values */
    CatchAttributes() {
        let ErrorCode = "";

        // Catch the attribute values from the component
        this.attrMWid     = this.getAttribute('mwid');
        this.attrMWsize   = this.getAttribute('winsize');
        this.attrMWpos    = this.getAttribute('pos');
        this.attrMWzlvl   = this.getAttribute('stacklvl');
        this.attrMWhead   = this.getAttribute('caption');
        this.attrMWbtns   = this.getAttribute('btncount');
        this.attrMWshield = this.getAttribute('shield');
        this.attrMWview   = this.getAttribute('view');
        this.attrMWstyle  = this.getAttribute('design');

        // Check if we have an Object-ID
        if( !this.attrMWid || this.attrMWid.length <= 0) {
            ErrorCode = "Error in CatchAttributes()\n Missing value for attribute 'mwid' (attribute not found)!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        }

        // Check if we have a correct value for 'winsize'
        if( !this.attrMWsize ) {
            ErrorCode = "Error in CatchAttributes()\n Missing value for attribute 'winsize' (attribute not found)!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        } else if( this.attrMWsize.indexOf("x") !== -1 ) {
            let [MWsizex,MWsizey] = this.attrMWsize.split("x");
            if( isNaN(Number(MWsizex)) || isNaN(Number(MWsizey)) ) {
                ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'winsize'!\n Component cannot be built properly!";
                throw new Error(ErrorCode);
            }
        } else {
            ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'winsize'!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        }

        // Check if we have a correct value for 'pos'
        if( !this.attrMWpos ) {
            ErrorCode = "Error in CatchAttributes()\n Missing value for attribute 'pos' (attribute not found)!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        } else if( this.attrMWpos.indexOf(":") === -1) {
            ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid format for attribute 'pos'!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        } else if( this.attrMWpos.indexOf(":") !== -1 ) {
            let [NewMWposx,NewMWposy] = this.attrMWpos.split(":");

            if( NewMWposx.toLowerCase() !== "c" && NewMWposy.toLowerCase() !== "c") {
                if( isNaN(Number(NewMWposx)) ||  isNaN(Number(NewMWposy)) ) {
                    ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'pos'!\n Component cannot be built properly!";
                    throw new Error(ErrorCode);
                }
            } else if( NewMWposx.toLowerCase() === "c" && NewMWposy.toLowerCase() !== "c" ) {
                if( isNaN(Number(NewMWposy)) ) {
                    ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'pos'!\n Component cannot be built properly!";
                    throw new Error(ErrorCode);
                }
            } else if( NewMWposx.toLowerCase() !== "c" && NewMWposy.toLowerCase() === "c" ) {
                if( isNaN(Number(NewMWposx)) ) {
                    ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'pos'!\n Component cannot be built properly!";
                    throw new Error(ErrorCode);
                }
            }

        }

        // Check if we have a correct value for 'stacklvl'
        if( !this.attrMWzlvl ) {
            ErrorCode = "Error in CatchAttributes()\n Missing value for attribute 'stacklvl' (attribute not found)!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        } else if( isNaN(Number(this.attrMWzlvl)) ) {
            ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'stacklvl' (no numbers detected)!\n Component cannot be built properly!";
            throw new Error(ErrorCode);

        } else if( Number(this.attrMWzlvl) < 1 || Number(this.attrMWzlvl) > 9999 ) {
            ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'stacklvl' (must be something between 1 and 9999)!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        }

        // Check if we have a correct value for 'caption'
        if( !this.attrMWhead ) {
            ErrorCode = "Error in CatchAttributes()\n Missing value for attribute 'caption' (attribute not found)!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        } else if( this.attrMWhead.toLowerCase() !== "true" && this.attrMWhead.toLowerCase() !== "false" ) {
            ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'caption'!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        }

        // Check if we have a correct value for 'btncount'
        if( !this.attrMWbtns ) {
            ErrorCode = "Error in CatchAttributes()\n Missing value for attribute 'btncount' (attribute not found)!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        } else if( isNaN(Number(this.attrMWbtns)) ) {
            ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'btncount' (must be a number)!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        } else if( Number(this.attrMWbtns) < 1 && Number(this.attrMWbtns) > 3) {
            ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'btncount' (must be 1, 2 or 3)!\n Component cannot be built properly!";
            throw new Error(ErrorCode);
        } 

        // Check if we have a correct value for 'shield' (we're using 'true:50' as default)
        if( !this.attrMWshield ) {
            ErrorCode = "Error in CatchAttributes()\n Missing value for attribute 'shield' (attribute not found)!\n Going to use 'true:50' as default!";
            this.ConsoleOutput("CatchAttributes()",ErrorCode,"warn");
            this.attrMWshield = 'true:50';
        } else if( this.attrMWshield.indexOf(":") === -1 ) {
            ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'shield'!\n Going to use 'true:50' as default!";
            this.ConsoleOutput("CatchAttributes()",ErrorCode,"warn");
            this.attrMWshield = 'true:50';
        } else if( this.attrMWshield.indexOf(":") !== -1 ) {
            let [UseShield,OpacityLevel] = this.attrMWshield.split(":");
            if( UseShield.toLowerCase() !== 'true' && UseShield.toLowerCase() !== 'false' ) {
                ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'shield'!\n Going to use 'true:50' as default!";
                this.ConsoleOutput("CatchAttributes()",ErrorCode,"warn");
                this.attrMWshield = 'true:50';
            } else if ( Number(OpacityLevel) < 1 && Number(OpacityLevel) > 100) {
                ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'shield'!\n Going to use 'true:50' as default!";
                this.ConsoleOutput("CatchAttributes()",ErrorCode,"warn");
                this.attrMWshield = 'true:50';
            }
        }

        // Check if we have a correct value for 'view' (we're using 'visible' as default)
        if( !this.attrMWview ) {
            ErrorCode = "Error in CatchAttributes()\n Missing value for attribute 'view'!\n Going to use 'visible' as default!";
            this.ConsoleOutput("CatchAttributes()",ErrorCode,"warn");
            this.attrMWview = 'visible';
        } else if( this.attrMWview.toLowerCase() !== "visible" && this.attrMWview.toLowerCase() !== "hidden") {
            ErrorCode = "Error in CatchAttributes()\n Wrong/Invalid value for attribute 'view' (can only be 'visible' or 'hidden')!\n Going to use 'visible' as default!";
            this.ConsoleOutput("CatchAttributes()",ErrorCode,"warn");
            this.attrMWview = 'visible';
        }

        /*
        Due to the special option to inject user-defined css colors, we need to handle this check in a special manor.
        We have to make sure that either user-defined colors are set/used, or the 'design' attribute is configured.
        */

        if( ModalWindowConfig.status === 'off' && !this.attrMWstyle) {
            // In this case, we do not have a global design and we have no 'design' attribute. So we're going to apply 'white' as design
            ErrorCode = "Error in CatchAttributes()\n No global design config found and no value for attribute 'design'!\n Going to use 'white' as default!";
            this.ConsoleOutput("CatchAttributes()",ErrorCode,"warn");
            this.attrMWstyle = 'white';
        } else if( ModalWindowConfig.status === 'use' && !this.attrMWstyle ) {
            // In this case, no 'design' attribute was set, but we have a working global design configuration, which we can apply
            this.attrMWstyle = 'user-defined';
        } else if( ModalWindowConfig.status === 'use' && this.attrMWstyle.toLowerCase() === 'black' && this.attrMWstyle.toLowerCase() === 'white' ) {
            // In this case, we have too much design options. There is a global design and the attribute 'design' was set as well.
            // We're goint to eliminate the 'design' attribute and will use the global design instead.
            ErrorCode = "Error in CatchAttributes()\n Global design config found and attribute 'design' was set!\n Going to use the global design and ignore the 'design' attribute";
            this.ConsoleOutput("CatchAttributes()",ErrorCode,"warn");
            this.attrMWstyle = 'user-defined';
        } else if( ModalWindowConfig.status === 'off' && this.attrMWstyle.toLowerCase() !== 'black' && this.attrMWstyle.toLowerCase() !== 'white' ) {
            // In this case, we do not have a global design config. The 'design' attribute was set, but obvisiously with a wrong value
            ErrorCode = "Error in CatchAttributes()\n Global no design config found and attribute 'design' has wrong/invalid value!\n Going to apply 'white' as 'design' for the modal window component.";
            this.ConsoleOutput("CatchAttributes()",ErrorCode,"warn");
            this.attrMWstyle = 'white';
        }
    }

    // The RenderComponent method will generate the HTML content of the custom element.
    // This creates an instance of the component in an isolated and separated shadow DOM!
    // IMPORTANT: Every time an instance is created, it will always have its own shadow DOM!
    RenderComponent() {
        // Needed to pre-build the code before rendering it inside the Shadow DOM
        let UserConfigCSScode = ``;
        let ComponentHTMLcode = ``;
        let ComponentBTNcode  = ``;
        let ComponentCSScode  = ``;
        this.attrMWstyle = this.attrMWstyle.toLowerCase();

        // Let's create some CSS-Code for the user-defined global design. We're going to make sure that we only apply the
        // global design, if it is for this component. Otherwise, we're going to ignore it.
        if( ModalWindowConfig.status === 'use' && ModalWindowConfig.componentid.toLowerCase() === this.attrMWid.toLowerCase()) {
            UserConfigCSScode = `
                .mwDesign-user-defined-background {
                    background-color: ${ModalWindowConfig.bgcolor};
                }
                .mwDesign-user-defined-border {
                    border: ${ModalWindowConfig.border};
                }
                .mwDesign-user-defined-buttonbar {
                    background-color: ${ModalWindowConfig.buttonbar};
                }
                .mwDesign-user-defined-button {
                    background-color: ${ModalWindowConfig.buttonbar};
                }
                .mwDesign-user-defined-button:hover {
                    cursor: pointer;
                    background-color: ${ModalWindowConfig.btnhover};
                }
            `;
        }

        // Create the HTML Code for the Button-Bar (incuding the 'Buttons')
        switch( Number(this.attrMWbtns) ) {
            case 1:
                ComponentBTNcode  = `
                <table id="modalwin-button-bar" class="modalwin-button-bar mwDesign-${this.attrMWstyle}-buttonbar" cellspacing="0" cellpadding="0">
                    <tr>
                        <td id="${this.attrMWid}-button1" class="modalwin-button-one mwDesign-${this.attrMWstyle}-button">
                            <slot name="modalwin-button1-slot"></slot>
                        </td>
                    </tr>
                </table>
                `;
            break;

            case 2:
                ComponentBTNcode  = `
                <table id="modalwin-button-bar" class="modalwin-button-bar mwDesign-${this.attrMWstyle}-buttonbar" cellspacing="0" cellpadding="0">
                    <tr>
                        <td id="${this.attrMWid}-button1" class="modalwin-button-two mwDesign-${this.attrMWstyle}-button">
                            <slot name="modalwin-button1-slot"></slot>
                        </td>
                        <td id="${this.attrMWid}-button2" class="modalwin-button-two mwDesign-${this.attrMWstyle}-button">
                            <slot name="modalwin-button2-slot"></slot>
                        </td>
                    </tr>
                </table>
                `;
            break;

            case 3:
                ComponentBTNcode  = `
                <table id="modalwin-button-bar" class="modalwin-button-bar mwDesign-${this.attrMWstyle}-buttonbar" cellspacing="0" cellpadding="0">
                    <tr>
                        <td id="${this.attrMWid}-button1" class="modalwin-button-thres mwDesign-${this.attrMWstyle}-button">
                            <slot name="modalwin-button1-slot"></slot>
                        </td>
                        <td id="${this.attrMWid}-button2" class="modalwin-button-threc mwDesign-${this.attrMWstyle}-button">
                            <slot name="modalwin-button2-slot"></slot>
                        </td>
                        <td id="${this.attrMWid}-button3" class="modalwin-button-thres mwDesign-${this.attrMWstyle}-button">
                            <slot name="modalwin-button3-slot"></slot>
                        </td>
                    </tr>
                </table>
                `;
            break;
        }

        // Modal-Win will be created with a title/caption
        if( this.attrMWhead.toLowerCase() === "true") {
            ComponentHTMLcode = `
                <div id="${this.attrMWid}" class="modal-window-mainframe mwDesign-${this.attrMWstyle}-background mwDesign-${this.attrMWstyle}-border">
                    <table class="modal-window-maintable" cellspacing="0" cellpadding="0">
                        <tr>
                            <td class="modal-window-headcell">
                                <slot name="modalwin-caption-slot"></slot>
                            </td>
                        </tr>
                        <tr>
                            <td class="modal-window-bodycell">
                                <slot name="modalwin-message-slot"></slot>
                            </td>
                        </tr>
                        <tr>
                            <td class="modal-window-buttonbar">
                                ${ComponentBTNcode}
                            </td>
                        </tr>
                    </table>
                </div>
            `;
        } else {
            // Modal-Win will be created without a title/Caption
            ComponentHTMLcode = `
                <div id="${this.attrMWid}" class="modal-window-mainframe mwDesign-${this.attrMWstyle}-background mwDesign-${this.attrMWstyle}-border">
                    <table class="modal-window-maintable" cellspacing="0" cellpadding="0">
                        <tr>
                            <td class="modal-window-bodyonly">
                                <slot name="modalwin-message-slot"></slot>
                            </td>
                        </tr>
                        <tr>
                            <td class="modal-window-buttonbar">
                                ${ComponentBTNcode}
                            </td>
                        </tr>
                    </table>
                </div>
            `;
        }
        
        // Pre-Build the CSS Code (we're going to inject the user-defined css styles here)
        ComponentCSScode  = `
        <style>
            @import '${PrivateModWinComponent.cssfilesrc}';

            ${ModalWindowConfig.status === 'use' ? UserConfigCSScode : ''}

            /* SLOTTED CSS PATTERNS -> THESE PROPERTIES CAN BE CHANGED BY THE USER */
            ::slotted([slot="modalwin-caption-slot"]) {
                font-family: inherit;
                font-weight: inherit;
                font-style: inherit;
                font-size: inherit;
                color: inherit;
                text-align: inherit;
                vertical-align: inherit;
                white-space: inherit;
            }
            ::slotted([slot="modalwin-message-slot"]) {
                font-family: inherit;
                font-weight: inherit;
                font-style: inherit;
                font-size: inherit;
                color: inherit;
                text-align: inherit;
                vertical-align: inherit;
                white-space: inherit;
            }
            ::slotted([slot="modalwin-button1-slot"]) {
                font-family: inherit;
                font-weight: inherit;
                font-style: inherit;
                font-size: inherit;
                color: inherit;
                text-align: inherit;
                vertical-align: inherit;
                white-space: inherit;
            }
            ::slotted([slot="modalwin-button2-slot"]) {
                font-family: inherit;
                font-weight: inherit;
                font-style: inherit;
                font-size: inherit;
                color: inherit;
                text-align: inherit;
                vertical-align: inherit;
                white-space: inherit;
            }
            ::slotted([slot="modalwin-button3-slot"]) {
                font-family: inherit;
                font-weight: inherit;
                font-style: inherit;
                font-size: inherit;
                color: inherit;
                text-align: inherit;
                vertical-align: inherit;
                white-space: inherit;
            }
        </style>
        `;
        // Render the component inside its Shadow DOM
        if( this.attrMWshield.toLowerCase().indexOf("true") !== -1 ) {
            // Modal Window with shield
            this.shadowRoot.innerHTML = `
                ${ComponentCSScode}
                <div id="${this.attrMWid}-shield" class="modal-window-displayshield">
                    ${ComponentHTMLcode}
                </div>
            `;

        } else {
            // Modal Window without shield
            this.shadowRoot.innerHTML = `
                ${ComponentCSScode}
                ${ComponentHTMLcode}
            `;
        }
        // [!!!] A T T E N T I O N [!!!]
        // At this point we have to set the global design congiuration to 'off' no matter if it has been used or not.
        // The global design should only be used once. If the ShadowDOM.PreloadMWdesign() has been called before
        // creating the component, the global design configuration will be set to 'use'. After 'using' it, we have
        // to shout it out that we used it. And this can only be done if we're setting it to 'off' again ;)
        // >>>> THIS HAS TO BE DONE, RIGHT AFTER RENDERING THE COMPONENT BUT BEFORE UPDATING THE COMPONENT
        ModalWindowConfig.status = 'off';
        
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
        // Apply the new width/height to the modal window
        let [MWsizex,MWsizey] = this.attrMWsize.split("x");
        this.shadowRoot.getElementById(this.attrMWid).style.width  = MWsizex+"px";
        this.shadowRoot.getElementById(this.attrMWid).style.height = MWsizey+"px";

        // Apply the new position of the modal window
        if( this.attrMWpos.toLowerCase() === "c:c") {
            this.shadowRoot.getElementById(this.attrMWid).style.top  = "calc((100% - "+MWsizey+"px) / 2)";
            this.shadowRoot.getElementById(this.attrMWid).style.left = "calc((100% - "+MWsizex+"px) / 2)";
        } else {
            let [MWposx,MWposy] = this.attrMWpos.split(":");
            if( MWposx.toLowerCase() === "c" && MWposy.toLowerCase() !== "c") {
                this.shadowRoot.getElementById(this.attrMWid).style.left = "calc((100% - "+MWsizex+"px) / 2)";
                this.shadowRoot.getElementById(this.attrMWid).style.top  = MWposy+"px";
            } else if( MWposx.toLowerCase() !== "c" && MWposy.toLowerCase() === "c") {
                this.shadowRoot.getElementById(this.attrMWid).style.left = MWposx+"px";
                this.shadowRoot.getElementById(this.attrMWid).style.top  = "calc((100% - "+MWsizey+"px) / 2)";
            } else {
                this.shadowRoot.getElementById(this.attrMWid).style.top  = MWposx+"px";
                this.shadowRoot.getElementById(this.attrMWid).style.left = MWposy+"px";
            }
        }
        
        // Split the Shield Configuration
        let [UseShield,OpacityLevel] = this.attrMWshield.split(":");
        
        if( UseShield.toLowerCase() === "true" ) {
            // Component was created with 'shield' so we can apply the new z-level and visibility to the Shield and te ModalWin
            this.shadowRoot.getElementById(this.attrMWid+"-shield").style.zIndex     = this.attrMWzlvl;
            this.shadowRoot.getElementById(this.attrMWid+"-shield").style.visibility = this.attrMWview.toLowerCase();
            this.shadowRoot.getElementById(this.attrMWid).style.zIndex     = (Number(this.attrMWzlvl) + 10);
            this.shadowRoot.getElementById(this.attrMWid).style.visibility = this.attrMWview.toLowerCase();
            // Apply the opacity to the shield
            if( Number(OpacityLevel) === 100) {
                this.shadowRoot.getElementById(this.attrMWid+"-shield").style.backgroundColor = "rgba(48, 48, 48, 1.0)";
            } else if( Number(OpacityLevel) < 100 && Number(OpacityLevel) >= 10) {
                this.shadowRoot.getElementById(this.attrMWid+"-shield").style.backgroundColor = "rgba(48, 48, 48, 0."+Number(OpacityLevel)+")";
            } else {
                this.shadowRoot.getElementById(this.attrMWid+"-shield").style.backgroundColor = "rgba(48, 48, 48, 0.0"+Number(OpacityLevel)+")";
            }
        } else if(UseShield.toLowerCase() === "false") {
            // Component was created without 'shield' so we can apply the new z-level and visibilty only to the ModalWin
            this.shadowRoot.getElementById(this.attrMWid).style.zIndex     = this.attrMWzlvl;
            this.shadowRoot.getElementById(this.attrMWid).style.visibility = this.attrMWview.toLowerCase();
        }
    }

    addEventListeners() {
        /* D E P R E C A T E D ! ! !
        External Event can be assigned to each button by using following code:
        <script>
        let [BTN1lookup,BTN1object] = ShadowDOM.GetComponent("modal-win",this.attrMWid+"-button1");
        if(BTN1object) {
            BTN1object.addEventListener('click', () => {
                ShadowDOM.HideModalWindow("DemoWindow");
                console.log("ModalWinObject.Button1 was clicked");
            });
        }
        </script>
        */
    }

}
// Define the new custom element. This line will trigger the constructor
// The first argument is the tag name of the new element.
// The second argument is the class that controls its behavior.
window.customElements.define(PrivateModWinComponent.classidref, ModalWindowComponent);