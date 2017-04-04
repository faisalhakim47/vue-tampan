import { isNumber, isString } from '../../tools/typecheck'

export default {
  name: 'input-range',

  props: {
    value: { type: Number }
  },

  methods: {
    change({ target }) {
      const value = parseInt(target.value, 10)
      const updateEvent = { value }
      this.$emit('change', updateEvent)
      this.$emit('input', updateEvent)
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
