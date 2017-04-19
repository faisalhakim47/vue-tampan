export default {
  computed: {
    isNotificationExist() {
      return !!this.$tampan.notifications[0]
    }
  },

  methods: {
    createTimeout() {
      if (!this.isNotificationExist) {
        return
      }
      this.timer = setTimeout(() => {
        this.$tampan.notifications[0].close(0)
      }, 5000)
    },
    clearTimeout() {
      clearTimeout(this.timer)
    }
  },

  watch: {
    '$tampan.notifications'() {
      if (this.isNotificationExist) {
        this.createTimeout()
      }
    }
  },

  render(e) {
    return e('transition-group', {
      staticClass: 'notification-list',
      props: { name: 'notification-list', mode: 'out-in', tag: 'div' },
    }, [
        ...this.$tampan.notifications.slice(0, 5).map((notification, index) => {
          return e('div', {
            staticClass: `notification-item notification-${notification.type || 'default'}`,
            key: notification.key,
            on: {
              mouseenter: this.clearTimeout,
              mouseleave: this.createTimeout
            }
          }, [
              e('div', { staticClass: 'notification-header' }, [
                e('h4', { staticClass: 'notification-title' }, notification.title),
                e('div', { staticClass: 'notification-close', on: { click: () => notification.close(index) } }, [
                  e('i', { staticClass: 'icon material-icons' }, 'close')
                ])
              ]),
              e('div', { staticClass: 'notification-body' }, notification.text)
            ])
        })
      ])
  }
}
