import { isNumber, isString } from '../../tools/typecheck'

export default {
  name: 'input-select',

  props: {
    options: { type: Array, default: () => [] },
    value: { type: [String, Number], default: '' }
  },

  data() {
    return {
      valueType: typeof this.value
    }
  },

  methods: {
    change({ target }) {
      const numberValue = parseInt(target.value, 10)
      const value = isNaN(numberValue)
        ? target.value
        : numberValue
        const updateEvent = { value }
      this.$emit('change', updateEvent)
      this.$emit('input', updateEvent)
    }
  },

  render(e) {
    const selectVdom = e('select', {
      ref: 'elSelect',
      staticClass: 'input input-select',
      domProps: { value: this.value },
      on: { change: this.change }
    }, this.options.map((opt) => {
      if (isString(opt) || isNumber(opt))
        opt = { value: opt, label: opt }
      return e('option', { domProps: { value: opt.value } }, opt.label)
    }))

    // fix bug on async 'options'
    this.$nextTick(() => this.$refs.elSelect.value = this.value.toString())

    return selectVdom
  },
}
