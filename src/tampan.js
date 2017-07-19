import { installGlobalComponents } from './global'
import { getClienDeviceInfo } from './tools/client-device-info'
import { randomChar } from './tools/string'
import { initialLayout } from './layout'
import Root from './root.vue'

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


export function VueTampan(AppComponent) {
  const { Vue } = VueTampan

  if (!Vue) throw new Error('Anda belum menjalankan: "Vue.use(VueTampan);"')

  const Tampan = {
    data() {
      const client = getClienDeviceInfo()
      return {
        client: getClienDeviceInfo(),
        modalList: [],
        loadingCount: 0,
        isMainMenuEnabled: client.isLargeScreen,
      }
    },

    computed: {
      isMainMenuToggleable() {
        return this.client.isSmallScreen
      },
      isMenuItemExist() {
        return this.menuGroupList.length !== 0
      },
      isMainMenuAlwaysShow() {
        return this.isMenuItemExist && (this.client.isMediumScreen || this.client.isLargeScreen)
      },
      isMainMenuShow() {
        if (!this.isMenuItemExist) return false
        if (this.isMainMenuAlwaysShow) return true
        if (this.isMainMenuEnabled && this.isMainMenuToggleable) return true
        return false
      },
    },

    methods: {
      showMainMenu() {
        return this.isMainMenuEnabled = true
      },
      hideMainMenu() {
        return this.isMainMenuEnabled = false
      },
      toggleMainMenu() {
        return new Promise((resolve) => {
          if (!this.isMainMenuEnabled) this.$nextTick().then(() => {
            this.isMainMenuEnabled = !this.isMainMenuEnabled
            this.$nextTick().then(resolve)
          })
          else {
            this.isMainMenuEnabled = !this.isMainMenuEnabled
            this.$nextTick().then(resolve)
          }
        })
      },

      addLoadingState() {
        this.loadingCount += 1
      },
      reduceLoadingState() {
        this.loadingCount -= 1
      },
      useLoadingState(promiseWork) {
        const finish = () => this.reduceLoadingState()
        this.addLoadingState()
        this.$nextTick().then(() => promiseWork)
          .then(finish)
          .catch(finish)
        return promiseWork
      },

      createModal({ type, title, body, footer, onSubmit }) {
        const options = {
          type, title, body, footer, onSubmit
        }
        const modal = {
          options,
          close: () => {
            this.modalList.splice(this.modalList.indexOf(options), 1)
          },
        }
        this.modalList.push(modal)
        return modal
      },

      alert({ title = '', text = '', confirmText = 'Tutup' }) {
        return new Promise((resolve) => {
          const modal = this.createModal({
            title,
            type: 'text',
            body: text,
            footer: [
              {
                type: 'button',
                text: confirmText,
                onClick() {
                  modal.close()
                  resolve()
                },
                iconClass: 'material-icons',
                iconText: 'close'
              },
            ],
          })
        })
      },

      confirm({
        title = 'Apakah anda yakin?',
        text = '',
        confirmText = 'Oke',
        cancelText = 'Batal'
      }) {
        return new Promise((resolve, reject) => {
          const modal = this.createModal({
            title,
            type: 'text',
            body: text,
            footer: [
              {
                type: 'button',
                text: cancelText,
                onClick() {
                  modal.close()
                  reject()
                },
              },
              {
                type: 'button',
                text: confirmText,
                onClick() {
                  modal.close()
                  resolve()
                },
              },
            ],
          })
        })
      },
    },
  }

  Root.el = AppComponent.el
  Root.router = AppComponent.router
  AppComponent.el = AppComponent.router = undefined

  if (Root.router) {
    Root.router.options.linkActiveClass = 'is-active'
  }

  Vue.prototype.$tampan = new Vue({
    mixins: [Tampan, AppComponent]
  })

  Root.mounted = function () {
    initialLayout(this, Vue.prototype.$tampan)
  }

  tampan = Vue.prototype.$tampan
  root = new Vue(Root)

  tampanResolver({ root, tampan })

  return { root, tampan }
}

VueTampan.install = (Vue) => {
  installGlobalComponents(Vue)
  VueTampan.Vue = Vue
}

  ; (() => {
    try {
      if (window && window.Vue)
        Vue.use(VueTampan)
    } catch (e) { }
  })()
