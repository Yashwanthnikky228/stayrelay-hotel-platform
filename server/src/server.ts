import { createServer } from 'node:http';
import { getHealthResponse } from './health';

const port = Number(process.env.API_PORT ?? 3000);

const server = createServer((request, response) => {
  if (request.method === 'GET' && request.url === '/api/health') {
    response.writeHead(200, {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json; charset=utf-8',
    });
    response.end(JSON.stringify(getHealthResponse()));
    return;
  }

  response.writeHead(404, {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
  });
  response.end(JSON.stringify({ error: { code: 'NOT_FOUND', message: 'Route not found.' } }));
});

server.listen(port, '0.0.0.0', () => {
  process.stdout.write(`StayRelay API listening on http://localhost:${port}\n`);
});
