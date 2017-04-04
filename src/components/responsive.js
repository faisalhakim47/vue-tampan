import { ensureArrayType } from '../tools/array'

export const Row = {
  props: {
    largeScreenSizes: { type: Array, default: () => [] },
    mediumScreenSizes: { type: Array, default: () => [] },
    smallScreenSizes: { type: Array, default: () => [] },
  },

  computed: {
    isSmallScreen() {
      return this.$tampan.client.isSmallScreen
    },
    isMediumScreen() {
      return this.$tampan.client.isMediumScreen
    },
    isLargeScreen() {
      return this.$tampan.client.isLargeScreen
    }
  },

  render(e) {
    return e('div', { staticClass: 'row' }, this.$children.map((child, index) => {
      child = ensureArrayType(child)
      return e('div', { staticClass: 'column' }, child)
    }))
  }
}
