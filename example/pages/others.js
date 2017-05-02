export default {
  render(e) {
    return e('div', { staticClass: 'boxes' }, [
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
                click: () => this.$tampan.createModal({
                  title: 'yakin?',
                  body: (e) => e('field', { props: { label: 'Label' } }, [
                    e('input-text')
                  ]),
                  foot: (e, { resolve, reject }) => e('button', {
                    staticClass: 'button',
                    on: { click: () => resolve(this) }
                  }, 'yay')
                }).then((a) => console.log(a))
              }
            }, 'Modal'),

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
