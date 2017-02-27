export default {
  props: {
    items: { type: Array, default: () => [] }
  },

  computed: {
    firstItem() {
      return {
        iconClass: 'material-icons',
        iconText: 'home',
        onclick: () => this.$tampan.toggleSidebar()
      }
    },

    availableItems() {
      return [
        this.firstItem,
        ...this.items
      ]
    }
  },

  render(e) {
    return e('ul', { staticClass: 'breadcrumb-list' }, this.availableItems((item) => {
      const itemContent = [
        item.iconClass
          ? e('span', { staticClass: `icon ${item.iconClass}` }, item.iconText)
          : null,
        item.text
      ]
      return e('li', { staticClass: 'breadcrumb-item' }, [
        item.path
          ? e('router-link', { props: { to: item.path } }, itemContent)
          : e('span', itemContent)
      ])
    }))
  }
}
