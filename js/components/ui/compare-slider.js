import { escapeHtml } from '../../lib/html.js';

/**
 * @param {{
 *   beforeSrc: string;
 *   afterSrc: string;
 *   beforeAvifSrc?: string;
 *   beforeWebpSrc?: string;
 *   afterAvifSrc?: string;
 *   afterWebpSrc?: string;
 *   width?: number;
 *   height?: number;
 *   altBefore: string;
 *   altAfter: string;
 *   caption?: string;
 *   className?: string;
 *   ariaLabel?: string;
 * }} opts
 */
export function renderCompareSlider(opts) {
  const {
    beforeSrc,
    afterSrc,
    beforeAvifSrc = '',
    beforeWebpSrc = '',
    afterAvifSrc = '',
    afterWebpSrc = '',
    width,
    height,
    altBefore,
    altAfter,
    caption = '',
    className = '',
    ariaLabel = 'Comparar fotografia antes e depois da limpeza',
  } = opts;

  if (!beforeSrc?.trim() || !afterSrc?.trim()) {
    return '';
  }

  const dimensions =
    Number.isFinite(width) && Number.isFinite(height)
      ? ` width="${width}" height="${height}"`
      : '';

  const renderPicture = (src, avif, webp, alt) => {
    const sources = [
      avif ? `<source srcset="${escapeHtml(avif)}" type="image/avif">` : '',
      webp ? `<source srcset="${escapeHtml(webp)}" type="image/webp">` : '',
    ].join('');
    return `
      <picture>
        ${sources}
        <img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" class="compare-slider__img"${dimensions} loading="lazy" decoding="async">
      </picture>
    `;
  };

  const extra = className ? ` ${escapeHtml(className)}` : '';
  const captionHtml = caption
    ? `<figcaption class="compare-slider__caption">${escapeHtml(caption)}</figcaption>`
    : '';

  const aspectRatio =
    Number.isFinite(width) &&
    Number.isFinite(height) &&
    height > 0
      ? `${width} / ${height}`
      : '';
  const figureStyle = aspectRatio
    ? `--compare-pct: 50; --compare-aspect-ratio: ${aspectRatio}`
    : '--compare-pct: 50';

  return `
    <figure class="compare-slider${extra}" style="${figureStyle}">
      <div class="compare-slider__stage">
        <div class="compare-slider__labels compare-slider__labels--overlay" aria-hidden="true">
          <span class="compare-slider__label compare-slider__label--before">Antes</span>
          <span class="compare-slider__label compare-slider__label--after">Depois</span>
        </div>
        <div class="compare-slider__layer compare-slider__layer--before">
          ${renderPicture(beforeSrc, beforeAvifSrc, beforeWebpSrc, altBefore)}
        </div>
        <div class="compare-slider__layer compare-slider__layer--after">
          ${renderPicture(afterSrc, afterAvifSrc, afterWebpSrc, altAfter)}
        </div>
        <div class="compare-slider__handle" aria-hidden="true"></div>
        <input
          type="range"
          class="compare-slider__input"
          min="0"
          max="100"
          value="50"
          aria-label="${escapeHtml(ariaLabel)}"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow="50"
          aria-valuetext="Metade antes, metade depois"
        />
      </div>
      ${captionHtml}
    </figure>
  `;
}

/**
 * @param {{ beforeSrc?: string; afterSrc?: string }} item
 */
export function hasComparePair(item) {
  return Boolean(item.beforeSrc?.trim() && item.afterSrc?.trim());
}
