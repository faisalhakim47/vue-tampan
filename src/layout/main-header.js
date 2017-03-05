export default {
  render(e) {
    return e('div', { staticClass: 'main-header' }, [
      e('div', { staticClass: 'brand' }, [
        e('div', { staticClass: 'brand-icon' }, [
          this.$tampan.brandImageIconUrl
            ? e('img', { staticClass: this.$tampan.brandIconClass, attrs: { src: this.$tampan.brandImageIconUrl } })
            : e('span', { staticClass: this.$tampan.brandIconClass }, this.$tampan.brandIconText)
        ]),
        e('div', { staticClass: 'brand-name' }, [
          e('h1', { staticClass: 'brand-name-text' }, this.$tampan.brandName)
        ])
      ]),
      e('div', { staticClass: 'main-navbar-left' }, [
        this.$tampan.sidebarMenus.length
          ? e('button', {
            staticClass: 'main-navbar-item sidebar-toggle',
            on: { click: this.$tampan.toggleSidebar }
          }, [
              e('span', { staticClass: 'icon material-icons' }, 'menu'),
              // e('span', { staticClass: 'text' }, 'Menu')
            ])
          : null,
        // e('button', {
        //   staticClass: 'main-navbar-item',
        //   on: { click: this.$tampan.toggleFullscreen }
        // }, [
        //     e('span', { staticClass: 'material-icons fullscreen-icon' }, 'fullscreen'),
        //     e('span', { staticClass: 'material-icons fullscreen-exit-icon' }, 'fullscreen_exit')
        //   ])
      ])
    ])
  }
}
