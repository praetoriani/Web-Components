/*
Written by praetoriani
https://github.com/praetoriani/Web-Components
*/

// This object stores the informations of our svg files
var IconLib = {
    /* */
    'githubview': '0 0 24 24',
    'githubpath': 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
    'htmlview': '0 0 24 24',
    'htmlpath': 'M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z',
    'cssview': '0 0 24 24',
    'csspath': 'M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z',
    'jscriptview': '0 0 24 24',
    'jscriptpath': 'M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z',
    'chromeview': '0 0 24 24',
    'chromepath': 'M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728Z',
    'edgeview': '0 0 24 24',
    'edgepath': 'M21.86 17.86q.14 0 .25.12.1.13.1.25t-.11.33l-.32.46-.43.53-.44.5q-.21.25-.38.42l-.22.23q-.58.53-1.34 1.04-.76.51-1.6.91-.86.4-1.74.64t-1.67.24q-.9 0-1.69-.28-.8-.28-1.48-.78-.68-.5-1.22-1.17-.53-.66-.92-1.44-.38-.77-.58-1.6-.2-.83-.2-1.67 0-1 .32-1.96.33-.97.87-1.8.14.95.55 1.77.41.82 1.02 1.5.6.68 1.38 1.21.78.54 1.64.9.86.36 1.77.56.92.2 1.8.2 1.12 0 2.18-.24 1.06-.23 2.06-.72l.2-.1.2-.05zm-15.5-1.27q0 1.1.27 2.15.27 1.06.78 2.03.51.96 1.24 1.77.74.82 1.66 1.4-1.47-.2-2.8-.74-1.33-.55-2.48-1.37-1.15-.83-2.08-1.9-.92-1.07-1.58-2.33T.36 14.94Q0 13.54 0 12.06q0-.81.32-1.49.31-.68.83-1.23.53-.55 1.2-.96.66-.4 1.35-.66.74-.27 1.5-.39.78-.12 1.55-.12.7 0 1.42.1.72.12 1.4.35.68.23 1.32.57.63.35 1.16.83-.35 0-.7.07-.33.07-.65.23v-.02q-.63.28-1.2.74-.57.46-1.05 1.04-.48.58-.87 1.26-.38.67-.65 1.39-.27.71-.42 1.44-.15.72-.15 1.38zM11.96.06q1.7 0 3.33.39 1.63.38 3.07 1.15 1.43.77 2.62 1.93 1.18 1.16 1.98 2.7.49.94.76 1.96.28 1 .28 2.08 0 .89-.23 1.7-.24.8-.69 1.48-.45.68-1.1 1.22-.64.53-1.45.88-.54.24-1.11.36-.58.13-1.16.13-.42 0-.97-.03-.54-.03-1.1-.12-.55-.1-1.05-.28-.5-.19-.84-.5-.12-.09-.23-.24-.1-.16-.1-.33 0-.15.16-.35.16-.2.35-.5.2-.28.36-.68.16-.4.16-.95 0-1.06-.4-1.96-.4-.91-1.06-1.64-.66-.74-1.52-1.28-.86-.55-1.79-.89-.84-.3-1.72-.44-.87-.14-1.76-.14-1.55 0-3.06.45T.94 7.55q.71-1.74 1.81-3.13 1.1-1.38 2.52-2.35Q6.68 1.1 8.37.58q1.7-.52 3.58-.52Z',
}

// Define the InfoBanner-Class.
// This extends HTMLElement, which is the base class for all HTML elements.
class BadgeWidgetComponent extends HTMLElement {
    // This static getter returns an array of attribute names to be observed for changes
    static get observedAttributes() {
        return ['iconname','iconcolor','shadow','glossy','linkurl'];
    }
    
    // The constructor method is creating and initializing an object created with a class.
    constructor() {
        // Call the constructor of the parent class (HTMLElement).
        super();
        // Attach a shadow root to the custom element. The 'open' mode means that the
        // shadow root can be accessed from JavaScript outside the shadow root.
        this.attachShadow({ mode: 'open' });
        /* Init the vars for our attributes */
        this.varIconID    = "";
        this.varIconColor = "";
        this.varShadow    = "";
        this.varGlossy    = "";
        this.varLinkURL   = "";
        this.IconPath     = "";
        this.IconView     = "";
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
        this.varIconID    = this.getAttribute('iconname');
        this.varIconColor = this.getAttribute('iconcolor');
        this.varShadow    = this.getAttribute('shadow');
        this.varGlossy    = this.getAttribute('glossy');
        this.varLinkURL   = this.getAttribute('linkurl');
    }

    LoadSVG() {
        // Load the SVG from the global object library, depending on the attribute value of our component
        switch( String(this.varIconID.toLowerCase()) ) {
            case 'github':
                this.IconPath = IconLib.githubpath;
                this.IconView = IconLib.githubview;
                break;
            case 'html':
                this.IconPath = IconLib.htmlpath;
                this.IconView = IconLib.htmlview;
                break;
            case 'css':
                this.IconPath = IconLib.csspath;
                this.IconView = IconLib.cssview;
                break;
            case 'jscript':
                this.IconPath = IconLib.jscriptpath;
                this.IconView = IconLib.jscriptview;
                break;
            case 'chrome':
                this.IconPath = IconLib.chromepath;
                this.IconView = IconLib.chromeview;
                break;
            case 'edge':
                this.IconPath = IconLib.edgepath;
                this.IconView = IconLib.edgeview;
                break;
        }
    }

