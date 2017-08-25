import Vue from 'vue'
import { getClienDeviceInfo } from './tools/client-device'






export const tampan = new Vue({
  data() {
    const client = getClienDeviceInfo()
    return {
      client,
      alertList: [],
      confirmList: [],
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
          title,
          text,
          close: () => {
            this.alertList.splice(this.alertList.indexOf(alert), 1)
            resolve()
          }
        }
        this.alertList.push(alert)
      })
    },

    confirm({
      title = 'Apakah anda yakin?',
      text = '',
      resolveText = 'Yakin',
      rejectText = 'Batal'
    }) {
      return new Promise((resolve, reject) => {
        const confirm = {
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
        const close = () => {
          this.confirmList.splice(this.confirmList.indexOf(confirm), 1)
        }
      })
    },
  },
})
