export default {
  render(e) {
    console.log('alert')
    return e('transition-group', {
      staticClass: 'alert-list',
      props: { name: 'list', mode: 'out-in', tag: 'div' }
    }, [
        ...this.$tampan.alerts.slice(0, 5).map((alert, index) => {
          return e('div', {
            staticClass: `alert-item alert-${alert.type || 'default'}`,
            key: alert.key
          }, [
              e('div', { staticClass: 'alert-header' }, [
                e('h4', { staticClass: 'alert-title' }, alert.title),
                e('div', { staticClass: 'alert-close', on: { click: () => alert.callback(index) } }, [
                  e('i', { staticClass: 'icon material-icons' }, 'close')
                ])
              ]),
              e('div', { staticClass: 'alert-body' }, alert.text)
            ])
        })
      ])
  }
}
