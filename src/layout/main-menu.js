import { click } from '../tools/events'

export default {

  methods: {
    manageActiveMenu() {

    }
  },

  render(e) {
    return e('div', [
      e('div', { attrs: { id: 'main-menu' } }, [
        e('nav', { attrs: { id: 'main-menu-container' } }, this.$tampan.menuItems.map((menu, index) => {
          switch (menu.type) {
            case 'sparator':
              return e('div', { staticClass: 'main-menu-sparator' }, menu.name)
          }
          const route = menu.route || {
            path: menu.path
          }
          const isSameDomainRoute = !(
            typeof route.path === 'string'
            && route.path.indexOf('http') === 0
          )
          return e(isSameDomainRoute ? 'router-link' : 'a', {
            staticClass: `item`,
            attrs: !isSameDomainRoute ? { href: route.path, title: menu.name } : null,
            props: isSameDomainRoute ? { to: route } : null,
            on: click(ev => {
              if (!isSameDomainRoute) return
              ev.preventDefault()
              this.$nextTick().then(() => {
                this.$router.push(route)
                ev.target.focus()
              })
            })
          }, [
              e('i', { staticClass: 'icon ' + menu.iconClass }, menu.iconText),
              e('span', { staticClass: 'content' }, menu.name)
            ])
        }))
      ]),
      e('transition', { props: { name: 'overlay-fade' } }, [
        this.$tampan.isMainMenuShow && this.$tampan.isMainMenuToggleable
          ? e('div', { attrs: { id: 'mainmenu-overlay' }, on: click(this.$tampan.toggleMainMenu) })
          : null
      ])
    ])
  }
}
