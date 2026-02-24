import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Modular-Bidding/',
  plugins: [react()],
  server: {
    port: 3001,
    open: true,
    host: true,
    watch: {
      usePolling: true
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
