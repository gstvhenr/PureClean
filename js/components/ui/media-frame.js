import { escapeHtml } from '../../lib/html.js';

/**
 * @param {{
 *   src?: string;
 *   avifSrc?: string;
 *   webpSrc?: string;
 *   videoSrc?: string;
 *   posterSrc?: string;
 *   width?: number;
 *   height?: number;
 *   alt: string;
 *   decorative?: boolean;
 *   variant?: 'hero' | 'about' | 'before-after';
 *   className?: string;
 * }} opts
 */
export function renderMediaFrame(opts) {
  const {
    src = '',
    avifSrc = '',
    webpSrc = '',
    videoSrc = '',
    posterSrc = '',
    width,
    height,
    alt,
    decorative = false,
    variant = 'about',
    className = '',
  } = opts;
  const hasVideo = Boolean(videoSrc?.trim());
  const hasImage = Boolean(src?.trim());
  const variantClass = `media-frame--${variant}`;
  const extra = className ? ` ${className}` : '';

  const corners = `
    <span class="media-frame__corner media-frame__corner--tl" aria-hidden="true"></span>
    <span class="media-frame__corner media-frame__corner--br" aria-hidden="true"></span>
  `;

  if (hasVideo) {
    const dimensions =
      Number.isFinite(width) && Number.isFinite(height)
        ? ` width="${width}" height="${height}"`
        : '';
    const posterAttr = posterSrc
      ? ` poster="${escapeHtml(posterSrc)}"`
      : '';
    const a11yAttr = decorative
      ? ' aria-hidden="true"'
      : ` aria-label="${escapeHtml(alt)}"`;
    const body = `
      <video
        class="media-frame__video media-frame__video--hero"
        src="${escapeHtml(videoSrc)}"${posterAttr}${dimensions}
        autoplay muted loop playsinline disablepictureinpicture
        preload="metadata"${a11yAttr}></video>
    `;

    return `
      <figure class="media-frame ${variantClass}${extra}">
        ${body}
        ${corners}
      </figure>
    `;
  }

  if (hasImage) {
    const isHero = variant === 'hero';
    const imgAttrs = isHero
      ? 'loading="eager" fetchpriority="high" decoding="async"'
      : 'loading="lazy" decoding="async"';
    const imgClass = isHero
      ? 'media-frame__img media-frame__img--hero-full'
      : 'media-frame__img';
    const dimensions =
      Number.isFinite(width) && Number.isFinite(height)
        ? ` width="${width}" height="${height}"`
        : '';
    const sources = [
      avifSrc
        ? `<source srcset="${escapeHtml(avifSrc)}" type="image/avif">`
        : '',
      webpSrc
        ? `<source srcset="${escapeHtml(webpSrc)}" type="image/webp">`
        : '',
    ].join('');
    const body = `
      <picture>
        ${sources}
        <img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" class="${imgClass}"${dimensions} ${imgAttrs}>
      </picture>
    `;

    return `
      <figure class="media-frame ${variantClass}${extra}">
        ${body}
        ${corners}
      </figure>
    `;
  }

  return `
    <figure class="media-frame media-frame--placeholder ${variantClass}${extra}" aria-label="${escapeHtml(alt)}">
      <div class="media-frame__surface" aria-hidden="true"></div>
      ${corners}
    </figure>
  `;
}
