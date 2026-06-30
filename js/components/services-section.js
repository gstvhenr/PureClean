import { services, servicesSection } from '../data/services.js';
import { renderContainer } from './ui/container.js';
import { renderIcon } from './ui/icon.js';
import { renderSectionHeading } from './ui/section-heading.js';
import { renderServiceCard } from './ui/service-card.js';

export class PcServices extends HTMLElement {
  connectedCallback() {
    const cards = services.map((s) => renderServiceCard(s)).join('');

    this.innerHTML = `
      <section id="servicos" class="section section--light">
        ${renderContainer(`
          ${renderSectionHeading({
            ...servicesSection,
            align: 'left',
          })}
          <div class="grid-4 reveal-stagger">${cards}</div>
          <div class="services-section__footer">
            <a href="#processo" class="link-arrow">
              Saber como pedir orçamento ${renderIcon('arrow-right', { size: 'sm' })}
            </a>
          </div>
        `)}
      </section>
    `;
  }
}

customElements.define('pc-services', PcServices);
