import { Router } from 'express';
import type { ApiErrorResponse } from '@stayrelay/domain';

export const propertiesRouter = Router();

propertiesRouter.get('/properties', (_request, response) => {
  response.setHeader('Cache-Control', 'no-store');
  const body: ApiErrorResponse = {
    error: { code: 'INVENTORY_NOT_CONFIGURED', message: 'Live hotel inventory is not connected yet.' },
  };
  response.status(503).json(body);
});
