import { WHATSAPP_MESSAGES, whatsappLink } from '../config.js';
import { ctaBanner } from '../data/about.js';
import { escapeHtml } from '../lib/html.js';
import { renderButton } from './ui/button.js';
import { renderContainer } from './ui/container.js';
import { renderIcon } from './ui/icon.js';

export class PcCtaBanner extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="section section--gold cta-banner-section">
        ${renderContainer(`
          <div class="cta-banner__inner reveal-on-scroll">
            <h2 class="cta-banner__title">${escapeHtml(ctaBanner.title)}</h2>
            ${
              ctaBanner.text
                ? `<p class="cta-banner__text">${escapeHtml(ctaBanner.text)}</p>`
                : ''
            }
            ${renderButton({
              href: whatsappLink(WHATSAPP_MESSAGES.discount),
              label: ctaBanner.buttonLabel,
              variant: 'whatsapp',
              size: 'md',
              icon: 'whatsapp',
              iconSize: 'lg',
            })}
            ${
              ctaBanner.note
                ? `<p class="cta-banner__note">${renderIcon('shield-check', { size: 'sm' })} ${escapeHtml(ctaBanner.note)}</p>`
                : ''
            }
          </div>
        `, '')}
      </section>
    `;
  }
}

customElements.define('pc-cta-banner', PcCtaBanner);
