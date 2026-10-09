import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getApiReply } from '../apps/api/src/responses.ts';

export default function handler(_request: VercelRequest, response: VercelResponse) {
  const reply = getApiReply('/not-found', 'GET');
  response.setHeader('Cache-Control', 'no-store');
  return response.status(reply.status).json(reply.body);
}
