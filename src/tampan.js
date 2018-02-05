import { NProgress } from './vendor/nprogress.js'
import { getDeviceInfo } from './tools/device.js'

import Dialog from './components/Dialog.js'

const escapeGuards = []

export function initiateTampan(Vue, mixin) {
  Vue.prototype.$tampan = new Vue({
    mixins: [mixin],

    data() {
      const client = getDeviceInfo()
      return {
        client,
        // used by <Modal> and <AdminPanel> components
        activeModalList: [],
        dialogList: [],
        loadingCount: 0,
        isSidebarShow: !client.isSmallScreen,
      }
    },

    computed: {
      isSidebarToggleable() {
        return this.client.isSmallScreen
      },
    },

    methods: {
      showSidebar() {
        return this.isSidebarShow = true
      },

      hideSidebar() {
        return this.isSidebarShow = false
      },

      toggleSidebar() {
        return new Promise((resolve) => {
          if (!this.isSidebarShow) this.$nextTick().then(() => {
            this.isSidebarShow = !this.isSidebarShow
            this.$nextTick().then(resolve)
          })
          else {
            this.isSidebarShow = !this.isSidebarShow
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
      useLoadingState(promise) {
        this.addLoadingState()
        const finish = () => this.reduceLoadingState()
        this.$nextTick().then(() => promise
          .then(finish)
          .catch(finish)
        )
        return promise
      },

      alert({ title = '', text = '', confirmText = 'Tutup' }) {
        try {
          text = JSON.stringify(text)  
        } catch (e) { }
        return new Promise((resolve) => {
          const alert = {
            type: 'alert',
            title,
            text,
            confirmText,
            resolve: () => {
              this.dialogList.splice(this.dialogList.indexOf(alert), 1)
              resolve()
            }
          }
          this.dialogList.push(alert)
        })
      },

      confirm({
        title = 'Apakah anda yakin?',
        text = '',
        confirmText = 'Ya',
        confirmIconText = 'check',
        rejectText = 'Batal',
      }) {
        return new Promise((resolve, reject) => {
          var close = () => {
            this.dialogList.splice(this.dialogList.indexOf(confirm), 1)
          }
          var confirm = {
            type: 'confirm',
            title,
            text,
            confirmText,
            confirmIconText,
            rejectText,
            resolve: () => {
              close()
              resolve()
            },
            reject: () => {
              close()
              reject()
            },
          }
          this.dialogList.push(confirm)
        })
      },

      addEscGuard(escapeFn) {
        escapeGuards.unshift(escapeFn)
      },

      removeEscGuard(escapeFn) {
        const index = escapeGuards.indexOf(escapeFn)
        if (index !== -1) escapeGuards.splice(index, 1)
      },
    },

    watch: {
      loadingCount(loadingCount, oldLoadingCount) {
        if (loadingCount === 0) {
          NProgress.done(true)
        } else if (loadingCount > 0) {
          if (oldLoadingCount === 0) {
            NProgress.start()
          } else if (oldLoadingCount > loadingCount) {
            NProgress.inc()
          }
        }
      },
    },

    created() {
      window.addEventListener('keydown', (event) => {
        if (event.keyCode === 27) {
          event.preventDefault()
          const escape = escapeGuards.shift()
          if (typeof escape === 'function') escape()
        }
      })

    },
  })

  Vue.prototype.$tampan.internalComponent = new Vue({
    el: document.body.appendChild(
      document.createElement('div')
    ),

    data() {
      return {
        dialog: { type: 'none' }
      }
    },

    components: { Dialog },

    computed: {
      showDialog() {
        return !!this.$tampan.dialogList[0]
      }
    },

    watch: {
      '$tampan.dialogList'(dialogList) {
        if (dialogList[0]) this.dialog = dialogList[0]
      }
    },

    render(h) {
      const dialog = this.dialog
      return h('div', { attrs: { id: 'vue-tampan-internal-component' } }, [
        h('Dialog', {
          props: {
            show: this.showDialog,
            type: dialog.type,
            title: dialog.title,
            text: dialog.text,
            confirmText: dialog.confirmText,
            confirmIconText: dialog.confirmIconText,
            rejectText: dialog.rejectText,
            resolve: dialog.resolve,
            reject: dialog.reject,
          }
        })
      ])
    },
  })

  return Vue.prototype.$tampan
}
