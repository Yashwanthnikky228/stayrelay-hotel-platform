import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { ApiErrorResponse } from '@stayrelay/domain';

export default function handler(_request: VercelRequest, response: VercelResponse) {
  response.setHeader('Cache-Control', 'no-store');
  const body: ApiErrorResponse = {
    error: { code: 'INVENTORY_NOT_CONFIGURED', message: 'Live hotel inventory is not connected yet.' },
  };
  return response.status(503).json(body);
}
