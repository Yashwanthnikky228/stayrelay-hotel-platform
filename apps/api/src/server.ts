import { app } from './app';

const port = Number(process.env.API_PORT ?? 3000);

app.listen(port, '0.0.0.0', () => {
  process.stdout.write(`StayRelay Express API listening on http://localhost:${port}\n`);
});
