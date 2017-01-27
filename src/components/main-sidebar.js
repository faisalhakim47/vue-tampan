export default {
  render(e) {
    return e('main-sidebar-container', [
      e('div', { staticClass: 'main-sidebar' }, [
        e('div', { staticClass: 'ganjel' }),
        e('div', { staticClass: 'sidebar-scroll-container' }, [
          e('nav', this.$tampan.sidebarMenus.map((menu) => {
            return e('router-link', { staticClass: 'menu-item ripple', attrs: { to: menu.path } }, [
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
