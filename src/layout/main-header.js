export default {
  render(e) {
    return e('div', { staticClass: 'main-header' }, [
      e('div', { staticClass: 'main-navbar' }, [
        e('div', { staticClass: 'main-navbar-left' }, [
          e('div', { staticClass: 'brand' }, [
            e('div', { staticClass: 'brand-icon' }, [
              this.$tampan.brandImageIconUrl
                ? e('img', { staticClass: this.$tampan.brandIconClass, attrs: { src: this.$tampan.brandImageIconUrl } })
                : e('span', { staticClass: this.$tampan.brandIconClass }, this.$tampan.brandIconText)
            ]),
            e('div', { staticClass: 'brand-name' }, [
              this.$tampan.client.isLargeScreen
                ? e('h1', { staticClass: 'brand-name-text' }, this.$tampan.brandName || '')
                : e('h1', { staticClass: 'brand-name-text' }, this.$tampan.brandShortName || '')
            ])
          ])
        ]),
        e('div', { staticClass: 'main-navbar-right' }, [
          this.$tampan.sidebarMenus.length
            ? e('button', {
              staticClass: 'main-navbar-item sidebar-toggle',
              on: { click: this.$tampan.toggleSidebar }
            }, [
                e('span', { staticClass: 'icon material-icons' }, this.$tampan.isSidebarShow ? 'close' : 'menu')
              ])
            : null
        ])
      ])
    ])
  }
}
