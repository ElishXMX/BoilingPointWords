import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 自动导入图标组件
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [ElementPlusResolver(),
         // Auto import icon components
        // 自动导入图标组件
        IconsResolver()
      ],
    }),
    Components({
      resolvers: [ElementPlusResolver({importStyle: 'sass'}),
        IconsResolver({enableCollections: ['element-plus']})
      ],
    }),
    Icons({
      autoInstall: true,}), // 自动安装依赖
    
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" as *;
        `,
      }
    }
  }
})
