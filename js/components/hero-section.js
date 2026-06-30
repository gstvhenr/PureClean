import { initHeroVideos } from '../behaviors/hero-video.js';
import { WHATSAPP_MESSAGES, whatsappLink } from '../config.js';
import { heroContent } from '../data/about.js';
import { siteMedia } from '../data/media.js';
import { escapeHtml } from '../lib/html.js';
import { renderButton } from './ui/button.js';
import { renderContainer } from './ui/container.js';
import { renderIcon } from './ui/icon.js';
import { renderMediaFrame } from './ui/media-frame.js';

function renderTrustPoints(points) {
  if (!points?.length) return '';
  const items = points
    .map(
      (point) => `
        <div class="hero__trust-item" role="listitem">
          <span class="hero__trust-icon">${renderIcon(point.icon, { size: 'md' })}</span>
          <div class="hero__trust-copy">
            <strong class="hero__trust-title">${escapeHtml(point.title)}</strong>
            <span class="hero__trust-label">${escapeHtml(point.label)}</span>
          </div>
        </div>
      `,
    )
    .join('');

  return `<div class="hero__trust hero__motion-group hero__motion-group--3" role="list">${items}</div>`;
}

export class PcHero extends HTMLElement {
  connectedCallback() {
    const heroMedia = siteMedia.hero;

    this.innerHTML = `
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero__gradient" aria-hidden="true"></div>
        ${renderContainer(`
          <div class="hero__layout">
            <div class="hero__content">
              <div class="hero__intro hero__motion-group hero__motion-group--1">
                <span class="hero__eyebrow">${escapeHtml(heroContent.eyebrow)}</span>
                <h2 id="hero-title" class="hero__title">${heroContent.titleHtml}</h2>
                <p class="hero__lead">${escapeHtml(heroContent.lead)}</p>
              </div>
              <div class="hero__actions hero__motion-group hero__motion-group--2">
                ${renderButton({
                  href: whatsappLink(WHATSAPP_MESSAGES.quote),
                  label: 'Orçamento rápido',
                  variant: 'whatsapp',
                  size: 'sm',
                  icon: 'whatsapp',
                  iconSize: 'md',
                })}
                ${renderButton({
                  href: '#servicos',
                  label: 'Conhecer serviços',
                  variant: 'outline',
                  size: 'sm',
                  external: false,
                })}
              </div>
              ${renderTrustPoints(heroContent.trustPoints)}
            </div>
            <div class="hero__visual">
              ${renderMediaFrame({
                videoSrc: heroMedia.videoSrc,
                posterSrc: heroMedia.posterSrc,
                width: heroMedia.width,
                height: heroMedia.height,
                alt: heroMedia.alt,
                decorative: heroMedia.decorative,
                variant: 'hero',
                className: 'hero__media',
              })}
            </div>
          </div>
        `)}
      </section>
    `;
    initHeroVideos(this);
  }
}

customElements.define('pc-hero', PcHero);
