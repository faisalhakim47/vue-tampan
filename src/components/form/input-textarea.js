export default {
  name: 'input-textarea',
  props: ['value'],
  methods: {
    input({ target }) {
      const { value } = target
      this.$emit('input', { value, target })
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
