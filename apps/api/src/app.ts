import express from 'express';
import { getApiReply } from './responses';
import { handleTestAccountRoute } from './testAccountRoutes';
import { TestStore } from './testStore';

export function createApp(options: { store?: TestStore; testAuthEnabled?: boolean } = {}) {
  const app = express();
  const store = options.store ?? new TestStore(process.env.STAYRELAY_DEV_DB_PATH ?? '/tmp/stayrelay-dev.sqlite');
  const testAuthEnabled = options.testAuthEnabled ?? process.env.STAYRELAY_TEST_AUTH === 'enabled';
  app.disable('x-powered-by');
  app.use(express.raw({ type: ['text/plain', 'application/pdf'], limit: '256kb' }));
  app.use(express.json({ limit: '32kb' }));
  app.use('/api', (request, response) => {
    if (handleTestAccountRoute(request, response, store, testAuthEnabled)) return;
    const reply = getApiReply(request.path, request.method);
    response.setHeader('Cache-Control', 'no-store');
    if (reply.allow) response.setHeader('Allow', reply.allow);
    response.status(reply.status).json(reply.body);
  });

  app.use((_request, response) => {
    response.setHeader('Cache-Control', 'no-store');
    response.status(404).json(getApiReply('/missing', 'GET').body);
  });
  return app;
}

export const app = createApp();
