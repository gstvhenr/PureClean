import { escapeHtml } from '../../lib/html.js';

/** @typedef {'sm' | 'md' | 'lg' | 'xl'} IconSize */

/** Ícones de marca / preenchidos (resto usa traço Lucide). */
const FILLED_ICON_IDS = new Set([
  'whatsapp',
  'instagram',
  'facebook-f',
  'star',
]);

/**
 * Normaliza identificadores legados (`fa-couch`, `fab fa-whatsapp text-xl`).
 * @param {string} raw
 */
export function normalizeIconName(raw) {
  if (!raw) return '';
  const token = raw.split(/\s+/).find((part) => part.startsWith('fa-') && part !== 'fa-xs');
  if (token) {
    const id = token.replace(/^fa-/, '');
    if (id === 'shipping-fast') return 'bolt';
    return id;
  }
  return raw.trim();
}

/**
 * @param {string} name
 * @param {{ size?: IconSize; className?: string }} [opts]
 */
export function renderIcon(name, opts = {}) {
  const { size = 'md', className = '' } = opts;
  const id = normalizeIconName(name);
  if (!id) return '';
  const extra = className ? ` ${className}` : '';
  const variant = FILLED_ICON_IDS.has(id) ? 'fill' : 'stroke';
  return `<svg class="pc-icon pc-icon--${size} pc-icon--${variant}${extra}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="assets/icons.svg#${escapeHtml(id)}"></use></svg>`;
}
