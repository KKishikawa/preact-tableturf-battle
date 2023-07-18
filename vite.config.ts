import { join } from 'path';

import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

import { pwaManifest } from './pwaManifest';

export default defineConfig(({ mode }) => ({
  define: {
    'import.meta.vitest': 'undefined',
    NODE_ENV: `"${mode}"`,
  },
  publicDir: 'public',
  resolve: {
    alias: {
      '@/': join(__dirname, 'src/'),
    },
  },
  plugins: [
    preact(),
    VitePWA({
      manifest: pwaManifest,
    }),
  ],
  test: {
    environment: 'happy-dom',
    setupFiles: ['./__test__/test-setup.ts'],
    includeSource: ['src/**/*.{ts,tsx}'],
    // coverage: {
    //   provider: 'v8',
    //   reporter: ['text-summary', 'text'],
    // },
    globals: true,
    mockReset: true,
    restoreMocks: true,
  },
}));
