import express from 'express';
import { getApiReply } from './responses';

export const app = express();
app.disable('x-powered-by');
app.use('/api', (request, response) => {
  const reply = getApiReply(request.path, request.method);
  response.setHeader('Cache-Control', 'no-store');
  if (reply.allow) response.setHeader('Allow', reply.allow);
  response.status(reply.status).json(reply.body);
});

app.use((_request, response) => {
  response.setHeader('Cache-Control', 'no-store');
  response.status(404).json(getApiReply('/missing', 'GET').body);
});
