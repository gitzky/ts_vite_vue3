import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 配置前端服务地址和端口
  server: {
    host: '127.0.0.1',
    port: 3000,
    // 是否开启 https
    https: false,
  },
  base: './',
})
