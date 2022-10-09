import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import Pages from 'vite-plugin-pages'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import SVG from 'vite-svg-loader'
import Markdown from 'vite-plugin-vue-markdown'
import Shiki from 'markdown-it-shiki'
import anchor from 'markdown-it-anchor'
import LinkAttributes from 'markdown-it-link-attributes'
import TOC from 'markdown-it-anchor'
import { slugify } from './scripts/slugify'

export default defineConfig({
  resolve: {
    alias: [{ find: '~/', replacement: `${resolve(__dirname, 'src')}/` }],
  },
  plugins: [
    UnoCSS(),
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
    }),
    Pages({
      extensions: ['vue', 'md'],
      dirs: 'pages',
    }),
    Markdown({
      wrapperComponent: 'Blog',
      wrapperClasses: 'prose m-auto',
      headEnabled: true,
      markdownItOptions: {
        quotes: '""\'\'',
      },
      markdownItSetup(md) {
        md.use(Shiki, {
          theme: {
            light: 'vitesse-light',
            dark: 'vitesse-dark',
          },
        })
        md.use(anchor, {
          slugify,
          permalink: anchor.permalink.linkInsideHeader({
            symbol: '#',
            renderAttrs: () => ({ 'aria-hidden': 'true' }),
          }),
        })
        md.use(LinkAttributes, {
          matcher: (link) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
        md.use(TOC, {
          includeLevel: [1, 2, 3],
          slugify,
        })
      },
    }),
    Inspect(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core', '@vueuse/head'],
    }),
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          prefix: '',
        }),
      ],
    }),
    Icons({
      defaultClass: 'inline',
      defaultStyle: 'vertical-align: sub',
    }),
    SVG({
      svgo: false,
    }),
  ],
  build: {},
  ssgOptions: {
    formatting: 'minify',
    format: 'cjs',
  },
})
