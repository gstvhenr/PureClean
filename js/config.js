export const BRAND_NAME = 'PureClean';
/** Linha de posicionamento no header (visível no H1). */
export const BRAND_TAGLINE = 'Limpeza em Lisboa e Margem Sul';
/** Quebra editorial do H1 no header (duas linhas). */
export const BRAND_TAGLINE_HEADER_LINES = ['Limpeza em Lisboa', 'e Margem Sul.'];
export const SITE_TITLE =
  'Limpeza de estofos e limpezas domésticas em Lisboa e Margem Sul | PureClean';
export const SITE_DESCRIPTION =
  'PureClean: estofos, tapetes, limpezas em casa, escritórios e urgências na Grande Lisboa e Margem Sul. Orçamento no WhatsApp antes de marcar.';

/** URL canónica em produção (HTTPS, sem barra final). Fonte de verdade — correr `npm run seo:sync`. */
export const SITE_ORIGIN = 'https://purecleanpt.online';

export const SEO = {
  locale: 'pt_PT',
  ogImage: '/assets/brand/logo.png',
  twitterCard: 'summary_large_image',
};

/** Dados da entidade (E-E-A-T). Preencher NIF/morada quando disponíveis. */
export const BUSINESS = {
  legalName: 'PureClean',
  nif: '',
  serviceArea: 'Lisboa e Margem Sul',
  priceRange: '€€',
  guarantee: '24 horas após o serviço para nos contactar se algo não estiver como combinado',
  insurance: 'Seguro de responsabilidade civil',
};

export const WHATSAPP_URL = 'https://wa.me/351960012634';

export const WHATSAPP_MESSAGES = {
  quote: 'Olá, gostaria de um orçamento de limpeza em Lisboa.',
  discount: 'Olá, gostaria de aproveitar os 15% de desconto na primeira limpeza!',
};

export function whatsappLink(message) {
  const text = encodeURIComponent(message);
  return `${WHATSAPP_URL}?text=${text}`;
}

export const CONTACT = {
  region: 'Lisboa e Margem Sul',
  phone: '+351 960 012 634',
  phoneHref: WHATSAPP_URL,
  instagram: '@pureclean_pt',
  instagramHref: '#',
  facebookHref: '#',
  email: '',
};

/** Marca estática. Fotografia da landing: `js/data/media.js` → `siteMedia`. */
export const ASSETS = {
  logo: 'assets/brand/logo.svg',
  logoHeader: 'assets/brand/logo-transparent.svg',
  logoFallback: 'assets/brand/logo-fallback.svg',
};
