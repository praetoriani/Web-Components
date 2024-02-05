/*
Written by praetoriani
https://github.com/praetoriani/Web-Components

TOOLTIP POPUP WEB COMPONENT
Version:        v1.00.16
Last Update:  02.02.2024

[!!   REQUIREMENTS   !!]
THIS WEB COMPONENT IS OPTIMIZED FOR GOOGLE CHROME AND MICROSOFT EDGE. IT HAS NOT BEEN TESTED WITH OTHER BROWSERS.

[!!   IMPORTANT INFORMATION   !!]

YOU USE THESE FILES/SCRIPTS AT YOUR OWN RISK. YOU DECIDE FOR YOURSELF WHERE AND HOW YOU WANT TO USE THIS COMPONENT. YOU ARE RESPONSIBLE
FOR ANY CONSEQUENCES THAT MAY RESULT FROM THE USE OF THIS COMPONENT. I AM NOT RESPONSIBLE OR LIABLE FOR ANY PROBLEMS, MALFUNCTIONS, ERRORS
OR ANY OTHER DISASTERS THAT MAY BE CAUSED BY USING THESE FILES IN YOUR PROJECTS.

######################################################################################################################################################

USAGE INSTRUCTIONS:
To use this web component, you simply have to add this js-file to the header-part of you html-file:
<script src="tooltip-popup.js"></script>
Make sure that the 'tooltip-popup.css' is in the same directory as the 'tooltip-popup.js'.
The web component can then be used like this:

<tooltip-popup tpid="DemoTooltip" size="340x300" xaxis="50px" yaxis="calc((100% - 340px) / 2)" zaxis="1000" viewmode="visible">
    <span slot="tooltipheadtext" class="YourCSSclass">
        ... your text/code goes here ...
    </span>
    <span slot="tooltipbodytext" class="YourCSSclass">
        ... your text/code goes here ...
    </span>
</tooltip-popup>

The Tooltip-Popup consists of two areas. A part for the header text and a part for the body text.

tpid        (required)
Here you can set an unique id for the tooltip popup component. This is important if you use more than one tooltip component.
With this unique id you can identify your component with the following javascript-code:
document.querySelector('tooltip-popup').shadowRoot.getElementById(tpid);

size        (required)
Must be in the following pattern 'width' x 'height'. For Example:
size="300x200" will create a tooltip-popup with a width of 300px and a heigt of 200px.

xaxis       (required)
This will set the x-position of your tooltip-popup.

yaxis       (required)
This will set the y-position of your tooltip-popup.

zaxis       (required)
This will set the level on the z-axis of your tooltip-popup. Tihs value must be lower than 9999!

viewmode    (required)
Can only be 'visible' or 'hidden'! Defaults to 'hidden' if no or wrong value is set.

Use the slots to write the text inside the popup. Both slots are mandatory.
<span slot="tooltipheadtext" class="YourCSSclass">
    ... here goes your text/code for the header of the tooltip ...
</span>
<span slot="tooltipbodytext" class="YourCSSclass">
    ... here goes your text/code for the body of the tooltip ...
</span>

Tip:
If you don't want to use the body-part, just leave the slot 'tooltipbodytext' empty like this:
<span slot="tooltipbodytext"></span>
And then you just reduce the height of your popup to a size that only displays the header-part.
With this small trick you can create a single-line tooltip-popup ;)

*/

// Define the InfoBanner-Class.
// This extends HTMLElement, which is the base class for all HTML elements.
class TooltipPopupComponent extends HTMLElement {
    // This static getter returns an array of attribute names to be observed for changes
    static get observedAttributes() {
        return ['tpid','size','xaxis','yaxis','zaxis','viewmode'];
    }
    
    // The constructor method is creating and initializing an object created with a class.
    constructor() {
        // Call the constructor of the parent class (HTMLElement).
        super();
        // Attach a shadow root to the custom element. The 'open' mode means that the
        // shadow root can be accessed from JavaScript outside the shadow root.
        this.attachShadow({ mode: 'open' });
        /* Init the vars for our attributes */
        this.varTPID     = "";
        this.varSize     = "";
        this.varXaxis    = "";
        this.varYaxis    = "";
        this.varZaxis    = "";
        this.varViewMode = "";
    }

    // The connectedCallback() lifecycle hook fires
    // when the element gets inserted into the DOM.
    connectedCallback() {
        // Get the user-defined attribute values
        this.CatchAttributes();
        // Call the RenderComponent method when the element is inserted into the DOM.
        this.RenderComponent();
        // RESERVED FOR LATER USE
        //this.addEventListeners();
    }

