import { isNumber, isString } from '../../tools/typecheck'
import { randomChar } from '../../tools/string'

export default {
  name: 'input-radio',
  props: {
    options: { type: Array, default: [] },
    value: { type: String },
    direction: { type: String, default: 'vertical' }
  },
  data() {
    return {
      // class name must be started with alphabet
      name: 'r' + randomChar(5),
    }
  },
  methods: {
    change(val) {
      this.$emit('change', val)
    }
  },
  render(e) {
    return e('div', { staticClass: `input input-radio-list is-${this.direction || 'vertical'} is-frameless` },
      this.options.map((opt, index) => {
        if (isString(opt) || isNumber(opt)) opt = { value: opt, label: opt }
        const checked = this.value == opt.value
        const id = this.name + index
        return e('div', { staticClass: 'input-radio' }, [
          e('input', {
            attrs: {
              id,
              type: 'radio',
              name: this.name
            },
            domProps: {
              checked
            }
          }),
          e('label', {
            attrs: { for: id },
            on: {
              click: ({ target }) => this.change({ target, value: opt.value })
            }
          }, [
              opt.label
            ])
        ])
      })
    )
  }
}
