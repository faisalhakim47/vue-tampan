export default {
  render(e) {
    return e('div', { staticClass: 'main-sidebar-container' }, [
      e('div', { staticClass: 'main-sidebar' }, [
        e('div', { staticClass: 'ganjel' }),
        e('div', { staticClass: 'sidebar-scroll-container' }, [
          e('nav', this.$tampan.sidebarMenus.map((menu) => {
            const isSameDomainRoute = menu.path.indexOf('http') !== 0
            return isSameDomainRoute
              ? e('router-link', {
                staticClass: 'menu-item',
                attrs: { to: menu.path }
              }, [
                  e('i', { staticClass: 'menu-item-icon ' + menu.iconClass }, menu.iconText),
                  e('span', { staticClass: 'menu-item-name' }, menu.name)
                ])
              : e('a', {
                staticClass: 'menu-item',
                attrs: { href: menu.path, title: menu.name }
              }, [
                  e('i', { staticClass: 'menu-item-icon ' + menu.iconClass }, menu.iconText),
                  e('span', { staticClass: 'menu-item-name' }, menu.name)
                ])
          }))
        ])
      ]),
      e('transition', { props: { name: 'overlay-fade' } }, [
        this.$tampan.isSidebarShow && !this.$tampan.client.isLargeScreen
          ? e('div', { staticClass: 'sidebar-overlay', on: { click: this.$tampan.toggleSidebar } })
          : null
      ])
    ])
  }
}
