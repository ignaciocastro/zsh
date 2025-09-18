import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { optimizeCssModules } from 'vite-plugin-optimize-css-modules';

export default defineConfig({
  plugins: [
    react(),
    optimizeCssModules()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
