/**
 * Gera `_site/` para GitHub Pages: só ficheiros da landing + cache bust em CSS/JS.
 * Executar: npm run build:pages (CI define GITHUB_SHA).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, '_site');
const version = (process.env.GITHUB_SHA || 'dev').slice(0, 7);

const COPY_DIRS = ['css', 'js', 'assets'];
const COPY_FILES = [
  'index.html',
  'termos.html',
  'privacidade.html',
  'robots.txt',
  'sitemap.xml',
  '_headers',
];

function patchHtml(html) {
  return html
    .replace(/href="css\/site\.css(\?[^"]*)?"/g, `href="css/site.css?v=${version}"`)
    .replace(/href="js\/main\.js(\?[^"]*)?"/g, `href="js/main.js?v=${version}"`)
    .replace(/src="js\/main\.js(\?[^"]*)?"/g, `src="js/main.js?v=${version}"`);
}

async function rmDir(dir) {
  await fs.rm(dir, { recursive: true, force: true });
}

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(from, to);
    } else if (entry.isFile()) {
      await fs.copyFile(from, to);
    }
  }
}

await rmDir(outDir);
await fs.mkdir(outDir, { recursive: true });

for (const dir of COPY_DIRS) {
  await copyDir(path.join(root, dir), path.join(outDir, dir));
}

for (const file of COPY_FILES) {
  const src = path.join(root, file);
  try {
    await fs.access(src);
  } catch {
    continue;
  }
  let content = await fs.readFile(src, 'utf8');
  if (file.endsWith('.html')) {
    content = patchHtml(content);
  }
  await fs.writeFile(path.join(outDir, file), content, 'utf8');
}

await fs.writeFile(path.join(outDir, '.nojekyll'), '', 'utf8');

const faviconSrc = path.join(root, 'assets', 'brand', 'favicon.ico');
try {
  await fs.access(faviconSrc);
  await fs.copyFile(faviconSrc, path.join(outDir, 'favicon.ico'));
} catch {
  console.warn('Aviso: assets/brand/favicon.ico em falta; favicon.ico não copiado para _site/');
}

console.log(`Pages artefacto em _site/ (v=${version})`);
