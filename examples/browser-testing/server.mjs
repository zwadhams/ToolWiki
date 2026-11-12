import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const mode = process.argv[2];
if (!['bad', 'good'].includes(mode)) throw new Error('Choose bad or good.');
const html = await readFile(new URL(`fixtures/${mode}.html`, import.meta.url));
const server = createServer((request, response) => {
  if (request.method !== 'GET') { response.writeHead(405); response.end(); return; }
  if (request.url === '/health') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ fixture: 'toolwiki-browser-testing-v1', mode }));
  } else if (request.url === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(html);
  } else { response.writeHead(404); response.end('Not found'); }
});
server.listen(8837, '127.0.0.1', () => console.log(`Browser fixture ${mode}: http://127.0.0.1:8837/`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close());
