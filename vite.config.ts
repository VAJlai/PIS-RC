import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from "path"

export default defineConfig({
  resolve: {
    alias: [{
      find: "@",
      replacement: resolve(__dirname, 'src')

    },
    {
      find: /^~/,
      replacement: ''
    }]
  },
  base: './',
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vue(),
  ],
  // 强制预构建插件包
  optimizeDeps: {
    include: ['axios'],
  },
  server: {
    cors: true, // 默认启用并允许任何源
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
  }
})