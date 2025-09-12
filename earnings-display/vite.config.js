import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  server: {
    host: '0.0.0.0',
    port: 12000,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    allowedHosts: ['work-1-wqcaperlhuowrjye.prod-runtime.all-hands.dev', 'work-2-wqcaperlhuowrjye.prod-runtime.all-hands.dev']
  },
  preview: {
    host: '0.0.0.0',
    port: 12000,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    allowedHosts: ['work-1-wqcaperlhuowrjye.prod-runtime.all-hands.dev', 'work-2-wqcaperlhuowrjye.prod-runtime.all-hands.dev']
  }
})