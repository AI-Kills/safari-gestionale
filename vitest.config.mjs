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
    hookTimeout: 30000,
    pool: 'forks',     // Usa forks invece di threads per SQLite
    poolOptions: {
      forks: {
        singleFork: true  // Un solo fork per evitare conflitti SQLite
      }
    }
  },
}); 