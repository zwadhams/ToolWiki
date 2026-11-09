import http from 'k6/http';
import { check, sleep } from 'k6';

const base = __ENV.BASE_URL || 'http://127.0.0.1:8771';
if (!/^http:\/\/127\.0\.0\.1:[0-9]+$/.test(base)) {
  throw new Error('This example accepts only an explicit IPv4 loopback URL.');
}
const latencyLimit = Number(__ENV.LATENCY_LIMIT_MS || '500');
if (!Number.isFinite(latencyLimit) || latencyLimit < 0) {
  throw new Error('LATENCY_LIMIT_MS must be a nonnegative number.');
}

export const options = {
  scenarios: {
    health: { executor: 'constant-vus', vus: 2, duration: '10s', gracefulStop: '2s' },
  },
  thresholds: {
    checks: ['rate==1'],
    http_req_failed: ['rate==0'],
    'http_req_duration{phase:load}': [`p(95)<${latencyLimit}`],
  },
};

export function setup() {
  const response = http.get(`${base}/health`, { timeout: '2s' });
  if (response.status !== 200) throw new Error('Start the local API fixture first.');
  const body = response.json();
  if (body.status !== 'ready' || body.mode !== 'fixed') {
    throw new Error('Start server.py with --fixed for this example.');
  }
}

export default function () {
  const response = http.get(`${base}/health`, {
    timeout: '2s',
    tags: { phase: 'load', name: 'GET /health' },
  });
  let body;
  try { body = response.json(); } catch { body = null; }
  check(response, {
    'status is 200': (result) => result.status === 200,
    'fixture is ready': () => body?.status === 'ready',
    'fixture is fixed': () => body?.mode === 'fixed',
  });
  sleep(0.5);
}

export function handleSummary(data) {
  return {
    [__ENV.SUMMARY_PATH || 'k6-summary.json']: JSON.stringify(data, null, 2),
    stdout: `Completed ${data.metrics.iterations?.values.count || 0} load iterations. Inspect the summary and process status for threshold results.\n`,
  };
}
