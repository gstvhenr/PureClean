import { WHATSAPP_MESSAGES, whatsappLink } from '../config.js';
import { renderButton } from './ui/button.js';

export class PcStickyQuote extends HTMLElement {
  connectedCallback() {
    this.classList.add('sticky-quote');
    this.setAttribute('aria-hidden', 'true');

    this.innerHTML = `
      <div class="sticky-quote__inner">
        ${renderButton({
          href: whatsappLink(WHATSAPP_MESSAGES.quote),
          label: 'Orçamento rápido',
          variant: 'whatsapp',
          size: 'sm',
          icon: 'whatsapp',
          iconSize: 'md',
          className: 'sticky-quote__btn',
        })}
      </div>
    `;
  }
}

customElements.define('pc-sticky-quote', PcStickyQuote);