    CatchAttributes() {
        // Catch the attribute values from the component
        this.varTPID     = this.getAttribute('tpid');
        this.varSize     = this.getAttribute('size');
        this.varXaxis    = this.getAttribute('xaxis');
        this.varYaxis    = this.getAttribute('yaxis');
        this.varZaxis    = this.getAttribute('zaxis');
        this.varViewMode = this.getAttribute('viewmode');
    }

    // The RenderComponent method will generate
    // the HTML content of the custom element.
    RenderComponent() {
        // Set the inner HTML of the shadow root
        this.shadowRoot.innerHTML = `
            <style>
                @import 'tooltip-popup.css';
                /* */
                ::slotted([slot="tooltipheadtext"]) {
                    font-family: inherit;
                    font-weight: inherit;
                    font-style: inherit;
                    font-size: inherit;
                    color: inherit;
                }
                ::slotted([slot="tooltipbodytext"]) {
                    font-family: inherit;
                    font-weight: inherit;
                    font-style: inherit;
                    font-size: inherit;
                    color: inherit;
                }
            </style>

            <div id="${this.varTPID}" class="TooltipPopup">
                <div id="TooltipContent" class="TooltipContent">
                    <table class="TooltipContentTable" cellspacin="0" cellpadding="0">
                        <tr>
                            <td class="TooltipContentTableHead">
                                <slot name="tooltipheadtext"></slot>
                            </td>
                        </tr>
                        <tr>
                            <td class="TooltipContentTableBody">
                                <slot name="tooltipbodytext"></slot>
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="TooltipPointer" class="TooltipPointer"></div>
            </div>
        `;
        // Call the update method to update other details
        this.UpdateComponent();
    }

    /*
    This function will update some stuff in our shaddow DOM.
    Due to we have to work with the DOM, we have to do this,
    after the component was 'rendered' inside the shaddow DOM.
    Otherwise our HTML-Elements are not available
    */
    UpdateComponent() {
        // Update the dimension/position of the popup
        let [DimensionX,DimensionY] = this.varSize.split('x');
        this.shadowRoot.getElementById(this.varTPID).style.width  = DimensionX+'px';
        this.shadowRoot.getElementById(this.varTPID).style.height = DimensionY+'px';
        this.shadowRoot.getElementById(this.varTPID).style.top    = this.varYaxis;
        this.shadowRoot.getElementById(this.varTPID).style.left   = this.varXaxis;
        this.shadowRoot.getElementById(this.varTPID).style.zIndex = this.varZaxis;
        
        if( this.varViewMode.toLowerCase() == 'visible' || this.varViewMode.toLowerCase() == 'hidden' ) {
            this.shadowRoot.getElementById(this.varTPID).style.visibility  = this.varViewMode;
        } else {
            this.shadowRoot.getElementById(this.varTPID).style.visibility  = 'hidden';
        }
    }

    /* for internal use only */
    setDisplayMode(ElementID,vMode) {
        if( this.shadowRoot.getElementById(ElementID) ) {
            if( vMode.toLowerCase() == 'visible' ) {
                this.shadowRoot.getElementById(ElementID).style.visibility = 'visible';
            } else if( vMode.toLowerCase() == 'hidden' ) {
                this.shadowRoot.getElementById(ElementID).style.visibility = 'hidden';
            } else {
                console.error("Error in static UpdateViewMode(ElementID,vMode)",
                "ElementID: "+ElementID+"",
                "vMode: "+vMode+"",
                "vMode must be either 'visible' or 'hidden'"
                );
            }
        } else {
            console.error("Error in static UpdateViewMode(ElementID,vMode)",
            "ElementID: "+ElementID+"",
            "vMode: "+vMode+"",
            "Couldn't find an Element with ID '"+ElementID+"'"
            );
        }
    }
    /* can be called from outside */
    UpdateViewMode(ElementID,vMode) {

        if( this.shadowRoot.getElementById(ElementID) ) {
            if( vMode.toLowerCase() == 'visible' ) {
                this.shadowRoot.getElementById(ElementID).style.visibility = 'visible';
            } else if( vMode.toLowerCase() == 'hidden' ) {
                this.shadowRoot.getElementById(ElementID).style.visibility = 'hidden';
            } else {
                console.error("Error in static UpdateViewMode(ElementID,vMode)",
                "ElementID: "+ElementID+"",
                "vMode: "+vMode+"",
                "vMode must be either 'visible' or 'hidden'"
                );
            }
        } else {
            console.error("Error in static UpdateViewMode(ElementID,vMode)",
            "ElementID: "+ElementID+"",
            "vMode: "+vMode+"",
            "Couldn't find an Element with ID '"+ElementID+"'"
            );
        }
        
    }

    addEventListeners() {
        // RESERVED FOR LATER USE
    }

}
// Define the new custom element. This line will trigger the constructor
// The first argument is the tag name of the new element.
// The second argument is the class that controls its behavior.
window.customElements.define('tooltip-popup', TooltipPopupComponent);