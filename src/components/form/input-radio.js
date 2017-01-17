import { isNumber, isString } from '../../tools/typecheck'
import { randomChar } from '../../tools/string'

export default {
  name: 'input-radio',
  props: ['options', 'value', 'direction'],
  data() {
    return {
      name: randomChar(5)
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
