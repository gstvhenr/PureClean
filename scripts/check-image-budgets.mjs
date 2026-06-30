import { stat } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

import { getOptimizedMediaEntries } from './media-manifest.mjs';

const KIB = 1024;
const MIB = 1024 * KIB;
const HERO_BUDGET = 250 * KIB;
const GALLERY_BUDGET = 200 * KIB;
const FORMAT_TOTAL_BUDGET = 1.5 * MIB;

async function fileSize(filePath) {
  try {
    return (await stat(filePath)).size;
  } catch {
    return null;
  }
}

export async function checkImageBudgets() {
  const errors = [];
  const totals = { avif: 0, webp: 0 };
  const files = [];

  for (const entry of getOptimizedMediaEntries()) {
    const budget = entry.id === 'hero' ? HERO_BUDGET : GALLERY_BUDGET;

    for (const [format, filePath] of [
      ['avif', entry.avifSrc],
      ['webp', entry.webpSrc],
    ]) {
      const bytes = await fileSize(filePath);
      files.push({ id: entry.id, format, filePath, bytes, budget });

      if (bytes === null) {
        errors.push(`Falta o derivado ${filePath}. Execute npm run images:optimize.`);
        continue;
      }

      totals[format] += bytes;
      if (bytes > budget) {
        errors.push(
          `${filePath} excede o budget: ${bytes} bytes > ${budget} bytes.`,
        );
      }
    }
  }

  for (const [format, bytes] of Object.entries(totals)) {
    if (bytes > FORMAT_TOTAL_BUDGET) {
      errors.push(
        `Total ${format} excede o budget: ${bytes} bytes > ${FORMAT_TOTAL_BUDGET} bytes.`,
      );
    }
  }

  return {
    ok: errors.length === 0,
    errors,
    files,
    totals,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = await checkImageBudgets();

  result.files.forEach(({ filePath, bytes }) => {
    console.log(`${filePath}: ${bytes ?? 'em falta'} bytes`);
  });
  console.log(`Total AVIF: ${result.totals.avif} bytes`);
  console.log(`Total WebP: ${result.totals.webp} bytes`);

  if (!result.ok) {
    result.errors.forEach((error) => console.error(error));
    process.exitCode = 1;
  }
}
