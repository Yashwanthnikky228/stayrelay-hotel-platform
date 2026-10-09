import express from 'express';
import type { ApiErrorResponse } from '@stayrelay/domain';
import { getHealthResponse } from './health';
import { propertiesRouter } from './routes/properties';

export const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '32kb' }));
app.use('/api', propertiesRouter);

app.get('/api/health', (_request, response) => {
  response.setHeader('Cache-Control', 'no-store');
  response.status(200).json(getHealthResponse());
});

app.use((_request, response) => {
  response.setHeader('Cache-Control', 'no-store');
  const body: ApiErrorResponse = { error: { code: 'NOT_FOUND', message: 'API route not found.' } };
  response.status(404).json(body);
});
