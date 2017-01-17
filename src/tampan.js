import { installComponents } from './global'
import { getClienInfo } from './tools/client-platform-info'
import { randomChar } from './tools/string'
import { toggleFullscreen, getFullscreenStatus } from './tools/fullscreen'
import { initialLayout } from './layout'
import App from './App'

export * from './tools/array'
export * from './tools/client-platform-info'
export * from './tools/date'
export * from './tools/fullscreen'
export * from './tools/number'
export * from './tools/string'
export * from './tools/throttle'
export * from './tools/typecheck'

let Vue
let alertCount = 0

export default function VueTampan({ el, initialState, router }) {
  Vue.prototype.$tampan = new Vue({
    data() {
      const client = getClienInfo()
      return {
        client,
        alerts: [],
        confirmation: null,
        isSidebarShow: client.isLargeScreen,
        isFullscreen: getFullscreenStatus(),
        sidebarMenus: [],
        ...initialState
      }
    },

    methods: {
      toggleSidebar() {
        this.isSidebarShow = !this.isSidebarShow
      },

      toggleFullscreen() {
        toggleFullscreen()
        this.$nextTick(() => this.isFullscreen = !getFullscreenStatus())
      },

      alert({ type, title, text }) {
        return new Promise((resolve) => {
          this.alerts.push({
            type,
            title,
            text,
            key: (++alertCount) + '-' + randomChar(3),
            callback: (index) => {
              this.alerts.splice(index, 1)
              this.$nextTick(resolve)
            }
          })
        })
      },

      confirm(title, { confirmText, cancelText } = {}) {
        return new Promise((resolve, reject) => {
          this.confirmation = {
            title,
            confirmText,
            cancelText,
            confirmCallback: () => {
              resolve()
              this.confirmation = null
            },
            cancelCallback: () => {
              reject()
              this.confirmation = null
            }
          }
        })
      }
    }
  })

  App.router = router

  const app = new Vue(App).$mount(el)

  initialLayout(app, Vue.prototype.$tampan)

  return app
}

VueTampan.install = (RealVue) => {
  installComponents(RealVue)
  Vue = RealVue
}
