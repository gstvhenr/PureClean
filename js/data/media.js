/**
 * Registo único de fotografia da landing.
 * Deixe `src` vazio para reservar o espaço (placeholder visual).
 * `alt` deve descrever o serviço e local (SEO on-page).
 */
function optimizedVariants(name) {
  return {
    avifSrc: `assets/photos/generated/${name}.avif`,
    webpSrc: `assets/photos/generated/${name}.webp`,
  };
}

function compareVariants(baseName) {
  return {
    beforeAvifSrc: `assets/photos/generated/${baseName}-before.avif`,
    beforeWebpSrc: `assets/photos/generated/${baseName}-before.webp`,
    afterAvifSrc: `assets/photos/generated/${baseName}-after.avif`,
    afterWebpSrc: `assets/photos/generated/${baseName}-after.webp`,
  };
}

export const siteMedia = {
  hero: {
    id: 'hero',
    videoSrc: 'assets/video/hero.mp4',
    posterSrc: 'assets/photos/generated/hero-poster.webp',
    width: 960,
    height: 960,
    decorative: false,
    alt: 'Mão com luva amarela a limpar um vidro com pano de microfibra; vídeo promocional PureClean',
  },
  beforeAfter: [
    {
      id: 'ba-assento-carro',
      featured: true,
      caption: 'Assento de carro',
      beforeSrc: 'assets/photos/ba-assento-carro-before.png',
      afterSrc: 'assets/photos/ba-assento-carro-after.png',
      ...compareVariants('ba-assento-carro'),
      width: 2034,
      height: 4096,
      optimizedWidth: 960,
      altBefore:
        'Assento de automóvel antes da limpeza profissional PureClean, Lisboa',
      altAfter:
        'Assento de automóvel depois da limpeza profissional PureClean, Lisboa',
    },
    { id: 'ba-slot-2', caption: '' },
    { id: 'ba-slot-3', caption: '' },
    { id: 'ba-slot-4', caption: '' },
  ],
  aboutGallery: [
    {
      id: 'about-estofos',
      src: 'assets/photos/about-estofos.png',
      ...optimizedVariants('about-estofos'),
      width: 640,
      height: 1136,
      optimizedWidth: 640,
      alt: 'Limpeza de estofos e têxteis em casa na região de Lisboa',
    },
    {
      id: 'about-service',
      src: 'assets/photos/hero-service.png',
      ...optimizedVariants('hero-service'),
      width: 1536,
      height: 1024,
      optimizedWidth: 960,
      alt: 'Interiores impecáveis após limpeza profissional PureClean',
    },
  ],
};
