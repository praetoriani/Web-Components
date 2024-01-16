/*
Written by praetoriani
https://github.com/praetoriani/Web-Components
*/


// Define a class for the custom element 'FloatingDot'
class FloatingDot extends HTMLElement {
  constructor() {
    super(); // Call the constructor of the HTMLElement class
    this.attachShadow({mode: 'open'}); // Attach a shadow DOM to the custom element
  }

  // Called when the custom element is inserted into the DOM. This will load
  // the external CSS styles and renders the inner HTML of our custom web component
  connectedCallback() {
    this.loadStyles();
    this.render();
  }

  // Load the CSS styles asynchronously from the 'floating-dot.css' file
  async loadStyles() {
    const res = await fetch('floating-dot.css');      // Fetch the CSS file
    const text = await res.text();                    // Read the CSS file as text
    const style = document.createElement('style');    // Create a style element
    style.textContent = text;                         // Set the text content of the style element to the CSS
    this.shadowRoot.appendChild(style);               // Append the style element to the shadow DOM
  }

  // Render the inner HTML of the custom element
  render() {
    // Add a div with ID 'dot' to the shadow DOM. This line is our custom component ;)
    this.shadowRoot.innerHTML += ` <div id="dot"></div> `;
    
    // Add a click event listener to the div that shows an alert when clicked
    this.shadowRoot.querySelector('#dot').addEventListener('click', () => {
      alert('Dot clicked!');
    });
    
  }

}

// Define the 'floating-dot' custom element, associating it with the FloatingDot class
customElements.define('floating-dot', FloatingDot);
