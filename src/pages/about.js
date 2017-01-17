export default {
  render(e) {
    return e('div', { staticClass: 'boxes' }, [
      e('div', { staticClass: 'boxes-header' }, [
        e('h2', { staticClass: 'boxes-title' }, 'Tentang')
      ]),
      e('div', { staticClass: 'box' }, [
        e('div', { staticClass: 'box-header' }, [
          e('h3', { staticClass: 'box-title' }, 'Perkenalan')
        ]),
        e('div', { staticClass: 'box-body' }, [
          e('p', [
            'Pertama'
          ]),
          e('p', [
            'Pertama'
          ]),
          e('p', [
            'Pertama'
          ])
        ]),
      ])
    ])
  }
}
