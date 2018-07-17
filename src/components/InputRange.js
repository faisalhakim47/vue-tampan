import { isNumber } from '../tools/typecheck.js'

export default {
  props: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 1 },
    value: { type: [Number] },
    disabled: { type: Boolean, default: false },
    prefixIconText: { type: String },
    sufixIconText: { type: String },
  },

  methods: {
    input(event) {
      let newValue = isNumber(this.value)
        ? parseInt(event.target.value, 10)
        : event.target.value
      this.$emit('input', newValue)
    },
  },

  updated() {
    this.$refs.input_select.value = this.value || ''
  },

  template: `
    <div class="input input-range">
      <i v-if="prefixIconText" class="prefix icon material-icons">{{ prefixIconText }}</i>
      <input
        ref="input_select"
        type="range"
        :disabled="disabled"
        :value="value"
        :max="max"
        :min="min"
        :step="step"
        @input="input"
      >
      <i v-if="sufixIconText" class="suffix icon material-icons">{{ sufixIconText }}</i>
    </div>
  `
}
