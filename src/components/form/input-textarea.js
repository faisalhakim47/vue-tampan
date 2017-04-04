export default {
  name: 'input-textarea',
  props: {
    value: { type: String }
  },
  methods: {
    input({ target }) {
      const { value } = target
      this.$emit('input', { value })
    }
  },
  render(e) {
    return e('textarea', {
      staticClass: 'input input-textarea',
      domProps: { value: this.value },
      on: { input: this.input }
    })
  }
}
