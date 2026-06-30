import { WHATSAPP_MESSAGES, whatsappLink } from '../config.js';
import { escapeHtml } from '../lib/html.js';
import { renderIcon } from './ui/icon.js';

const FAB_LABEL = 'Pedir orçamento no WhatsApp';

export class PcWhatsappFab extends HTMLElement {
  connectedCallback() {
    const href = whatsappLink(WHATSAPP_MESSAGES.quote);

    this.innerHTML = `
      <a
        href="${escapeHtml(href)}"
        class="whatsapp-fab whatsapp-cta-surface"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="${escapeHtml(FAB_LABEL)}"
      >
        ${renderIcon('whatsapp', { size: 'xl' })}
        <span class="sr-only">${escapeHtml(FAB_LABEL)}</span>
      </a>
    `;
  }
}

customElements.define('pc-whatsapp-fab', PcWhatsappFab);
