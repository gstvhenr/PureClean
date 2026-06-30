import { escapeHtml } from '../../lib/html.js';
import { renderIcon } from './icon.js';

/**
 * @param {{ icon: string; title: string; description: string }} item
 */
export function renderFeatureItem(item) {
  return `
    <article class="feature-item">
      ${renderIcon(item.icon, { size: 'lg', className: 'feature-item__icon' })}
      <div class="feature-item__copy">
        <h3 class="feature-item__title">${escapeHtml(item.title)}</h3>
        <p class="feature-item__text">${escapeHtml(item.description)}</p>
      </div>
    </article>
  `;
}

export class PcFeatureItem extends HTMLElement {
  connectedCallback() {
    const icon = this.getAttribute('icon') ?? '';
    const title = this.getAttribute('title') ?? '';
    const description = this.getAttribute('description') ?? '';
    this.innerHTML = renderFeatureItem({ icon, title, description });
  }
}

customElements.define('pc-feature-item', PcFeatureItem);
