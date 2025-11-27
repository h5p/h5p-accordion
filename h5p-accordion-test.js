import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

class AccordionTitle extends HTMLElement {
  static observedAttributes = ['expanded', 'text'];

  get expanded() {
    return this.getAttribute('expanded') === 'true';
  }

  connectedCallback() {
    this.classList.add('h5p-panel-title');

    this.panelButton = document.createElement('button');

    this.panelButton.textContent = this.getAttribute('text') || 'got no title';
    this.panelButton.classList.add('h5p-panel-button');
    
    this.appendChild(this.panelButton);

    this.panelButton.addEventListener('click', () => {
      const event = new CustomEvent('accordion-click', {
        bubbles: true,
        detail: {
          expanded: !this.expanded
        }
      });

      this.dispatchEvent(event);
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'text' && this.panelButton) {
      this.panelButton.textContent = newValue;
    }
    else if (name === 'expanded') {
      this.classList.toggle('h5p-panel-expanded', this.expanded);
      this.setAttribute('aria-expanded', this.expanded);
    }
  }
}

class AccordionContent extends HTMLElement {
  static observedAttributes = ['expanded', 'text'];

  get expanded() {
    return this.getAttribute('expanded') === 'true';
  }

  connectedCallback() {
    this.classList.add('h5p-panel-content', 'hidden');

    this.innerHTML = this.getAttribute('text') || 'doesnt work';
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'text') {
      this.innerHTML = newValue;
    }
    else if (name === 'expanded') {
      this.classList.toggle('hidden', !this.expanded);
    }
  }
}
{/* <h5p-accordion some=JSON.stringify({title: "test"})></h5p-accordion> */}
class AccordionComponent extends HTMLElement {
  static observedAttributes = ['expanded', 'header', 'panelbody'];
  
  constructor() {
    super();
    
    this.titleElement = null;
    this.contentElement = null;
  }

  connectedCallback() {
    this.classList.add('h5p-accordion');

    this.titleElement = document.createElement('h5p-accordion-title');
    this.contentElement = document.createElement('h5p-accordion-content');
    
    this.titleElement.setAttribute('text', this.getAttribute('header'));
    this.contentElement.setAttribute('text', this.getAttribute('panelbody'));

    this.titleElement.setAttribute('expanded', this.getAttribute('expanded'));
    this.contentElement.setAttribute('expanded', this.getAttribute('expanded'));

    this.appendChild(this.titleElement);
    this.appendChild(this.contentElement);

    this.addEventListener('accordion-click', (event) => {
      this.setAttribute('expanded', event.detail.expanded);
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'header' && this.titleElement) {
      this.titleElement.setAttribute('text', newValue);
    }
    else if (name === 'panelbody' && this.contentElement) {
      this.contentElement.setAttribute('text', newValue);
    }
    else if (name === 'expanded' && this.titleElement && this.contentElement) {
      this.titleElement.setAttribute('expanded', newValue);
      this.contentElement.setAttribute('expanded', newValue);
    }
  }
}


// customElements.define("h5p-accordion-title", AccordionTitle);
// customElements.define("h5p-accordion-content", AccordionContent);
// customElements.define("h5p-accordion", AccordionComponent);

{/* <h5p-accordion title="test">
</h5p-accordion>  */}
@customElement('h5p-accordion-title')
export class LitAccordionTitle extends LitElement {
  static properties = {
    expanded: {
      type: Boolean,
      converter: {
        fromAttribute: (value) => {
          return value === 'true';
        },
      }
    },
    text: {}
  };

  constructor() {
    super();
    this.expanded = false;
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    <h2 class="h5p-panel-title ${this.expanded ? 'h5p-panel-expanded' : ''}">
      <button class="h5p-panel-button">${this.text}</button>
    </h2>`;
  }
}
@customElement('h5p-accordion-content')
export class LitAccordionContent extends LitElement {
  createRenderRoot() {
    return this;
  }
  render() {
    return html`<div>hello world</div>`;
  }
}

@customElement('h5p-accordion')
export class LitAccordion extends LitElement {
  static properties = {
    title: { },
    expanded: { type: Boolean },
  };

  constructor() {
    super();
    this.title = "default title";
    this.expanded = false;
    this.classList.add('h5p-accordion');
  }

  createRenderRoot() {
    return this;
  }
  
  render() {
    return html`
      <h5p-accordion-title text="${this.title}" expanded="${this.expanded}"></h5p-accordion-title>
      <h5p-accordion-content></h5p-accordion-content>
    `;
  }
}



export default {};