import { isNumber, isString } from '../../tools/typecheck'

export default {
  name: 'input-select',

  props: {
    options: { type: Array, default: [] },
    value: { type: [String, Number], required: true }
  },

  data() {
    return {
      valueType: typeof this.value
    }
  },

  methods: {
    change({ target }) {
      const value = this.valueType === 'number'
        ? parseInt(target.value, 10)
        : target.value
      this.$emit('change', { value, target })
    }
  },

  render(e) {
    return e('select', {
      staticClass: 'input input-select',
      domProps: { value: this.value },
      on: { change: this.change }
    }, this.options.map((opt) => {
      if (isString(opt) || isNumber(opt))
        opt = { value: opt, label: opt }
      return e('option', { attrs: { value: opt.value } }, opt.label)
    }))
  }
}
