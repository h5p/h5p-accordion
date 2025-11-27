class AccordionTitle extends HTMLElement {
  static observedAttributes = ['expanded', 'text'];

  get expanded() {
    return this.getAttribute('expanded') === 'true';
  }

  connectedCallback() {
    this.classList.add('h5p-panel-title');

    this.panelButton = document.createElement('button');

    console.log('this.text: ', this.text);
    this.panelButton.textContent = this.getAttribute('text') || 'got no title';
    this.panelButton.classList.add('h5p-panel-button');
    
    this.appendChild(this.panelButton);

    this.panelButton.addEventListener('click', () => {
      console.log('clicked');
      const event = new CustomEvent('accordion-click', {
        bubbles: true,
        detail: {
          expanded: !this.expanded
        }
      });
      console.log('event: ', this.expanded);
      this.dispatchEvent(event);
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'text' && this.panelButton) {
      this.panelButton.textContent = newValue;
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
    console.log('oldValue, newValue: ', oldValue, newValue);
    if (name === 'text') {
      this.innerHTML = newValue;
    }
    else if (name === 'expanded') {
      this.classList.toggle('hidden', !this.expanded);
    }
  }
}

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
      console.log('accordion-click: ', event.detail);
      this.setAttribute('expanded', event.detail.expanded);
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`${name}: , ${oldValue}, ${newValue}`);
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


customElements.define("h5p-accordion-title", AccordionTitle);
customElements.define("h5p-accordion-content", AccordionContent);
customElements.define("h5p-accordion", AccordionComponent);

{/* <h5p-accordion title="test">
</h5p-accordion>  */}