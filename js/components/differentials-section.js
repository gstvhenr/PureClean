import { differentials, differentialsSection } from '../data/differentials.js';
import { renderContainer } from './ui/container.js';
import { renderFeatureItem } from './ui/feature-item.js';
import { renderSectionHeading } from './ui/section-heading.js';

export class PcDifferentials extends HTMLElement {
  connectedCallback() {
    const items = differentials.map((d) => renderFeatureItem(d)).join('');

    this.innerHTML = `
      <section id="diferenciais" class="section section--dark differentials-section">
        ${renderContainer(`
          <div class="differentials__layout section--dark__content">
            <div class="differentials__intro">
              ${renderSectionHeading({
                ...differentialsSection,
                align: 'left',
              })}
            </div>
            <div class="differentials__list reveal-on-scroll reveal-on-scroll--delay">${items}</div>
          </div>
        `)}
      </section>
    `;
  }
}

customElements.define('pc-differentials', PcDifferentials);
