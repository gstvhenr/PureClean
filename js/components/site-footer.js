import {
    ASSETS,
    BRAND_NAME,
    BUSINESS,
    CONTACT,
    WHATSAPP_URL,
} from '../config.js';
import {
    footerBrand,
    footerLegalLinks,
    footerNavLinks,
    footerServiceItems,
    footerSocialLinks,
} from '../data/footer.js';
import { escapeHtml } from '../lib/html.js';
import { renderContainer } from './ui/container.js';
import { renderIcon } from './ui/icon.js';

export class PcSiteFooter extends HTMLElement {
  connectedCallback() {
    const navList = footerNavLinks
      .map(
        (l) =>
          `<li><a href="${escapeHtml(l.href)}" class="site-footer__link">${escapeHtml(l.label)}</a></li>`,
      )
      .join('');

    const servicesList = footerServiceItems
      .map((label) => `<li class="site-footer__text">${escapeHtml(label)}</li>`)
      .join('');

    const legal = footerLegalLinks
      .map(
        (l) =>
          `<a href="${escapeHtml(l.href)}">${escapeHtml(l.label)}</a>`,
      )
      .join('');

    const socialLinks = footerSocialLinks
      .map((item) => {
        const rel = item.external ? ' rel="noopener noreferrer"' : '';
        const target = item.external ? ' target="_blank"' : '';
        return `<a href="${escapeHtml(item.href)}" class="site-footer__social-link site-footer__social-link--${escapeHtml(item.network)}" aria-label="${escapeHtml(item.label)}"${target}${rel}>${renderIcon(item.icon)}</a>`;
      })
      .join('');

    this.innerHTML = `
      <footer class="site-footer">
        ${renderContainer(`
          <div class="site-footer__grid">
            <div>
              <a href="#" class="site-footer__brand-row">
                <img src="${ASSETS.logo}" alt="${escapeHtml(BRAND_NAME)}" class="site-footer__logo" width="64" height="64" loading="lazy" decoding="async" data-logo-fallback="${escapeHtml(ASSETS.logoFallback)}">
                <h2 class="site-footer__brand-name">${escapeHtml(BRAND_NAME)}</h2>
              </a>
              <p class="site-footer__desc">${escapeHtml(footerBrand.description)}</p>
              <p class="site-footer__trust">${escapeHtml(BUSINESS.insurance)} · ${escapeHtml(BUSINESS.guarantee)}</p>
              <div class="site-footer__social">${socialLinks}</div>
            </div>
            <div>
              <h4 class="site-footer__heading">Navegação</h4>
              <ul class="site-footer__list">${navList}</ul>
            </div>
            <div>
              <h4 class="site-footer__heading">Serviços</h4>
              <ul class="site-footer__list">${servicesList}</ul>
            </div>
            <div>
              <h4 class="site-footer__heading">Contacto</h4>
              <ul class="site-footer__list">
                <li class="site-footer__contact-item">
                  ${renderIcon('map-marker-alt', { className: 'site-footer__contact-icon' })}
                  <span class="site-footer__text">Prestamos serviço em<br>${escapeHtml(CONTACT.region)}</span>
                </li>
                <li class="site-footer__contact-item site-footer__contact-item--center">
                  ${renderIcon('whatsapp', { className: 'site-footer__contact-icon' })}
                  <a href="${WHATSAPP_URL}" class="site-footer__link" target="_blank" rel="noopener noreferrer">${escapeHtml(CONTACT.phone)}</a>
                </li>
                <li class="site-footer__contact-item site-footer__contact-item--center">
                  ${renderIcon('instagram', { className: 'site-footer__contact-icon' })}
                  <a href="${CONTACT.instagramHref}" class="site-footer__link">${escapeHtml(CONTACT.instagram)}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="site-footer__bottom">
            <p class="site-footer__copy">&copy; ${new Date().getFullYear()} ${escapeHtml(BRAND_NAME)}, limpeza em Lisboa. Todos os direitos reservados.</p>
            <div class="site-footer__legal">${legal}</div>
          </div>
        `)}
      </footer>
    `;

    this.querySelectorAll('img[data-logo-fallback]').forEach((img) => {
      img.addEventListener(
        'error',
        () => {
          const fallback = img.getAttribute('data-logo-fallback');
          if (fallback) img.src = fallback;
        },
        { once: true },
      );
    });
  }
}

customElements.define('pc-site-footer', PcSiteFooter);
