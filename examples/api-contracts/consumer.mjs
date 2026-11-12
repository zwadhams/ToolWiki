import assert from 'node:assert/strict';
import path from 'node:path';
import { Pact, Matchers } from '@pact-foundation/pact';
import { parcelStatus } from './client.mjs';

const pact = new Pact({ consumer: 'ParcelClient', provider: 'ParcelAPI', dir: path.resolve('reports/pacts'), logLevel: 'error' });
await pact.addInteraction()
  .given('parcel 1 exists')
  .uponReceiving('a request for parcel 1')
  .withRequest('GET', '/parcels/1', builder => builder.headers({ Accept: 'application/json' }))
  .willRespondWith(200, builder => builder.headers({ 'Content-Type': 'application/json' }).jsonBody({ id: Matchers.integer(1), status: Matchers.string('queued') }))
  .executeTest(async mock => {
    assert.equal(await parcelStatus(mock.url, 1), 'QUEUED');
  });
console.log('Consumer passed; pact file generated from the actual client call.');
