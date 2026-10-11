import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(request: VercelRequest, response: VercelResponse) {
  response.setHeader('Cache-Control', 'no-store');
  if (!['GET', 'HEAD'].includes(request.method ?? 'GET')) {
    response.setHeader('Allow', 'GET, HEAD');
    return response.status(405).json({ error: { code: 'METHOD_NOT_ALLOWED', message: 'This API route is read-only.' } });
  }
  return response.status(503).json({ error: { code: 'INVENTORY_NOT_CONFIGURED', message: 'Live hotel inventory is not connected yet.' } });
}
