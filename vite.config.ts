import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  optimizeDeps: {
    disabled: true,
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {},
      },
    },
  },
});
