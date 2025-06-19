import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables based on the current mode (development, production, etc.)
  // process.cwd() gives the root directory of your project (where vite.config.ts is)
  // The third argument '' ensures all env variables are loaded, not just those prefixed with VITE_
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(), 
      sitemap({
        hostname: 'https://www.mcadamsdevelopment.com',
        outDir: 'public',
        dynamicRoutes: [
          '/',
          '/about',
          '/services',
          '/contact',
        ],
        robots: [
          {
            userAgent: '*',
            allow: '/',
          },
        ],
      }),
    ],
    server: {
      proxy: {
        '/api': {
          // Use the loaded environment variable
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    preview: {
      // Add this configuration for the preview server to handle client-side routing
      port: 5173, // Use the same port as dev for consistency
      strictPort: true,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    },
    build: {
      // Generate manifest.json in outDir
      manifest: true,
      outDir: 'dist',
      emptyOutDir: true
    },
  }
})
