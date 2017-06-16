import { ensureArrayType } from '../tools/array'

let num = 1

export default {
  data() {
    return {
      footerItems: [],
      componentUnwatcher: () => { }
    }
  },

  methods: {
    resetFooterItems(route) {
      if (route.matched[0] == undefined) {
        return this.footerItems = []
      }

      const footerItems = route.matched[0].components.default.footerItems

      if (footerItems == undefined || typeof footerItems !== 'function') {
        return this.footerItems = []
      }
      else if (Array.isArray(footerItems)) {
        return this.footerItems = footerItems
      }

      const componentInstance = route.matched[0].instances.default

      // sometime it is just does not exist.
      if (componentInstance == undefined) {
        return setTimeout(() => {
          this.resetFooterItems(route)
        })
      }

      const footerItemsFactory = footerItems.bind(componentInstance)
      let generatedFooterItems = []
      this.componentUnwatcher()
      this.componentUnwatcher = this.$watch(
        () => generatedFooterItems = ensureArrayType(footerItemsFactory(this.$createElement))
          .filter(item => !!item),
        () => this.resetFooterItems(route)
      )

      this.footerItems = generatedFooterItems
    }
  },

  mounted() {
    this.$watch(() => {
      const route = this.$route
      console.log({ route })
      this.$nextTick().then(() => this.resetFooterItems(route))
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
