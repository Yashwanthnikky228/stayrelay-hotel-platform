import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRouter()],
  server: { host: '0.0.0.0', port: 5174, strictPort: true, proxy: { '/api': { target: 'http://localhost:3000', changeOrigin: true } } },
});
