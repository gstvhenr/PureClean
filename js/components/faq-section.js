import { faqItems, faqSection } from '../data/faq.js';
import { escapeHtml } from '../lib/html.js';
import { renderContainer } from './ui/container.js';
import { renderSectionHeading } from './ui/section-heading.js';

function renderFaqItem(item, index) {
  return `
    <details class="faq-item">
      <summary class="faq-item__question">
        <span>${escapeHtml(item.question)}</span>
      </summary>
      <div class="faq-item__answer">
        <p>${escapeHtml(item.answer)}</p>
      </div>
    </details>
  `;
}

export class PcFaq extends HTMLElement {
  connectedCallback() {
    const items = faqItems.map(renderFaqItem).join('');

    this.innerHTML = `
      <section id="faq" class="section section--light faq-section">
        ${renderContainer(`
          ${renderSectionHeading({
            eyebrow: faqSection.eyebrow,
            title: faqSection.title,
            subtitle: faqSection.subtitle,
            align: 'left',
          })}
          <div class="faq-list reveal-on-scroll reveal-on-scroll--delay">${items}</div>
        `)}
      </section>
    `;

  }
}

customElements.define('pc-faq', PcFaq);
