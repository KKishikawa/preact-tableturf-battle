import { type ManifestOptions } from 'vite-plugin-pwa';

export const pwaManifest: Partial<ManifestOptions> = {
  short_name: 'ナワバトビルド',
  name: '非公式 ナワバトラーデッキビルダー',
  display: 'standalone',
  start_url: '.',
  background_color: '#f3f4f6',
  theme_color: '#7adff4',
  icons: [
    {
      src: 'icon-192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: 'icon-512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
};
