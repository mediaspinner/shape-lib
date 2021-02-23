const template = document.createElement("template");
template.innerHTML = "HelloWorld";

class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({
      mode: "open",
    });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
window.customElements.define("hello-world", HelloWorld);
