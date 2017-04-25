export default {
  render(e) {
    return e('div', { staticClass: 'main-sidebar-container' }, [
      e('div', { staticClass: 'main-sidebar' }, [
        e('div', { staticClass: 'ganjel' }),
        e('div', { staticClass: 'sidebar-scroll-container' }, [
          e('nav', this.$tampan.sidebarMenus.map((menu) => {
            const route = menu.$route = menu.$route
              || this.$router.options.routes.find((route) => {
                return typeof menu.route === 'object'
                  ? (route.name === menu.route.name)
                  : (route.path === menu.path)
              })
              || {
                path: menu.path
              }
            const isSameDomainRoute = !(
              typeof route.path === 'string'
              && route.path.indexOf('http') === 0
            )
            const activeClass = isSameDomainRoute && this.$route.path.indexOf(route.path) === 0
              ? 'is-active' : ''
            const href = (isSameDomainRoute && this.$router.mode === 'hash')
              ? `#${route.path}`
              : route.path
            return e('a', {
              staticClass: `menu-item ${activeClass}`,
              attrs: { href, title: menu.name },
              on: {
                click: ev => {
                  if (!isSameDomainRoute) return
                  ev.preventDefault()
                  this.$router.push(route)
                }
              }
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
