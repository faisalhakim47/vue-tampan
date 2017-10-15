<template>
  <select ref="input_select" class="input input-select" :value="value" @change="change">
    <option v-for="option in options" :value="option.value" :key="option.value">{{ option.label }}</option>
  </select>
</template>

<script>
import { isNumber } from '../tools/typecheck'

export default {
  props: {
    options: { type: Array, default: () => [] },
    value: { type: [String, Number] }
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
  }
}

</script>