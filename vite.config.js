import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import Pages from 'vite-plugin-pages'
import UnoCSS from 'unocss/vite'
import Markdown from 'vite-plugin-vue-markdown'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import SVG from 'vite-svg-loader'

export default defineConfig({
  plugins: [
    vue(),
    Pages({
      extensions: ['vue', 'md'],
    }),
    UnoCSS(),
    Markdown(),
    Inspect(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        '@vueuse/head',
      ],
    }),
    Components(),
    Icons({
      defaultClass: 'inline',
    }),
    SVG(),
  ],
  build: {},
  ssgOptions: {
    formatting: 'minify',
    format: 'cjs',
  },
})
