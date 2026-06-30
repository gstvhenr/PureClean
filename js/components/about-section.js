import { aboutContent } from '../data/about.js';
import { siteMedia } from '../data/media.js';
import { escapeHtml } from '../lib/html.js';
import { renderContainer } from './ui/container.js';
import { renderMediaFrame } from './ui/media-frame.js';

export class PcAbout extends HTMLElement {
  connectedCallback() {
    const stats = aboutContent.stats
      .map(
        (stat, i) => `
        ${i > 0 ? '<div class="stat-divider" aria-hidden="true"></div>' : ''}
        <div class="stat-block">
          <span class="stat-block__value">${escapeHtml(stat.value)}</span>
          <span class="stat-block__label">${escapeHtml(stat.label)}</span>
        </div>
      `,
      )
      .join('');

    const paragraphs = aboutContent.paragraphs.map((p) => `<p class="about__text">${p}</p>`).join('');

    const gallery = siteMedia.aboutGallery
      .map((item, index) =>
        renderMediaFrame({
          src: item.src,
          avifSrc: item.avifSrc,
          webpSrc: item.webpSrc,
          width: item.width,
          height: item.height,
          alt: item.alt,
          variant: 'about',
          className: `about__gallery-item about__gallery-item--${index + 1}`,
        }),
      )
      .join('');

    this.innerHTML = `
      <section id="sobre" class="section section--white">
        ${renderContainer(`
          <div class="about__layout">
            <div class="about__gallery grid-2 reveal-on-scroll">${gallery}</div>
            <div class="about__content reveal-on-scroll reveal-on-scroll--delay">
              <span class="section-heading__eyebrow">${escapeHtml(aboutContent.eyebrow)}</span>
              <h2 class="about__title">${aboutContent.titleHtml}</h2>
              ${paragraphs}
              <div class="stats-row">${stats}</div>
            </div>
          </div>
        `)}
      </section>
    `;
  }
}

customElements.define('pc-about', PcAbout);
