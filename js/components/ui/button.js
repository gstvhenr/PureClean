import { escapeHtml } from '../../lib/html.js';
import { normalizeIconName, renderIcon } from './icon.js';

/**
 * @param {{ href: string; label: string; variant?: string; size?: string; icon?: string; iconSize?: string; className?: string; external?: boolean }} opts
 */
export function renderButton(opts) {
  const {
    href,
    label,
    variant = 'primary',
    size = 'md',
    icon = '',
    iconSize = 'lg',
    className = '',
    external = true,
  } = opts;

  const variantClass = {
    primary: 'btn--primary',
    outline: 'btn--outline',
    'primary-on-gold': 'btn--primary-on-gold',
    'hero-primary': 'btn--primary btn--hero-primary',
    whatsapp: 'btn--whatsapp whatsapp-cta-surface',
    dark: 'btn--dark',
    'nav-cta': 'btn--nav-cta',
  }[variant] ?? 'btn--primary';

  const sizeClass = {
    sm: 'btn--sm',
    md: 'btn--md',
    lg: 'btn--lg',
  }[size] ?? 'btn--md';

  const iconHtml = icon ? renderIcon(normalizeIconName(icon), { size: iconSize }) : '';
  const rel = external ? ' rel="noopener noreferrer"' : '';
  const target = external ? ' target="_blank"' : '';

  return `<a href="${escapeHtml(href)}" class="btn ${variantClass} ${sizeClass} ${escapeHtml(className)}"${target}${rel}>${iconHtml}${escapeHtml(label)}</a>`;
}

export class PcButton extends HTMLElement {
  connectedCallback() {
    const href = this.getAttribute('href') ?? '#';
    const label = this.getAttribute('label') ?? '';
    const variant = this.getAttribute('variant') ?? 'primary';
    const size = this.getAttribute('size') ?? 'md';
    const icon = this.getAttribute('icon') ?? '';
    const external = this.hasAttribute('external');

    this.innerHTML = renderButton({
      href,
      label,
      variant,
      size,
      icon,
      external,
    });
  }
}

customElements.define('pc-button', PcButton);
