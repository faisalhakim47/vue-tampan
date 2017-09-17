<template>
  <button class="button" :class="`${color}`" @click="click">
    <i class="button-icon" :class="iconClass">{{ iconText }}</i>
    <span class="button-text"><slot></slot></span>
  </button>
</template>

<script>
  export default {
    props: {
      color: { type: String },
      iconClass: { type: String, default: 'material-icons' },
      iconText: { type: String },
      route: { type: Object },
    },

    methods: {
      click(event) {
        this.$emit('click', event)
        if (this.route) {
          this.$router.push(this.route)
        }
      },
    },
  }

</script>