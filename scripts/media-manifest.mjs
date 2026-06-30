import { siteMedia } from '../js/data/media.js';

function visit(value, entries) {
  if (Array.isArray(value)) {
    value.forEach((item) => visit(item, entries));
    return;
  }

  if (!value || typeof value !== 'object') return;

  if (value.beforeSrc && value.beforeAvifSrc && value.beforeWebpSrc) {
    entries.push({
      id: `${value.id ?? value.beforeSrc}-before`,
      src: value.beforeSrc,
      avifSrc: value.beforeAvifSrc,
      webpSrc: value.beforeWebpSrc,
      width: value.width,
      height: value.height,
      optimizedWidth: value.optimizedWidth ?? value.width,
    });
  }

  if (value.afterSrc && value.afterAvifSrc && value.afterWebpSrc) {
    entries.push({
      id: `${value.id ?? value.afterSrc}-after`,
      src: value.afterSrc,
      avifSrc: value.afterAvifSrc,
      webpSrc: value.afterWebpSrc,
      width: value.width,
      height: value.height,
      optimizedWidth: value.optimizedWidth ?? value.width,
    });
  }

  if (value.src && value.avifSrc && value.webpSrc) {
    entries.push(value);
  }

  Object.values(value).forEach((item) => visit(item, entries));
}

export function getOptimizedMediaEntries() {
  const entries = [];
  visit(siteMedia, entries);

  const uniqueEntries = new Map();
  entries.forEach((entry) => {
    if (!uniqueEntries.has(entry.src)) {
      uniqueEntries.set(entry.src, entry);
    }
  });

  return [...uniqueEntries.values()];
}
