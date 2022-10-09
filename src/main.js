import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import NProgress from 'nprogress'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import routes from '~pages'


import 'uno.css'
import './styles/main.css'
import './styles/prose.css'
import './styles/md.css'
import '@unocss/reset/tailwind.css'

export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  { routes },
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
