/**
 * Fonte de verdade SEO: js/config.js + js/data/faq.js
 * Atualiza sitemap, robots, meta/JSON-LD em index.html e canonical nas páginas legais.
 * Executar: npm run seo:sync
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEO, SITE_DESCRIPTION, SITE_ORIGIN, SITE_TITLE } from '../js/config.js';
import { faqItems } from '../js/data/faq.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const origin = SITE_ORIGIN.replace(/\/$/, '');
const ogImage = `${origin}${SEO.ogImage}`;

function replaceBetween(content, start, end, replacement) {
  const pattern = new RegExp(
    `${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`,
    'm',
  );
  if (!pattern.test(content)) {
    throw new Error(`Marcadores SEO não encontrados: ${start}`);
  }
  return content.replace(pattern, `${start}\n${replacement}\n${end}`);
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildHeadBlock() {
  return `  <title>${SITE_TITLE}</title>
  <meta name="description" content="${SITE_DESCRIPTION}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="#203240">
  <link rel="canonical" href="${origin}/">

  <meta property="og:type" content="website">
  <meta property="og:locale" content="${SEO.locale}">
  <meta property="og:site_name" content="PureClean">
  <meta property="og:title" content="${SITE_TITLE}">
  <meta property="og:description" content="${SITE_DESCRIPTION}">
  <meta property="og:url" content="${origin}/">
  <meta property="og:image" content="${ogImage}">

  <meta name="twitter:card" content="${SEO.twitterCard}">
  <meta name="twitter:title" content="${SITE_TITLE}">
  <meta name="twitter:description" content="${SITE_DESCRIPTION}">
  <meta name="twitter:image" content="${ogImage}">`;
}

function buildJsonLd() {
  const faqEntity = {
    '@type': 'FAQPage',
    '@id': `${origin}/#faq`,
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${origin}/#empresa`,
        name: 'PureClean',
        description: SITE_DESCRIPTION,
        url: `${origin}/`,
        image: ogImage,
        telephone: '+351960012634',
        priceRange: '€€',
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Lisboa e Margem Sul',
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lisboa',
          addressCountry: 'PT',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Serviços de limpeza em Lisboa e Margem Sul',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: 'Limpeza de estofos e tapetes' },
            },
            {
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: 'Limpezas domésticas' },
            },
            {
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: 'Limpeza de escritórios' },
            },
            {
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: 'Limpeza urgente' },
            },
          ],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        url: `${origin}/`,
        name: 'PureClean',
        description: 'Limpeza profissional em Lisboa e Margem Sul',
        inLanguage: 'pt-PT',
        publisher: { '@id': `${origin}/#empresa` },
      },
      faqEntity,
    ],
  };

  const json = JSON.stringify(graph, null, 2)
    .split('\n')
    .map((line) => `  ${line}`)
    .join('\n');
  return `  <script type="application/ld+json">\n${json}\n  </script>`;
}

const urls = [
  { loc: `${origin}/`, priority: '1.0', changefreq: 'weekly' },
  { loc: `${origin}/privacidade.html`, priority: '0.3', changefreq: 'yearly' },
  { loc: `${origin}/termos.html`, priority: '0.3', changefreq: 'yearly' },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;

fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap, 'utf8');
fs.writeFileSync(path.join(root, 'robots.txt'), robots, 'utf8');
fs.writeFileSync(path.join(root, 'public', 'robots.txt'), robots, 'utf8');

let indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
indexHtml = replaceBetween(
  indexHtml,
  '<!-- seo:sync-head -->',
  '<!-- /seo:sync-head -->',
  buildHeadBlock(),
);
indexHtml = replaceBetween(
  indexHtml,
  '<!-- seo:sync-jsonld -->',
  '<!-- /seo:sync-jsonld -->',
  buildJsonLd(),
);
fs.writeFileSync(path.join(root, 'index.html'), indexHtml, 'utf8');

for (const file of ['privacidade.html', 'termos.html']) {
  const filePath = path.join(root, file);
  let html = fs.readFileSync(filePath, 'utf8');
  html = replaceBetween(
    html,
    '<!-- seo:sync-canonical -->',
    '<!-- /seo:sync-canonical -->',
    `  <link rel="canonical" href="${origin}/${file}">`,
  );
  fs.writeFileSync(filePath, html, 'utf8');
}

console.log(`SEO sincronizado: ${origin}`);
