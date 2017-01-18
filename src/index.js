import { installComponents } from './global'
import { getClienInfo } from './tools/client-platform-info'
import { randomChar } from './tools/string'
import { toggleFullscreen, getFullscreenStatus } from './tools/fullscreen'
import { initialLayout } from './layout'
import App from './App'

export * from './tools/array'
export * from './tools/date'
export * from './tools/fullscreen'
export * from './tools/number'
export * from './tools/throttle'
export * from './tools/typecheck'

export default function VueTampan({ el, initialState, router }) {
  VueTampan.Vue.prototype.$tampan = new VueTampan.Vue({
    data() {
      const client = getClienInfo()
      return {
        client,
        alertCount: 0,
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
            key: (++this.alertCount) + '-' + randomChar(3),
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
  App.router.linkActiveClass = 'is-active'

  const app = new VueTampan.Vue(App).$mount(el)

  initialLayout(app, VueTampan.Vue.prototype.$tampan)

  return app
}

VueTampan.install = (Vue) => {
  installComponents(Vue)
  VueTampan.Vue = Vue
}

(() => {
  try {
    if (window && window.Vue)
      Vue.use(VueTampan)
  } catch (e) { }
})()
