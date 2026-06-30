/**
 * Extrai frame 0 de um vídeo para WebP (poster hero).
 * Requer ffmpeg no PATH ou variável FFMPEG_PATH.
 *
 * Uso: node scripts/extract-video-poster.mjs <video> <output.webp> [maxWidth]
 */
import { spawnSync } from 'node:child_process';
import { mkdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';

import sharp from 'sharp';

const ffmpeg = process.env.FFMPEG_PATH ?? 'ffmpeg';
const [videoArg, outputArg, maxWidthArg = '960'] = process.argv.slice(2);

if (!videoArg || !outputArg) {
  console.error(
    'Uso: node scripts/extract-video-poster.mjs <video> <output.webp> [maxWidth]',
  );
  process.exit(1);
}

const videoPath = path.resolve(videoArg);
const outputPath = path.resolve(outputArg);
const maxWidth = Number.parseInt(maxWidthArg, 10);
const posterBudgetBytes = 200 * 1024;
const framePng = path.join(path.dirname(outputPath), '.poster-frame-tmp.png');

function runFfmpeg(args) {
  const result = spawnSync(ffmpeg, args, { encoding: 'utf8' });
  if (result.status !== 0) {
    console.error(result.stderr || result.stdout);
    process.exit(result.status ?? 1);
  }
}

await mkdir(path.dirname(outputPath), { recursive: true });

runFfmpeg([
  '-y',
  '-hide_banner',
  '-loglevel',
  'error',
  '-i',
  videoPath,
  '-frames:v',
  '1',
  '-vf',
  `scale=${maxWidth}:-2`,
  framePng,
]);

const qualities = [72, 68, 64, 60, 56, 52, 48, 44, 40];
let lastSize = 0;
let lastQuality = qualities.at(-1);
for (const quality of qualities) {
  await sharp(framePng).webp({ quality, effort: 6 }).toFile(outputPath);
  const { size } = await stat(outputPath);
  lastSize = size;
  lastQuality = quality;
  if (size <= posterBudgetBytes) {
    break;
  }
}

await unlink(framePng).catch(() => {});

if (lastSize <= posterBudgetBytes) {
  console.log(`Poster: ${outputPath} (${lastSize} bytes, quality ${lastQuality})`);
} else {
  console.warn(
    `Poster acima do orçamento (${posterBudgetBytes} bytes): ${lastSize} bytes`,
  );
}
