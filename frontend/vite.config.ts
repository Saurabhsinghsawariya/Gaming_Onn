export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '.dist'
  }
});
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

