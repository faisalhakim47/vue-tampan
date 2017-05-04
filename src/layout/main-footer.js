import { ensureArrayType } from '../tools/array'

export default {
  render(e) {
    const footerItems = ensureArrayType(this.$tampan.footerItems)
      .filter(item => !!item)
    const isEmpty = footerItems.length === 0
    return e('div', {
      attrs: { id: 'main-footer' },
      staticClass: isEmpty ? 'is-empty' : null
    }, footerItems)
  }
}
