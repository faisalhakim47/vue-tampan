import { installComponents } from './global'
import { getClienDeviceInfo } from './tools/client-device-info'
import { randomChar } from './tools/string'
import { toggleFullscreen, getFullscreenStatus } from './tools/fullscreen'
import { initialLayout } from './layout'
import App from './App'

let tampan = null
let root = null
let tampanResolver = null
let tampanPromise = new Promise(resolve => tampanResolver = resolve)

export function whenTampanReady() {
  return tampanPromise
}

export function getTampan() {
  return whenTampanReady().then(({ tampan }) => tampan)
}

export function getRootInstance() {
  return whenTampanReady().then(({ root }) => root)
}


export function VueTampan(RootComponent) {
  const { Vue } = VueTampan

  if (!Vue) throw new Error('Anda belum menjalankan: "Vue.use(VueTampan);"')

  const client = getClienDeviceInfo()

  const Tampan = {
    data() {
      return {
        client,
        modalList: [],
        notifications: [],
        confirmation: null,
        loadingCount: 0,
        overlayCount: 0,
        isSidebarEnabled: client.isLargeScreen,
        isFullscreen: getFullscreenStatus(),
        brandName: 'VueTampan',
        brandIconClass: 'material-icons',
        brandIconText: 'face',
        brandImageIconUrl: false
      }
    },

    computed: {
      isSidebarShow() {
        // I know it is dumb but it is easier for human to understand.
        const isSidebarMenuExist = this.sidebarMenus.length !== 0
        if (!isSidebarMenuExist) return false
        if (this.isSidebarEnabled) return true
      }
    },

    methods: {
      toggleSidebar() {
        this.isSidebarEnabled = !this.isSidebarEnabled
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
        const finish = () => this.reduceOverlayState()
        promiseWork.catch(finish).then(finish)
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
        let isLoading = false
        const timer = setTimeout(() => {
          this.addLoadingState()
          isLoading = true
        }, 100)
        const finish = () => {
          this.$nextTick().then(() => {
            if (isLoading) this.reduceLoadingState()
          })
          clearTimeout(timer)
        }
        promiseWork.catch(finish).then(finish)
        return promiseWork
      },

      confirm({
        text = 'Apakah anda yakin?',
        confirmText = 'Oke',
        cancelText = 'Batal'
      }) {
        const done = () => this.confirmation = null
        const confirmation = new Promise((resolve, reject) => {
          this.confirmation = {
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
        const modalPromise = new Promise((resolve) => {
          modal.resolve = resolve
          this.modalList.push(modal)
        })
        modalPromise.then(() => {
          this.modalList.splice(this.modalList.indexOf(modal), 1)
        })
        this.useOverlayState(modalPromise)
        return modalPromise
      }
    }
  }

  App.el = RootComponent.el
  App.router = RootComponent.router
  RootComponent.el = RootComponent.router = undefined

  if (App.router) {
    App.router.options.linkActiveClass = 'is-active'
  }

  Vue.prototype.$tampan = new Vue({
    mixins: [Tampan, RootComponent]
  })

  App.mounted = function () {
    initialLayout(this, Vue.prototype.$tampan)
  }

  tampan = Vue.prototype.$tampan
  root = new Vue(App)

  tampanResolver({ root, tampan })

  return { root, tampan }
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
