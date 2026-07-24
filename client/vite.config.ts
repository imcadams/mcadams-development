import { defineConfig, loadEnv } from 'vite'
import { reactRouter } from '@react-router/dev/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables based on the current mode (development, production, etc.)
  // process.cwd() gives the root directory of your project (where vite.config.ts is)
  // The third argument '' ensures all env variables are loaded, not just those prefixed with VITE_
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      reactRouter(),
    ],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_CONTACT_API_URL ?? env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
