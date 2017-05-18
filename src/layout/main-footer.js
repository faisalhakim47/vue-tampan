import { ensureArrayType } from '../tools/array'

let num = 1

export default {
  data() {
    return {
      footerItems: []
    }
  },

  methods: {
    footerItemsFromRoute(route) {
      if (route.matched[0] == undefined) return []

      const footerItems = route.matched[0].components.default.footerItems

      if (footerItems == undefined || typeof footerItems !== 'function') return []
      else if (Array.isArray(footerItems)) return footerItems

      const componentInstance = route.matched[0].instances.default

      // sometime it is just does not exist.
      if (componentInstance == undefined) {
        setTimeout(() => {
          this.footerItems = this.footerItemsFromRoute(route)
        })
        return []
      }

      const footerItemsFactory = footerItems.bind(componentInstance)

      return ensureArrayType(footerItemsFactory(this.$createElement))
        .filter(item => !!item)
    }
  },

  mounted() {
    this.footerItems = this.footerItemsFromRoute(this.$route)
    this.$watch(() => {
    })
    this.$watch(() => {
      const route = this.$route
      this.$nextTick().then(() => {
        this.footerItems = this.footerItemsFromRoute(route)
      })
    })
  },

  render(e) {
    const isEmpty = this.footerItems.length === 0
    return e('div', {
      attrs: { id: 'main-footer' },
      staticClass: isEmpty ? 'is-empty' : null
    }, this.footerItems)
  }
}
