import { ensureArrayType } from '../tools/array'
import { click } from '../tools/events'

export default {
  render(e) {
    return e('div', { attrs: { id: 'main-header' } }, [
      e('div', { staticClass: 'item brand' }, [
        e('img', { staticClass: 'icon', attrs: { src: this.$tampan.brandImageIconUrl } }),
        e('span', { staticClass: 'text' }, this.$tampan.brandName),
      ]),
      ...ensureArrayType(this.$tampan.headerItems),
      this.$tampan.isMainMenuToggleable
        ? e('div', {
          staticClass: 'item mainmenu-toggle',
          attrs: {
            role: 'button',
            style: 'margin-left: auto;'
          },
          on: click(() => this.$tampan.toggleMainMenu())
        }, [
            e('i', { staticClass: 'icon material-icons' }, this.$tampan.isMainMenuShow ? 'close' : 'menu'),
          ])
        : null,
    ])
  }
}
