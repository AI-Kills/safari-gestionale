import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    include: ['./test/*.test.{js,ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/generated/**'],
    testTimeout: 30000,
    poolOptions: {
      threads: false,    // Importante per database condiviso
      isolate: true      // Isolamento tra test
    }
  },
}); 