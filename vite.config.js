import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.png', 'pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        name: 'SimuTec - Simuladores Técnicos',
        short_name: 'SimuTec',
        description: 'Plataforma de Simulación y Educación Tecnológica Digital.',
        theme_color: '#00f2ff',
        background_color: '#0a0a0a',
        display: 'standalone',
        scope: process.env.VITE_BASE_PATH || '/',
        start_url: process.env.VITE_BASE_PATH || '/',
        orientation: 'portrait',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api'), // Don't cache API by default or use networkFirst
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 300
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  base: process.env.VITE_BASE_PATH || '/',
})
