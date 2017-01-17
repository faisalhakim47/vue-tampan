export default {
  data() {
    return {
      inputText: 'text',
      inputOptions: ['Satu', 'Dua', 'Tiga'],
      inputOptionsValue: 'Satu',
      inputOptionsValues: ['Satu', 'Dua'],
      inputDate: new Date(2002, 2, 2)
    }
  },
  render(e) {
    return e('div', { staticClass: 'boxes' }, [
      e('div', { staticClass: 'boxes-header' }, [
        e('h2', { staticClass: 'boxes-title' }, 'Formulir')
      ]),

      e('div', { staticClass: 'box' }, [
        e('div', { staticClass: 'box-header' }, [
          e('h3', { staticClass: 'box-title' }, 'Biasa')
        ]),
        e('div', { staticClass: 'box-body' }, [
          e('field', { props: { label: 'Text' } }, [
            e('input-text', {
              props: { value: this.inputText },
              on: { input: ({ value }) => this.inputText = value }
            })
          ]),
          e('field', { props: { label: 'Text Area' } }, [
            e('input-textarea', {
              props: { value: this.inputText },
              on: { input: ({ value }) => this.inputText = value }
            })
          ])
        ])
      ]),

      e('div', { staticClass: 'box' }, [
        e('div', { staticClass: 'box-header' }, [
          e('h3', { staticClass: 'box-title' }, 'Pilihan')
        ]),
        e('div', { staticClass: 'box-body' }, [
          e('field', { props: { label: 'Dropdown' } }, [
            e('input-select', {
              props: { options: this.inputOptions, value: this.inputOptionsValue },
              on: { change: ({ value }) => this.inputOptionsValue = value }
            })
          ]),
          e('field', { props: { label: 'Radio Vertikal' } }, [
            e('input-radio', {
              props: {
                value: this.inputOptionsValue,
                options: this.inputOptions
              },
              on: { change: ({ value }) => this.inputOptionsValue = value }
            })
          ]),
          e('field', { props: { label: 'Radio Horizontal' } }, [
            e('input-radio', {
              props: {
                direction: 'horizontal',
                value: this.inputOptionsValue,
                options: this.inputOptions
              },
              on: { change: ({ value }) => this.inputOptionsValue = value }
            })
          ])
        ])
      ]),

      e('div', { staticClass: 'box' }, [
        e('div', { staticClass: 'box-header' }, [
          e('h3', { staticClass: 'box-title' }, 'Pilihan Ganda')
        ]),
        e('div', { staticClass: 'box-body' }, [
          e('field', { props: { label: 'Checkbox Vertikal' } }, [
            e('input-checkbox', {
              props: {
                options: this.inputOptions,
                value: this.inputOptionsValues
              },
              on: {
                change: ({ value }) => this.inputOptionsValues = value
              }
            })
          ]),
          e('field', { props: { label: 'Checkbox Horizontal' } }, [
            e('input-checkbox', {
              props: {
                direction: 'horizontal',
                value: this.inputOptionsValues,
                options: this.inputOptions
              },
              on: {
                change: ({ value }) => this.inputOptionsValues = value
              }
            })
          ]),
          e('p', [
            this.inputOptionsValues.join(', ')
          ])
        ])
      ]),

      e('div', { staticClass: 'box' }, [
        e('div', { staticClass: 'box-header' }, [
          e('h3', { staticClass: 'box-title' }, 'Tanggal')
        ]),
        e('div', { staticClass: 'box-body' }, [
          e('field', { props: { label: this.inputDate.toString() } }, [
            e('input-date', {
              props: { value: this.inputDate },
              on: {
                change: ({ value }) => {
                  this.inputDate = value
                  this.$forceUpdate()
                }
              }
            })
          ])
        ])
      ])
    ])
  }
}

console.log(new Date(2002, 2, 2))
