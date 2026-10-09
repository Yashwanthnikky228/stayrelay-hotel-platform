import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getApiReply } from '../apps/api/src/responses.ts';

export default function handler(request: VercelRequest, response: VercelResponse) {
  const reply = getApiReply('/health', request.method ?? 'GET');
  response.setHeader('Cache-Control', 'no-store');
  if (reply.allow) response.setHeader('Allow', reply.allow);
  return response.status(reply.status).json(reply.body);
}
