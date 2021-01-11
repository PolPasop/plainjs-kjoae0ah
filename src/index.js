import data from './data.js';

const template = document.createElement("template");
const digitalCartographyTemplate = document.createElement("template");

digitalCartographyTemplate.innerHTML = /*html*/`
  <style>
    :host {
      
    }

    ul li {
      color: var(--color, purple);
    }
  </style>
  <h1>Digital Cartography</h1>

  <ul>
    
    ${data.map(service => 
      `<li>
          <a href="${service.url}">${service.name}</a>
      </li>`
    ).join('')}
  </ul>

  <svg width="235" height="235" viewBox="0 0 235 235" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="117.429" cy="117.524" r="116.994" fill="#C4C4C4"/>
  </svg>

`;

template.innerHTML = /*html*/`
  <style>
    * {
      font-size: 200%;
    }

    span {
      width: 4rem;
      display: inline-block;
      text-align: center;
    }

    button {
      width: 4rem;
      height: 4rem;
      border: none;
      border-radius: 10px;
      background-color: seagreen;
      color: white;
    }
  </style>
  <button id="dec">-</button>
  <span id="count"></span>
  <button id="inc">+</button>`;

class CorDigitalCartography extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.appendChild(digitalCartographyTemplate.content.cloneNode(true));
  }
}

customElements.define("cor-digital-cartography", CorDigitalCartography);

class MyCounter extends HTMLElement {
  constructor() {
    super();
    this.count = 0;
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.getElementById("inc").onclick = () => this.inc();
    this.shadowRoot.getElementById("dec").onclick = () => this.dec();
    this.update(this.count);
  }

  inc() {
    this.update(++this.count);
  }

  dec() {
    this.update(--this.count);
  }

  update(count) {
    this.shadowRoot.getElementById("count").innerHTML = count;
  }
}

customElements.define("my-counter", MyCounter);
