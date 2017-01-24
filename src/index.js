import { installComponents } from './global'
import { getClienInfo } from './tools/client-platform-info'
import { randomChar } from './tools/string'
import { toggleFullscreen, getFullscreenStatus } from './tools/fullscreen'
import { initialLayout } from './layout'
import App from './App'

export * from './tools/array'
export * from './tools/date'
export * from './tools/events'
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
        loadingCount: 0,
        isSidebarShow: client.isLargeScreen,
        isFullscreen: getFullscreenStatus(),
        sidebarMenus: [],
        ...initialState
      }
    },

    computed: {
      isLoading() {
        return this.loadingCount !== 0
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

      confirm({
        type = 'default',
        title = 'Are you sure?',
        confirmText = 'Ok',
        cancelText = 'Cancel'
      }) {
        return new Promise((resolve, reject) => {
          this.confirmation = {
            type,
            text,
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
      },

      addLoadingState() {
        this.loadingCount += 1
      },

      reduceLoadingState() {
        if (this.loadingCount !== 0) this.loadingCount -= 1
      },
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
