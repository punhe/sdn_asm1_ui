import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 10000, // Chỉ định cổng cụ thể
    host: '0.0.0.0', // Cho phép truy cập từ bên ngoài
  },
})