import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react"
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import os from "os"

function getLocalExternalIp() {
  const interfaces = os.networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address
      }
    }
  }
  return 'localhost'
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  server: {
    proxy: {
      "/api": {
        target: `http://${getLocalExternalIp()}:3000`
      }
    },
    host: true,
  },
  define: {
    __SOCKET_URL__: JSON.stringify(`http://${getLocalExternalIp()}:3000`),
  }
})
