import Vue from 'vue'
import nprogress from 'nprogress'
import { getClienDeviceInfo } from './tools/client-device'

export function initiateTampan(mixin) {
  return new Vue({
    mixins: [mixin],

    data() {
      const client = getClienDeviceInfo()
      return {
        client,
        modalList: [],
        loadingCount: 0,
        isSidebarShow: !client.isSmallScreen,
      }
    },

    computed: {
      isSidebarToggleable() {
        return this.client.isSmallScreen
      },
      isSidebarVisible() {
        if (!this.isSidebarToggleable) return true
        if (this.isSidebarShow) return true
        return false
      },
    },

    watch: {
      'loadingCount'(loadingCount, oldLoadingCount) {
        if (loadingCount === 0) {
          nprogress.done(true)
        } else if (loadingCount > 0) {
          if (oldLoadingCount === 0) {
            nprogress.start()
          } else if (oldLoadingCount > loadingCount) {
            nprogress.inc()
          }
        }
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
      useLoadingState(promiseWork) {
        const finish = () => this.reduceLoadingState()
        this.addLoadingState()
        this.$nextTick().then(() => promiseWork)
          .then(finish)
          .catch(finish)
        return promiseWork
      },

      alert({ title = '', text = '', confirmText = 'Tutup' }) {
        return new Promise((resolve) => {
          const alert = {
            type: 'alert',
            title,
            text,
            resolve: () => {
              this.modalList.splice(this.modalList.indexOf(alert), 1)
              resolve()
            }
          }
          this.modalList.push(alert)
        })
      },

      confirm({
        title = 'Apakah anda yakin?',
        text = '',
        resolveText = 'Yakin',
        rejectText = 'Batal'
      }) {
        return new Promise((resolve, reject) => {
          var close = () => {
            this.modalList.splice(this.modalList.indexOf(confirm), 1)
          }
          var confirm = {
            type: 'confirm',
            title,
            text,
            resolveText,
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
          this.modalList.push(confirm)
        })
      },
    },
  })
}
