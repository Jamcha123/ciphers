import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    cors: {
      origin: true,
      credentials: true, 
      methods: "get"
    },
    proxy: {
      "/api": {
        target: "", 
        changeOrigin: true, 
      }
    }
  }
})
