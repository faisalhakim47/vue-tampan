import { isNumber } from '../tools/typecheck.js'

export default {
  props: {
    options: { type: Array, default: () => [] },
    value: { type: [String, Number] },
    disabled: { type: Boolean, default: false },
  },


  methods: {
    change(event) {
      let newVal = isNumber(this.value)
        ? parseInt(event.target.value, 10)
        : event.target.value
      this.$emit('input', newVal)
    }
  },

  updated() {
    this.$refs.input_select.value = this.value || ''
  },

  template: `
    <select
      ref="input_select"
      class="input input-select"
      :disabled="disabled"
      :value="value"
      @change="change"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >{{ option.label }}</option>
    </select>
  `
}
