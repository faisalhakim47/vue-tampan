export default {
  render(e) {
    console.log('main-header')
    return e('div', { staticClass: 'main-header' }, [
      e('div', { staticClass: 'brand' }, [
        e('div', { staticClass: 'brand-icon' }, [
          e('span', { staticClass: 'material-icons' }, 'face')
        ]),
        e('div', { staticClass: 'brand-name' }, [
          e('h1', { staticClass: 'brand-name-long' }, 'Vue Tampan'),
          e('h1', { staticClass: 'brand-name-short' }, 'Tampan')
        ])
      ]),
      e('div', { staticClass: 'main-navbar-left' }, [
        e('button', {
          staticClass: 'main-navbar-item sidebar-toggle',
          on: { click: this.$tampan.toggleSidebar }
        }, [
            e('span', { staticClass: 'material-icons' }, 'menu')
          ]),
        e('button', {
          staticClass: 'main-navbar-item',
          on: { click: this.$tampan.toggleFullscreen }
        }, [
            e('span', { staticClass: 'material-icons fullscreen-icon' }, 'fullscreen'),
            e('span', { staticClass: 'material-icons fullscreen-exit-icon' }, 'fullscreen_exit')
          ])
      ])
    ])
  }
}
