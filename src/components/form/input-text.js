export default {
  name: 'input-text',

  props: {
    value: { type: [String, Number], default: '' },
    type: { type: String },
    placeholder: { type: String },
  },

  methods: {
    input({ target }) {
      const { value } = target
      this.$emit('input', { value })
    }
  },

  render(e) {
    return e('input', {
      staticClass: 'input input-text',
      attrs: { type: this.type || 'text', placeholder: this.placeholder || '' },
      domProps: { value: '' + (this.value || '') },
      on: { input: this.input }
    })
  }
}
