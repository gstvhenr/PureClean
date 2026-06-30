import { beforeAfterSection } from '../data/beforeAfter.js';
import { siteMedia } from '../data/media.js';
import {
    hasComparePair,
    renderCompareSlider,
} from './ui/compare-slider.js';
import { renderContainer } from './ui/container.js';
import { renderSectionHeading } from './ui/section-heading.js';

const SLOT_COUNT = 4;

/**
 * @param {{ beforeSrc?: string; afterSrc?: string; caption?: string; [key: string]: unknown }} item
 */
function renderBeforeAfterSlot(item) {
  if (hasComparePair(item)) {
    const ariaLabel = item.caption
      ? `Comparar fotografia antes e depois: ${item.caption}`
      : undefined;
    return `
      <div class="before-after__item reveal-on-scroll">
        ${renderCompareSlider({
          beforeSrc: item.beforeSrc,
          afterSrc: item.afterSrc,
          beforeAvifSrc: item.beforeAvifSrc,
          beforeWebpSrc: item.beforeWebpSrc,
          afterAvifSrc: item.afterAvifSrc,
          afterWebpSrc: item.afterWebpSrc,
          width: item.width,
          height: item.height,
          altBefore: item.altBefore,
          altAfter: item.altAfter,
          caption: item.caption,
          className: 'compare-slider--cell',
          ariaLabel,
        })}
      </div>
    `;
  }

  return `
    <div class="before-after__item before-after__item--reserved reveal-on-scroll" aria-hidden="true">
      <div class="before-after__reserved-frame" aria-hidden="true"></div>
    </div>
  `;
}

export class PcBeforeAfter extends HTMLElement {
  connectedCallback() {
    const items = (siteMedia.beforeAfter ?? []).slice(0, SLOT_COUNT);
    while (items.length < SLOT_COUNT) {
      items.push({ id: `ba-slot-${items.length + 1}`, caption: '' });
    }
    const grid = items.map(renderBeforeAfterSlot).join('');

    this.innerHTML = `
      <section id="antes-depois" class="section section--light before-after-section">
        ${renderContainer(`
          ${renderSectionHeading({
            ...beforeAfterSection,
            align: 'left',
          })}
          <div class="before-after__grid grid-4 reveal-stagger">
            ${grid}
          </div>
        `)}
      </section>
    `;
  }
}

customElements.define('pc-before-after', PcBeforeAfter);
