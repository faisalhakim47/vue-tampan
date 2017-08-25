<template>
  <textarea class="input input-textarea" type="text" :value="value" @input="input">
  </textarea>
</template>

<script>
export default {
  props: {
    value: { type: String }
  },

  methods: {
    input(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>