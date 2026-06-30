import { ASSETS, BRAND_NAME, BRAND_TAGLINE_HEADER_LINES } from '../config.js';
import { mainNavLinks } from '../data/navigation.js';
import { escapeHtml } from '../lib/html.js';
import { renderButton } from './ui/button.js';
import { renderContainer } from './ui/container.js';
import { renderIcon } from './ui/icon.js';

function renderHeaderTagline() {
  const lines = BRAND_TAGLINE_HEADER_LINES.map(
    (line, index) =>
      `<span class="site-header__seo-line-part${index === 1 ? ' site-header__seo-line-part--continued' : ''}">${escapeHtml(line)}</span>`,
  );
  return `<span class="site-header__seo-line">${lines.join('')}</span>`;
}

function renderLogo(altClass = 'site-header__logo') {
  return `<img src="${ASSETS.logoHeader}" alt="${escapeHtml(BRAND_NAME)}" class="${altClass}" width="530" height="366" decoding="async" fetchpriority="high" data-logo-fallback="${escapeHtml(ASSETS.logoFallback)}">`;
}

export class PcSiteHeader extends HTMLElement {
  connectedCallback() {
    const navLinks = mainNavLinks
      .map(
        (link) =>
          `<a href="${escapeHtml(link.href)}" class="site-header__nav-link hover-gold">${escapeHtml(link.label)}</a>`,
      )
      .join('');

    const mobileLinks = mainNavLinks
      .map(
        (link) =>
          `<a href="${escapeHtml(link.href)}" class="site-header__mobile-link">${escapeHtml(link.label)}</a>`,
      )
      .join('');

    this.innerHTML = `
      <header class="site-header site-header--at-top" id="navbar">
        ${renderContainer(`
          <div class="site-header__inner">
            <a href="#" class="site-header__brand">
              ${renderLogo()}
              <div class="site-header__brand-text">
                <h1 class="site-header__heading">
                  ${renderHeaderTagline()}
                </h1>
              </div>
            </a>
            <nav class="site-header__nav" aria-label="Principal">
              ${navLinks}
              ${renderButton({
                href: '#processo',
                label: 'Como funciona',
                variant: 'outline',
                size: 'sm',
                external: false,
              })}
            </nav>
            <div class="site-header__menu-btn-wrap">
              <button type="button" id="mobile-menu-button" class="site-header__menu-btn" aria-expanded="false" aria-controls="mobile-menu">
                ${renderIcon('bars', { size: 'xl' })}
                <span class="sr-only">Abrir menu</span>
              </button>
            </div>
          </div>
        `)}
        <div id="mobile-menu" class="site-header__mobile hidden" hidden>
          <div class="site-header__mobile-inner pc-container">
            ${mobileLinks}
            <div class="site-header__mobile-cta">
              ${renderButton({
                href: '#processo',
                label: 'Como funciona',
                variant: 'outline',
                size: 'sm',
                external: false,
                className: 'w-full',
              })}
            </div>
          </div>
        </div>
      </header>
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

customElements.define('pc-site-header', PcSiteHeader);
