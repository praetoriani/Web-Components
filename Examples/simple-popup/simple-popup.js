/*
Written by praetoriani
https://github.com/praetoriani/Web-Components
*/

// Define the new element
class SimplePopup extends HTMLElement {

    constructor() {
        super(); // Call the constructor of the HTMLElement class
        this.attachShadow({mode: 'open'}); // Attach a shadow DOM to the custom element
    }

    // Called when the custom element is inserted into the DOM. This will load
    // the external CSS styles and renders the inner HTML of our custom web component
    connectedCallback() {
        this.InjectCSS();
        this.RenderComponent();
        this.addEventListeners();
    }

    // Load the CSS styles asynchronously from our external css file
    async InjectCSS() {
        const res = await fetch('simple-popup.css');      // Fetch the CSS file
        const text = await res.text();                    // Read the CSS file as text
        const style = document.createElement('style');    // Create a style element
        style.textContent = text;                         // Set the text content of the style element to the CSS
        this.shadowRoot.appendChild(style);               // Append the style element to the shadow DOM
    }

    RenderComponent() {
        // Get attribute values
        this.displayMode = this.getAttribute('display');
        this.size = this.getAttribute('size');
        this.title = this.getAttribute('title');
        this.message = this.getAttribute('message');
        this.buttonText = this.getAttribute('button');

        // Split size into width and height
        const [width, height] = this.size.split('x');

        // Create HTML for the popup
        this.shadowRoot.innerHTML = `
            <style>
               @import 'simple-popup.css';
            </style>
            <div id="PopupContainer" class="PopupContainer">
                <div id="Popup" class="PopupBox">
                    <table class="ContentTable" cellspacing="0" cellpadding="0">
                        <tr>
                            <td class="PopupHead">${this.title}</td>
                        </tr>
                        <tr>
                            <td class="PopupBody">${this.message}</td>
                        </tr>
                        <tr>
                            <td class="PopupFoot">${this.buttonText}</td>
                        </tr>
                    </table>
                </div>
            </div>
        `;
    }

    UpdateComponent() {
        // TBD
    }

    addEventListeners() {
        // Add event listener to the button
        this.shadowRoot.querySelector('.PopupFoot').addEventListener('click', () => this.setDisplayMode());

        // Add event listener to the showPopupButton
        document.getElementById('showPopupButton').addEventListener('click', () => this.setDisplayMode());
    }

    setDisplayMode() {
        // Toggle display mode
        this.displayMode = this.displayMode === 'show' ? 'hide' : 'show';

        // Update visibility and display
        this.shadowRoot.getElementById('PopupContainer').style.visibility = this.displayMode === 'show' ? 'visible' : 'hidden';
        this.shadowRoot.getElementById('PopupContainer').style.display = this.displayMode === 'show' ? 'grid' : 'none';
    }
}

// Define the new element
customElements.define('simple-popup', SimplePopup);