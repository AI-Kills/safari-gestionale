/// <reference types="vitest" />

import { expect, test, describe, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';

declare global {
  const expect: typeof import('vitest').expect;
  const test: typeof import('vitest').test;
  const describe: typeof import('vitest').describe;
  const beforeAll: typeof import('vitest').beforeAll;
  const afterAll: typeof import('vitest').afterAll;
  const beforeEach: typeof import('vitest').beforeEach;
  const afterEach: typeof import('vitest').afterEach;
  const it: typeof import('vitest').it;
  const vi: typeof import('vitest').vi;
} 