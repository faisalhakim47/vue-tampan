import { ensureArrayType } from '../tools/array'
import { click } from '../tools/events'

export default {
  computed: {
    isMenuExist() {
      return this.$tampan.menuItems.length !== 0
    }
   },

  watch: {
    '$tampan.isMainMenuShow'(newVal) {
      const el_menu_toggle = this.$refs.menu_toggle
      if (!el_menu_toggle) return
      this.$refs.menu_toggle.textContent = newVal ? 'close' : 'menu'
    }
  },

  render(e) {
    return e('div', { attrs: { id: 'main-header' } }, [
      e('div', { staticClass: 'item brand' }, [
        e('img', { staticClass: 'icon', attrs: { src: this.$tampan.brandImageIconUrl } }),
        e('span', { staticClass: 'text' }, this.$tampan.brandName),
      ]),
      ...ensureArrayType(this.$tampan.headerItems),
      this.$tampan.isMainMenuToggleable && this.isMenuExist
        ? e('div', {
          staticClass: 'item mainmenu-toggle',
          attrs: {
            role: 'button',
            style: 'margin-left: auto;'
          },
          on: click(() => {
            this.$tampan.toggleMainMenu()
            const el_menu_toggle = this.$refs.menu_toggle
            el_menu_toggle.textContent = el_menu_toggle.textContent === 'close' ? 'menu' : 'close'
          })
        }, [
            e('i', { ref: 'menu_toggle', staticClass: 'icon material-icons' }, 'menu'),
          ])
        : null,
    ])
  }
}