    // The RenderComponent method will generate
    // the HTML content of the custom element.
    RenderComponent() {
        // Let's pre-load the requested SVG
        this.LoadSVG();

        // Pre-Create the code for the component
        var WebComponentURL = ``;
        var ExtendedCSScode = ``;
        var SVGgraphicsCode = ``;

        // Caller provided an URL, so we have to change a few things
        if( this.varLinkURL ) {
            ExtendedCSScode = `.BadgeWidgetSVGBatchBox:hover { Cursor: Pointer; }`;
            WebComponentURL = `onclick="(function() { window.open('${this.varLinkURL}', '_blank',); })();"`;
        }

        // Caller provided an URL, so we have to change a few things
        if( this.varIconID ) {
            SVGgraphicsCode = `
                <td class="BadgeWidgetTabCellIcon">
                    <svg id="BadgeWidgetSVGiconHTML" class="BadgeWidgetSVGiconClass" xmlns="http://www.w3.org/2000/svg" viewBox="${this.IconView}">
                        <!--
                        THIS IS THE PATH-VALUE OF OUR PNG. YOU CAN EXTRACT IT BY OPENING THE SVG
                        IN AN EDITOR. THEN JUST LOOK FOR THE d="..." AND COPY IT.
                        THEN YOU CLOK FOR THE viewBox="..." AND COPY THIS AS WELL.
                        -->
                        <path d="${this.IconPath}"/>
                    </svg>
                </td>
            `;
        }

        // Set the inner HTML of the shadow root
        this.shadowRoot.innerHTML = `
            <style>
                /* BADGE WIDGET CSS */
                @import 'badge-widget.css';
                /* USER DEFINED CSS */
                ::slotted([slot="badgename"]) {
                    font-family: inherit;
                    font-weight: inherit;
                    font-style: inherit;
                    font-size: inherit;
                    color: inherit;
                }
                ::slotted([slot="badgetext"]) {
                    font-family: inherit;
                    font-weight: inherit;
                    font-style: inherit;
                    font-size: inherit;
                    color: inherit;
                }
                ${ExtendedCSScode}
            </style>
            <div id="BadgeWidgetSVGBatchBox" class="BadgeWidgetSVGBatchBox" ${WebComponentURL}>
                <table class="BadgeWidgetBatchBoxTable" cellspacing="0" cellpadding="0">
                    <tr>
                        ${SVGgraphicsCode}
                        <td class="BadgeWidgetTabCellText">
                            <slot name="badgename"></slot>
                        </td>
                        <td class="BadgeWidgetTabCellInfo">
                            <slot name="badgetext"></slot>
                        </td>
                    </tr>
                </table>
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
        // Validate the color-string
        var regex = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;
        this.iscolor =  regex.test(this.varIconColor);
        // We only need to execute this part, if the caller requested an icon
        if( this.varIconID ) {
            if( this.iscolor == true ) {
                this.shadowRoot.getElementById('BadgeWidgetSVGiconHTML').style.fill = this.varIconColor;
                this.shadowRoot.getElementById('BadgeWidgetSVGiconHTML').style.opacity = 0.90;
            } else {
                this.shadowRoot.getElementById('BadgeWidgetSVGiconHTML').style.fill = "#F3F3F3";
                this.shadowRoot.getElementById('BadgeWidgetSVGiconHTML').style.opacity = 0.80;
            }
        }
        // Update the shadow depending on the value of the component's attribute
        if( this.varShadow.toLowerCase() == "true" ) {
            this.shadowRoot.getElementById('BadgeWidgetSVGBatchBox').style.boxShadow = "4px 4px 8px rgba(0, 0, 0, 0.5)";
        } else {
            this.shadowRoot.getElementById('BadgeWidgetSVGBatchBox').style.boxShadow = "0px 0px 0px rgba(0, 0, 0, 0.0)";
        }
        // Update the glossy effect depending on the value of the component's attribute
        if( this.varGlossy.toLowerCase() == "true" ) {
            this.shadowRoot.getElementById('BadgeWidgetSVGBatchBox').style.backgroundImage = "linear-gradient(to bottom, #ffffff99, #dfdfdf66, #bebebe33, transparent)";
        } else {
            this.shadowRoot.getElementById('BadgeWidgetSVGBatchBox').style.backgroundImage = "none";
        }
    }

    addEventListeners() {
        // RESERVERD FOR LATER USE
    }

}
// Define the new custom element. This line will trigger the constructor
// The first argument is the tag name of the new element.
// The second argument is the class that controls its behavior.
window.customElements.define('badge-widget', BadgeWidgetComponent);