import { isNumber, isString } from '../../tools/typecheck'
import { randomChar } from '../../tools/string'

export default {
  name: 'input-checkbox',
  props: ['options', 'value', 'direction'],
  data() {
    let value = this.value || []
    if (isNumber(value) || isString(value)) {
      value = [value.toString()]
    }
    return {
      name: randomChar(5),
      selected: [...value]
    }
  },
  methods: {
    update() {
      const target = document.querySelectorAll(`input[type=checkbox][name=${this.name}]:checked`)
      const elLen = target.length
      const value = []
      for (let i = 0; i < elLen; i++) {
        value.push(target.item(i).value)
      }
      this.$emit('change', { target, value })
    }
  },
  render(e) {
    return e('div', { staticClass: `input input-checkbox-list is-${this.direction || 'vertical'} is-frameless` },
      this.options.map((opt, index) => {
        if (isString(opt) || isNumber(opt)) opt = { value: opt, label: opt }
        const checked = this.value.indexOf(opt.value) !== -1
        const id = this.name + index
        return e('div', {
          staticClass: 'input-checkbox',
          on: { click: this.update }
        }, [
            e('input', {
              attrs: { id, type: 'checkbox', name: this.name, value: opt.value },
              domProps: { checked }
            }),
            e('label', {
              attrs: { for: id }
            }, [
                opt.label
              ])
          ])
      })
    )
  }
}
