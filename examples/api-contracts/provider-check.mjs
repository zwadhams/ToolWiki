import { createServer } from 'node:http';
import path from 'node:path';
import { Verifier } from '@pact-foundation/pact';

const mode = process.argv[2];
if (!['bad', 'good'].includes(mode)) throw new Error('Choose bad or good.');
const server = createServer((request, response) => {
  if (request.method !== 'GET' || request.url !== '/parcels/1') {
    response.writeHead(404); response.end(); return;
  }
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ id: 1, status: mode === 'bad' ? 7 : 'queued' }));
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
try {
  await new Verifier({
    provider: 'ParcelAPI',
    providerVersion: 'toolwiki-example',
    providerBaseUrl: `http://127.0.0.1:${server.address().port}`,
    pactUrls: [path.resolve('reports/pacts/ParcelClient-ParcelAPI.json')],
    stateHandlers: { 'parcel 1 exists': async () => {} },
    publishVerificationResult: false,
    logLevel: 'error',
  }).verifyProvider();
  console.log(`Provider ${mode}: contract verified.`);
} catch (error) {
  console.error(`Provider ${mode}: ${error.message}`);
  process.exitCode = 1;
} finally {
  await new Promise(resolve => server.close(resolve));
}
