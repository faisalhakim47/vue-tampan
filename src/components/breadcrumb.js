export default {
  props: {
    items: { type: Array, default: () => [] }
  },

  computed: {
    availableItems() {
      return this.items
    }
  },

  methods: {
    toggleSidebar() {
      return this.$tampan.client.isLargeScreen ? null : this.$tampan.toggleSidebar()
    },
  },

  render(e) {
    return e('ul', { staticClass: 'breadcrumb-list' }, [
      e('li', { staticClass: 'breadcrumb-item', on: { click: this.toggleSidebar } }, [
        e('span', { staticClass: 'icon material-icons', attrs: { style:  'padding-left: 0px' } }, 'menu')
      ]),
      ...this.availableItems.map((item) => {
        const itemContent = [
          item.iconClass
            ? e('span', { staticClass: `icon ${item.iconClass}` }, item.iconText)
            : null,
          item.text
        ]
        const event = {}
        if (item.onclick) event.click = item.onclick
        return e('li', { staticClass: 'breadcrumb-item', on: event }, [
          item.path
            ? e('router-link', { props: { to: item.path } }, itemContent)
            : e('span', itemContent)
        ])
      })
    ])
  }
}
