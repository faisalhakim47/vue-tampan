import { ensureArrayType } from '../tools/array'

export default {
  computed: {
    footerItems() {
      const footerItems = this.$route.matched[0].components.default.footerItems
      if (typeof footerItems !== 'function') {
        return []
      }
      const footerItemsFactory = footerItems.bind(
        this.$route.matched[0].instances.default
      )
      return ensureArrayType(footerItemsFactory(this.$createElement))
        .filter(item => !!item)
    }
  },
  render(e) {
    const isEmpty = this.footerItems.length === 0
    return e('div', {
      attrs: { id: 'main-footer' },
      staticClass: isEmpty ? 'is-empty' : null
    }, this.footerItems)
  }
}
