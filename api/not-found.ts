import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_request: VercelRequest, response: VercelResponse) {
  response.setHeader('Cache-Control', 'no-store');
  return response.status(404).json({ error: { code: 'NOT_FOUND', message: 'API route not found.' } });
}
