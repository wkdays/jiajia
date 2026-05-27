import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const apiLatency = new Trend('api_latency');

export const options = {
  stages: [
    { duration: '2m', target: 50 },   // Ramp up to 50 users
    { duration: '5m', target: 50 },   // Stay at 50 users
    { duration: '2m', target: 100 },  // Ramp up to 100 users
    { duration: '5m', target: 100 },  // Stay at 100 users
    { duration: '2m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests under 2s
    http_req_failed: ['rate<0.01'],    // Error rate under 1%
    errors: ['rate<0.05'],              // Custom error rate under 5%
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000/api/v1';

export default function () {
  // Test 1: Health check
  const healthRes = http.get(`${BASE_URL}/health`);
  check(healthRes, {
    'health status is 200': (r) => r.status === 200,
  });
  apiLatency.add(healthRes.timings.duration);
  errorRate.add(healthRes.status !== 200);

  sleep(1);

  // Test 2: List materials with pagination
  const materialsRes = http.get(`${BASE_URL}/materials?page=1&pageSize=20`);
  check(materialsRes, {
    'materials status is 200': (r) => r.status === 200,
    'materials has data': (r) => {
      const body = JSON.parse(r.body);
      return body.data && Array.isArray(body.data.items);
    },
  });
  apiLatency.add(materialsRes.timings.duration);
  errorRate.add(materialsRes.status !== 200);

  sleep(1);

  // Test 3: Search
  const searchRes = http.get(`${BASE_URL}/search?query=维生素&entities=material`);
  check(searchRes, {
    'search status is 200': (r) => r.status === 200,
  });
  apiLatency.add(searchRes.timings.duration);
  errorRate.add(searchRes.status !== 200);

  sleep(1);

  // Test 4: Get aggregations
  const aggRes = http.get(`${BASE_URL}/search/aggregations`);
  check(aggRes, {
    'aggregations status is 200': (r) => r.status === 200,
  });
  apiLatency.add(aggRes.timings.duration);
  errorRate.add(aggRes.status !== 200);

  sleep(2);
}
