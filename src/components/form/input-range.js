import { isNumber, isString } from '../../tools/typecheck'

export default {
  name: 'input-range',

  props: {
    value: { type: Number, required: true }
  },

  methods: {
    change({ target }) {
      const value = parseInt(target.value, 10)
      this.$emit('change', { value, target })
    }
  },

  render(e) {
    return e('div', { staticClass: 'input-range' }, [
      e('input', {
        type: 'range',
        staticClass: 'input input-select',
        domProps: { value: this.value },
        on: { change: this.change }
      })
    ])
  }
}
