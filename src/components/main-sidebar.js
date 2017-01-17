export default {
  render(e) {
    console.log('main-sidebar')
    return e('div', { staticClass: 'main-sidebar' }, [
      e('nav', this.$tampan.sidebarMenus.map((menu) => {
        return e('router-link', { staticClass: 'menu-item ripple', attrs: { to: menu.path } }, [
          e('i', { staticClass: 'menu-item-icon ' + menu.iconClass }, menu.iconText),
          e('span', { staticClass: 'menu-item-name' }, menu.name)
        ])
      }))
    ])
  }
}
