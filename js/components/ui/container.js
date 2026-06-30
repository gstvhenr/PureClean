export function renderContainer(innerHtml, className = '') {
  return `<div class="pc-container ${className}">${innerHtml}</div>`;
}

export class PcContainer extends HTMLElement {
  connectedCallback() {
    const className = this.getAttribute('class') ?? '';
    this.outerHTML = renderContainer(this.innerHTML, className);
  }
}

customElements.define('pc-container', PcContainer);
