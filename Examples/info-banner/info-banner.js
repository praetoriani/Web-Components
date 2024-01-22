/*
written by praetoriani
https://github.com/praetoriani/Web-Components
*/


// Define a class for our component
class InfoBanner extends HTMLElement {
    // The constructor is called when an instance of the element is created or upgraded
    constructor() {
      super(); // Call the constructor of the parent class, HTMLElement
      this.attachShadow({ mode: 'open' }); // Attach a shadow root to the element
    }
  
    // Called every time the element is inserted into the DOM
    connectedCallback() {
      this.render(); // Call the render method
    }
  
    // Render the element's HTML and CSS
    render() {
        // Get the message attribute
        const message = this.getAttribute('message') || '';

        // Set the inner HTML of the shadow root
        this.shadowRoot.innerHTML = `
        <style>
            @import 'info-banner.css';
        </style>
        <div class="info-banner">
            <!-- HERE GOES THE CONTENT OF THE BANNER -->
            <table style="width: 100%; height: 100%; border: none; background: none; padding: 0px; margin: 0px;">
                <tr>
                    <td style="width: 100%; height: 100%; text-align: center; vertical-align: center; font-size: 18px; color: #303030;">
                    <!-- HERE GOES THE MESSAGE -->
                    ${message}
                    </td>
                </tr>
            </table>
        </div>
        `;
        this.update(); // Call the update method
    }
  
    // Update the color and position of the banner
    update() {
      // Select the banner div
      const banner = this.shadowRoot.querySelector('.info-banner');
      // Get the color attribute
      const color = this.getAttribute('color');
      // Get the position attribute
      const position = this.getAttribute('position');
  
      // If the color is a valid hex color
      if (/^#[0-9A-F]{6}$/i.test(color)) {
        // Set the background color of the banner
        banner.style.backgroundColor = color;
      }
  
      // If the position is 'top' or 'bottom'
      if (position === 'top' || position === 'bottom') {
        // Set the position of the banner
        banner.style.position = 'fixed';
        // Set the top or bottom property to 16px
        banner.style[position] = '16px';
      }
    }
  
    // An array of attribute names to observe for changes
    static get observedAttributes() {
        return ['color', 'position', 'message']; // the list of observed attributes
    }
  
    // Called when an observed attribute has been added, removed, updated, or replaced
    attributeChangedCallback() {
      //this.update(); // Call the update method
      this.render(); // Call the render method to update the message
    }
  }
  
  // Define a new custom element
  window.customElements.define('info-banner', InfoBanner);
  