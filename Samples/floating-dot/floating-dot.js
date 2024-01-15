class FloatingDot extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: 'open'});
    }
  
    connectedCallback() {
      this.loadStyles();
      this.render();
    }
  
    async loadStyles() {
      const res = await fetch('floating-dot.css');
      const text = await res.text();
      const style = document.createElement('style');
      style.textContent = text;
      this.shadowRoot.appendChild(style);
    }
  
    render() {
      this.shadowRoot.innerHTML += `
        <div id="dot"></div>
      `;
  
      this.shadowRoot.querySelector('#dot').addEventListener('click', () => {
        alert('Dot clicked!');
      });
    }
  }
  
  customElements.define('floating-dot', FloatingDot);