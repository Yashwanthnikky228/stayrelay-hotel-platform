import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getHealthResponse } from '../server/src/health.ts';

export default function handler(_request: VercelRequest, response: VercelResponse) {
  response.setHeader('Cache-Control', 'no-store');
  return response.status(200).json(getHealthResponse());
}
