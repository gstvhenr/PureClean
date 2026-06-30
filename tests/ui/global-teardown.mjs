const SHUTDOWN_URL = 'http://127.0.0.1:4321/__playwright_shutdown__';

export default async function globalTeardown() {
  try {
    await fetch(SHUTDOWN_URL, { method: 'POST' });
  } catch {
    // O servidor pode já ter terminado após uma falha de arranque.
  }
}
