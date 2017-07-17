<template>
  <input class="input input-number" type="number" :value="value" @input="input">
</template>

<script>
export default {
  props: {
    value: { type: Number },
    minValue: { type: Number, default: Number.MIN_SAFE_INTEGER },
    maxValue: { type: Number, default: Number.MAX_SAFE_INTEGER },
  },

  methods: {
    input(event) {
      const value = parseInt(event.target.value, 10)
      if (isNaN(value)) return event.target.value = ''
      const isValid = this.minValue <= value && this.maxValue >= value
      if (isValid) this.$emit('input', value)
      else event.target.value = this.value
    },
  },
}
</script>