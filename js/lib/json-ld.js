/**
 * Injeta ou substitui JSON-LD no <head> (SEO on-page / rich results).
 * @param {string} id
 * @param {object} data
 */
export function injectJsonLd(id, data) {
  const existing = document.getElementById(id);
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

/**
 * @param {{ question: string; answer: string }[]} items
 */
export function buildFaqPageSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
