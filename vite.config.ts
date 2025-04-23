import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api': {
        //target: 'http://218.39.156.143', // dev서버 주소
        //target: 'http://1.231.178.91:8080', //local 서버 주소
        target: import.meta.env.VITE_API_HOST,
        changeOrigin: true,
      }
    },
    host: '0.0.0.0',
    port:3000,
  }
})