export default {
  name: 'input-text',
  props: {
    value: { type: String }
  },
  methods: {
    input({ target }) {
      const { value } = target
      this.$emit('input', { value, target })
    }
  },
  render(e) {
    return e('input', {
      staticClass: 'input input-text',
      attrs: { type: 'text' },
      domProps: { value: this.value },
      on: { input: this.input }
    })
  }
}
