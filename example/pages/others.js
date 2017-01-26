export default {
  render(e) {
    return e('div', { staticClass: 'boxes' }, [
      e('div', { staticClass: 'boxes-header' }, [
        e('h2', { staticClass: 'boxes-title' }, 'Pemberitauan')
      ]),
      e('div', { staticClass: 'box' }, [
        e('div', { staticClass: 'box-header' }, [
          e('h3', { staticClass: 'box-title' }, 'Contoh')
        ]),
        e('div', { staticClass: 'box-body' }, [
          e('p', [
            e('button', {
              staticClass: 'button ripple',
              on: {
                click: () => this.$tampan.notify({
                  title: 'Default',
                  text: 'Default example'
                })
              }
            }, 'Pemberitauan'),
            e('button', {
              staticClass: 'button ripple',
              on: {
                click: () => this.$tampan.confirm({
                  title: 'yakin?',
                  text: 'yakin?'
                })
              }
            }, 'Konfirmasi'),
            e('button', {
              staticClass: 'button ripple',
              on: {
                click: () => this.$tampan.useLoadingState(new Promise((resolve) => {
                  setTimeout(resolve, 3000)
                }))
              }
            }, 'Loading')
          ])
        ])
      ])
    ])
  }
}
