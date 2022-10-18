import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import NProgress from 'nprogress'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import autoRoutes from 'pages-generated'

import 'uno.css'
import './styles/main.css'
import './styles/prose.css'
import './styles/md.css'
import '@unocss/reset/tailwind.css'

const routes = autoRoutes.map(r => ({
  ...r,
  alias: r.path.endsWith('/')
    ? `${r.path}index.html`
    : `${r.path}.html`
}))

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition)
    return savedPosition
  else
    return { top: 0 }
}

export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  { routes, scrollBehavior },
  // function to have custom setups
  ({ router, isClient }) => {
    dayjs.extend(LocalizedFormat)
    if (isClient) {
      router.beforeEach(() => {
        NProgress.start()
      })
      router.afterEach(() => {
        NProgress.done()
      })
    }
  }
)
