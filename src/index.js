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
  if (!VueTampan.Vue) throw new Error('Anda belum menjalankan: "Vue.use(VueTampan);"')

  VueTampan.Vue.prototype.$tampan = new VueTampan.Vue({
    data() {
      const client = getClienInfo()
      return {
        client,
        notificationCount: 0,
        notifications: [],
        confirmation: null,
        loadingCount: 0,
        overlayCount: 0,
        isSidebarShow: client.isLargeScreen,
        isFullscreen: getFullscreenStatus(),
        sidebarMenus: [],
        ...initialState
      }
    },

    computed: {
      isLoading() {
        return this.loadingCount !== 0
      },

      isOverlaid() {
        return this.overlayCount !== 0
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

      notify({ type, title, text }) {
        return new Promise((resolve) => {
          this.notifications.push({
            type,
            title,
            text,
            key: (++this.notificationCount) + '-' + randomChar(3),
            callback: (index) => {
              this.notifications.splice(index, 1)
              this.$nextTick(resolve)
            }
          })
        })
      },

      confirm({
        type = 'default',
        title = 'Attention',
        text = 'Are you sure?',
        confirmText = 'Ok',
        cancelText = 'Cancel'
      }) {
        this.addOverlayState()
        const done = () => {
          this.confirmation = null
          this.reduceOverlayState()
        }
        return new Promise((resolve, reject) => {
          this.confirmation = {
            type,
            text,
            confirmText,
            cancelText,
            confirmCallback: () => {
              resolve()
              done()
            },
            cancelCallback: () => {
              reject()
              done()
            }
          }
        })
      },

      addOverlayState() {
        this.overlayCount += 1
      },
      reduceOverlayState() {
        this.overlayCount -= this.overlayCount !== 0 ? 1 : 0
      },
      useOverlayState(promiseWork) {
        promiseWork.then(() => this.reduceOverlayState())
        this.addOverlayState()
        return promiseWork
      },

      addLoadingState() {
        this.loadingCount += 1
        this.addOverlayState()
      },
      reduceLoadingState() {
        this.loadingCount -= this.loadingCount !== 0 ? 1 : 0
        this.reduceOverlayState()
      },
      useLoadingState(promiseWork) {
        this.useOverlayState(promiseWork)
        promiseWork.then(() => this.reduceLoadingState())
        this.addLoadingState()
        return promiseWork
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
