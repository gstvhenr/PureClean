import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, isAbsolute, join, normalize, relative } from 'node:path';

const HOST = '127.0.0.1';
const PORT = 4321;
const ROOT = process.cwd();
const SHUTDOWN_PATH = '/__playwright_shutdown__';

const contentTypes = new Map([
  ['.avif', 'image/avif'],
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
]);

const sendStatus = (response, statusCode, body) => {
  response.writeHead(statusCode, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  response.end(body);
};

const resolveRequestPath = async (pathname) => {
  const decodedPath = decodeURIComponent(pathname);
  const requestedPath = decodedPath === '/' ? '/index.html' : decodedPath;
  const absolutePath = normalize(join(ROOT, requestedPath));
  const relativePath = relative(ROOT, absolutePath);

  if (relativePath.startsWith('..') || isAbsolute(relativePath)) {
    return null;
  }

  const fileStat = await stat(absolutePath);
  return fileStat.isDirectory() ? join(absolutePath, 'index.html') : absolutePath;
};

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url ?? '/', `http://${HOST}:${PORT}`);

  if (request.method === 'POST' && requestUrl.pathname === SHUTDOWN_PATH) {
    sendStatus(response, 200, 'Encerramento solicitado.');
    setImmediate(() => server.close());
    return;
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    sendStatus(response, 405, 'Método não permitido.');
    return;
  }

  try {
    const filePath = await resolveRequestPath(requestUrl.pathname);
    if (!filePath) {
      sendStatus(response, 403, 'Acesso negado.');
      return;
    }

    response.writeHead(200, {
      'Content-Type': contentTypes.get(extname(filePath).toLowerCase()) ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
    });

    if (request.method === 'HEAD') {
      response.end();
      return;
    }

    createReadStream(filePath).pipe(response);
  } catch (error) {
    if (error?.code === 'ENOENT') {
      sendStatus(response, 404, 'Ficheiro não encontrado.');
      return;
    }

    sendStatus(response, 500, 'Erro interno do servidor.');
  }
});

const closeServer = () => server.close();

process.once('SIGINT', closeServer);
process.once('SIGTERM', closeServer);
server.listen(PORT, HOST);
