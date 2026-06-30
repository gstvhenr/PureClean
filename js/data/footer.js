import { mainNavLinks } from './navigation.js';

import { CONTACT, WHATSAPP_URL } from '../config.js';

export const footerBrand = {
  description:
    'Limpeza em Lisboa e Margem Sul: limpezas em casa, estofos, escritórios e urgências. Com seguro de responsabilidade civil.',
};

export const footerNavLinks = mainNavLinks.map((link) => ({
  href: link.href,
  label: link.label,
}));

export const footerServiceItems = [
  'Estofos e tapetes',
  'Impermeabilização',
  'Limpezas em casa',
  'Escritórios e lojas',
  'Limpezas urgentes',
];

export const footerLegalLinks = [
  { href: '/termos.html', label: 'Termos de Serviço' },
  { href: '/privacidade.html', label: 'Política de Privacidade' },
];

/** Ordem: WhatsApp → Instagram → Facebook (rodapé, ícones em cores oficiais). */
export const footerSocialLinks = [
  {
    network: 'whatsapp',
    icon: 'whatsapp',
    label: 'WhatsApp',
    href: WHATSAPP_URL,
    external: true,
  },
  {
    network: 'instagram',
    icon: 'instagram',
    label: 'Instagram',
    href: CONTACT.instagramHref,
    external: false,
  },
  {
    network: 'facebook',
    icon: 'facebook-f',
    label: 'Facebook',
    href: CONTACT.facebookHref,
    external: false,
  },
];
