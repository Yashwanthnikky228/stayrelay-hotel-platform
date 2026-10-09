import type { ApiErrorResponse } from '@stayrelay/domain';
import { getHealthResponse, type HealthResponse } from './health';

export interface ApiReply {
  status: 200 | 404 | 405 | 503;
  body: HealthResponse | ApiErrorResponse;
  allow?: string;
}

/** The disabled public API contract shared by local Express and Vercel functions. */
export function getApiReply(path: string, method: string): ApiReply {
  if (path !== '/health' && path !== '/properties') {
    return { status: 404, body: { error: { code: 'NOT_FOUND', message: 'API route not found.' } } };
  }
  if (method !== 'GET' && method !== 'HEAD') {
    return {
      status: 405,
      allow: 'GET, HEAD',
      body: { error: { code: 'METHOD_NOT_ALLOWED', message: 'This API route is read-only.' } },
    };
  }
  if (path === '/health') return { status: 200, body: getHealthResponse() };
  return {
    status: 503,
    body: { error: { code: 'INVENTORY_NOT_CONFIGURED', message: 'Live hotel inventory is not connected yet.' } },
  };
}
