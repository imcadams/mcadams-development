import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables based on the current mode (development, production, etc.)
  // process.cwd() gives the root directory of your project (where vite.config.ts is)
  // The third argument '' ensures all env variables are loaded, not just those prefixed with VITE_
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
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
  }
})
