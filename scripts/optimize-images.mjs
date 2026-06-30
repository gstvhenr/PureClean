import { mkdir } from 'node:fs/promises';
import path from 'node:path';

import sharp from 'sharp';

import { getOptimizedMediaEntries } from './media-manifest.mjs';

async function optimizeEntry(entry) {
  const sourcePath = path.resolve(entry.src);
  const avifPath = path.resolve(entry.avifSrc);
  const webpPath = path.resolve(entry.webpSrc);
  const width = entry.optimizedWidth ?? entry.width;

  await mkdir(path.dirname(avifPath), { recursive: true });

  const base = sharp(sourcePath)
    .rotate()
    .resize({
      width,
      withoutEnlargement: true,
    });

  await Promise.all([
    base.clone().avif({ quality: 52, effort: 4 }).toFile(avifPath),
    base.clone().webp({ quality: 72, effort: 5 }).toFile(webpPath),
  ]);

  return entry.id;
}

const entries = getOptimizedMediaEntries();
const optimized = await Promise.all(entries.map(optimizeEntry));

console.log(`Imagens otimizadas: ${optimized.join(', ')}`);
