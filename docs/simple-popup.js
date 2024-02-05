/*
Written by praetoriani
https://github.com/praetoriani/Web-Components

SIMPLE POPUP WEB COMPONENT
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
<script src="simple-popup.js"></script>
Make sure that the 'simple-popup.css' is in the same directory as the 'simple-popup.js'.
The web component can then be used like this:

<simple-popup popupid="MyPopup" size="WIDTHxHEIGHT" viewmode="VISIBLE/HIDDEN">
    <span slot="popupheadtext" class="YourCSSclass">
        ... this is the place for the text/code for the header ...
    </span>
    <span slot="popupbodytext" class="YourCSSclass">
        ... this it the place where you write your text/code for the body ...
    </span>
    <span slot="popupbuttontext" class="YourCSSclass">
        ... this is the area for the text/code of your button ...
    </span>
</simple-popup>

The Simple-Popup consists of three areas. The first area is the header, the second area is the body and the third area is the button

popupid     (required)
This gives you the ability to assign an ID to your Popup. It's important to handle the visibility of the popup.
Without an ID, the web component will not work at all. If you are using more than one instance of this component,
please make sure that all these popups have different and unique IDs.

size        (required)
With this attribute you can set the 'width' and 'height' of the popup. Please don't use 'px' (or any other unit).
The value of this attribute must be in a form like '300x200' (where '300' is the 'width' and '200' is the 'height').

viewmode    (required)
This attribute accepts only 'visible' or 'hidden'.
If you pass an empty/wrong value, you'll get an error message in the console.

The SIMPLE POPUP WEB COMPONENT offers you three different slots .These Slots are mandatory and have to be used!

<span slot="popupheadtext" class="YourCSSclass">
... THIS IS THE HEAD-SLOT ...
</span>

<span slot="popupbodytext" class="YourCSSclass">
... THIS IS THE BODY-SLOT ...
</span>

<span slot="popupbuttontext" class="YourCSSclass">
... THIS IS THE BUTTON-SLOT ...
</span>

Each slot can have the 'class' attribute. But keep in mind that the web component will only allow changes
to the css-propertys regarding the font. The 'slot'-attribute is very important Without it, your slot cannot
be identified by the web component.
*/

// Define the InfoBanner-Class.
// This extends HTMLElement, which is the base class for all HTML elements.
class SimplePopupComponent extends HTMLElement {
    // This static getter returns an array of attribute names to be observed for changes
    static get observedAttributes() {
        return ['popupid', 'size', 'viewmode'];
    }
    
    // The constructor method is creating and initializing an object created with a class.
    constructor() {
        // Call the constructor of the parent class (HTMLElement).
        super();
        // Attach a shadow root to the custom element. The 'open' mode means that the
        // shadow root can be accessed from JavaScript outside the shadow root.
        this.attachShadow({ mode: 'open' });
        /* Init the vars for our attributes */
        this.varPopupID = "";
        this.varDisplay = "";
        this.vaViewMode = "";

    }

    // The connectedCallback() lifecycle hook fires
    // when the element gets inserted into the DOM.
    connectedCallback() {
        // Get the user-defined attribute values
        this.CatchAttributes();
        // Call the RenderComponent method when the element is inserted into the DOM.
        this.RenderComponent();
        // RESERVED FOR LATER USE
        this.addEventListeners();
    }

    CatchAttributes() {
        // Catch the attribute values from the component
        this.varPopupID   = this.getAttribute('popupid');
        this.varPopupSize = this.getAttribute('size');
        this.varViewMode  = this.getAttribute('viewmode');
    }

    // The RenderComponent method will generate
    // the HTML content of the custom element.
    RenderComponent() {
        // Set the inner HTML of the shadow root
        this.shadowRoot.innerHTML = `
            <style>
                @import 'simple-popup.css';
                /* */
                ::slotted([slot="popupheadtext"]) {
                    font-family: inherit;
                    font-weight: inherit;
                    font-style: inherit;
                    font-size: inherit;
                    color: inherit;
                }
                ::slotted([slot="popupbodytext"]) {
                    font-family: inherit;
                    font-weight: inherit;
                    font-style: inherit;
                    font-size: inherit;
                    color: inherit;
                }
                ::slotted([slot="popupbuttontext"]) {
                    font-family: inherit;
                    font-weight: inherit;
                    font-style: inherit;
                    font-size: inherit;
                    color: inherit;
                }
            </style>
            <div id="${this.varPopupID}" class="PopupContainer">
                <div id="Popup" class="PopupBox">
                    <table class="ContentTable" cellspacing="0" cellpadding="0">
                        <tr>
                            <td class="PopupHead">
                                <slot name="popupheadtext"></slot>
                            </td>
                        </tr>
                        <tr>
                            <td class="PopupBody">
                                <slot name="popupbodytext"></slot>
                            </td>
                        </tr>
                        <tr>
                            <td class="PopupFoot">
                                <slot name="popupbuttontext"></slot>
                            </td>
                        </tr>
                    </table>
                </div>
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
        let [PopupW,PopupH] = this.varPopupSize.split('x');
        this.shadowRoot.getElementById('Popup').style.width  = PopupW+'px';
        this.shadowRoot.getElementById('Popup').style.height = PopupH+'px';
        this.shadowRoot.getElementById('Popup').style.top    = 'calc((100% - ' + PopupH + 'px) / 2)';
        this.shadowRoot.getElementById('Popup').style.left   = 'calc((100% - ' + PopupW + 'px) / 2)';
        
        if( this.varViewMode.toLowerCase() == 'visible' || this.varViewMode.toLowerCase() == 'hidden' ) {
            this.shadowRoot.getElementById(this.varPopupID).style.visibility  = this.varViewMode;
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
        // Add event listener to the button
        this.shadowRoot.querySelector('.PopupFoot').addEventListener('click', () => this.setDisplayMode(this.varPopupID,'hidden'));
    }

}
// Define the new custom element. This line will trigger the constructor
// The first argument is the tag name of the new element.
// The second argument is the class that controls its behavior.
window.customElements.define('simple-popup', SimplePopupComponent);