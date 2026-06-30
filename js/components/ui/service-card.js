import { escapeHtml } from '../../lib/html.js';
import { renderIcon } from './icon.js';

/**
 * @param {{ icon: string; title: string; description: string }} item
 */
export function renderServiceCard(item) {
  return `
    <article class="card-service reveal-on-scroll">
      <div class="card-service__icon-wrap">
        ${renderIcon(item.icon, { size: 'md', className: 'card-service__icon' })}
      </div>
      <h3 class="card-service__title">${escapeHtml(item.title)}</h3>
      <p class="card-service__text">${escapeHtml(item.description)}</p>
    </article>
  `;
}

export class PcServiceCard extends HTMLElement {
  connectedCallback() {
    const icon = this.getAttribute('icon') ?? '';
    const title = this.getAttribute('title') ?? '';
    const description = this.getAttribute('description') ?? '';
    this.innerHTML = renderServiceCard({ icon, title, description });
  }
}

customElements.define('pc-service-card', PcServiceCard);
