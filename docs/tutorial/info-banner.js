// Define the InfoBanner-Class.
// This extends HTMLElement, which is the base class for all HTML elements.
class InfoBanner extends HTMLElement {

    // The constructor method is creating and initializing an object created with a class.
    constructor() {
        // Call the constructor of the parent class (HTMLElement).
        super();
        // Attach a shadow root to the custom element. The 'open' mode means that the
        // shadow root can be accessed from JavaScript outside the shadow root.
        this.attachShadow({ mode: 'open' });
    }

    // The connectedCallback() lifecycle hook fires
    // when the element gets inserted into the DOM.
    connectedCallback() {
        // Call the RenderComponent method when the element is inserted into the DOM.
        this.RenderComponent();
    }

    // The RenderComponent method will generate
    // the HTML content of the custom element.
    RenderComponent() {
        // Get the attributes. We're going to set some default values
        // as a fallback (if there is an empty value for an attribute)
        const attrText = this.getAttribute('text') || '';

        // Set the inner HTML of the shadow root
        this.shadowRoot.innerHTML = `
        <style>
            @import 'info-banner.css';
        </style>
        <div class="BannerDesign Roboto400">
            <p>${attrText}</p>
        </div>
        `;
        // Call the update method to update other details
        this.UpdateComponent();
    }

    // The UpdateComponent method will update
    // the HTML content of the custom element.
    UpdateComponent() {
        // Get the attributes. We're going to set some default values
        // as a fallback (if there is an empty value for an attribute)
        const attrPos = this.getAttribute('position') || 'top';
        const attrBcol= this.getAttribute('bgcolor') || '#BEBEBE';
        const attrFcol= this.getAttribute('fontcolor') || '#EFEFEF';
        // Get the info-banner inside the Shadow DOM (by its css class)
        const vBanner = this.shadowRoot.querySelector('.BannerDesign');
        // Check that we have a valid hex-value
        if (/^#[0-9A-F]{6}$/i.test(attrBcol)) {
            // Apply the new background-color to the component
            vBanner.style.backgroundColor = attrBcol;
        }
        // Same check for the font-color
        if (/^#[0-9A-F]{6}$/i.test(attrFcol)) {
            // Apply the new background-color to the component
            vBanner.style.color = attrFcol;
        }
        // Let's set the position of the banner
        if (attrPos === 'top' || attrPos === 'bottom') {
            // Set the position of the banner
            vBanner.style.position = 'fixed';
            // Set the top or bottom property to 16px
            // so we have a distance to the top/bottom
            vBanner.style[attrPos] = '16px';
        }
    }
    
    // The static get observedAttributes method
    // returns an array of attribute names to monitor for changes.
    static get observedAttributes() {
        // the list of observed attributes
        return ['text', 'position', 'bgcolor', 'fontcolor'];
    }
  
    // The attributeChangedCallback() lifecycle hook fires
    // when an attribute is added, changed, or removed.
    attributeChangedCallback() {
        // Call the RenderComponent function to re-render the component
        this.RenderComponent();
    }
      
}
// Define the new custom element. This line will trigger the constructor
// The first argument is the tag name of the new element.
// The second argument is the class that controls its behavior.
window.customElements.define('info-banner', InfoBanner);