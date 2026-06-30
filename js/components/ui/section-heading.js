import { escapeHtml } from '../../lib/html.js';

/**
 * @param {{ eyebrow?: string; title: string; subtitle?: string; align?: 'left' | 'center' }} opts
 */
export function renderSectionHeading(opts) {
  const { eyebrow = '', title, subtitle = '', align = 'left' } = opts;
  const alignClass = align === 'center' ? 'section-heading--center' : '';

  const eyebrowHtml = eyebrow
    ? `<span class="section-heading__eyebrow">${escapeHtml(eyebrow)}</span>`
    : '';
  const subtitleHtml = subtitle
    ? `<p class="section-heading__subtitle">${escapeHtml(subtitle)}</p>`
    : '';

  return `
    <header class="section-heading reveal-on-scroll${alignClass ? ` ${alignClass}` : ''}">
      ${eyebrowHtml}
      <h2 class="section-heading__title">${title}</h2>
      ${subtitleHtml}
    </header>
  `;
}

export class PcSectionHeading extends HTMLElement {
  connectedCallback() {
    const eyebrow = this.getAttribute('eyebrow') ?? '';
    const title = this.getAttribute('title') ?? '';
    const subtitle = this.getAttribute('subtitle') ?? '';
    const align = this.getAttribute('align') ?? 'left';

    this.innerHTML = renderSectionHeading({ eyebrow, title, subtitle, align });
  }
}

customElements.define('pc-section-heading', PcSectionHeading);
