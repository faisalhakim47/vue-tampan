export default {
  render(e) {
    console.log('notification')
    return e('transition-group', {
      staticClass: 'notification-list',
      props: { name: 'notification-list', mode: 'out-in', tag: 'div' }
    }, [
        ...this.$tampan.notifications.slice(0, 5).map((notification, index) => {
          return e('div', {
            staticClass: `notification-item notification-${notification.type || 'default'}`,
            key: notification.key
          }, [
              e('div', { staticClass: 'notification-header' }, [
                e('h4', { staticClass: 'notification-title' }, notification.title),
                e('div', { staticClass: 'notification-close', on: { click: () => notification.callback(index) } }, [
                  e('i', { staticClass: 'icon material-icons' }, 'close')
                ])
              ]),
              e('div', { staticClass: 'notification-body' }, notification.text)
            ])
        })
      ])
  }
}
