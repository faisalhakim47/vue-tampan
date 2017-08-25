<template>
  <input class="input input-text" :type="type || 'text'" :value="value" @input="input">
</template>

<script>
export default {
  props: {
    value: { type: String },
    type: { type: String },
    minLength: { type: Number, default: Number.MIN_SAFE_INTEGER },
    maxLength: { type: Number, default: Number.MAX_SAFE_INTEGER },
  },

  methods: {
    input(event) {
      const value = event.target.value
      const isValid = this.minLength <= value.length && this.maxLength >= value.length
      if (isValid) this.$emit('input', value)
      else event.target.value = this.value
    },
  },
}
</script>