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

export default function VueTampan({
  el,
  initialState,
  router
}) {
  if (!VueTampan.Vue) throw new Error('Anda belum menjalankan: "Vue.use(VueTampan);"')

  const { Vue } = VueTampan

  Vue.prototype.$tampan = new Vue({
    data() {
      const client = getClienInfo()
      return {
        client,
        modalList: [],
        notifications: [],
        confirmation: null,
        loadingCount: 0,
        overlayCount: 0,
        isSidebarShow: client.isLargeScreen,
        isFullscreen: getFullscreenStatus(),
        sidebarMenus: [],
        brandName: 'VueTampan',
        brandIconClass: 'material-icons',
        brandIconText: 'face',
        brandImgUrl: false,
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

      notify({ type, title, text }) {
        return new Promise((resolve) => {
          this.notifications.push({
            type,
            title,
            text,
            key: (this.notifications.length) + '-' + randomChar(3),
            callback: (index) => {
              this.notifications.splice(index, 1)
              this.$nextTick(resolve)
            }
          })
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
        promiseWork.catch(() => this.reduceOverlayState())
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
        promiseWork.catch(() => this.reduceLoadingState())
        this.addLoadingState()
        return promiseWork
      },

      confirm({
        type = 'default',
        title = 'Attention',
        text = 'Are you sure?',
        confirmText = 'Ok',
        cancelText = 'Cancel'
      }) {
        const done = () => this.confirmation = null
        const confirmation = new Promise((resolve, reject) => {
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
              console.info('The promise rejection error below is totally normal.')
              reject()
              done()
            }
          }
        })
        this.useOverlayState(confirmation)
        return confirmation
      },

      createModal(modal) {
        const modalPromise = new Promise((resolve, reject) => {
          modal.resolve = resolve
          modal.reject = reject
          this.modalList.push(modal)
        })
        modalPromise.then(() => {
          this.modalList.splice(this.modalList.indexOf(modal), 1)
        })
        modalPromise.catch(() => {
          this.modalList.splice(this.modalList.indexOf(modal), 1)
        })
        this.useOverlayState(modalPromise)
        return modalPromise
      }
    }
  })

  App.router = router
  App.router.linkActiveClass = 'is-active'

  const app = new Vue(App).$mount(el)

  initialLayout(app, VueTampan.Vue.prototype.$tampan)

  return VueTampan.Vue.prototype.$tampan
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
