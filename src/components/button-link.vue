<template>
  <router-link tag="button" class="button button-link" :class="`button--${color}`" :to="route">
    <i class="button__icon" :class="iconClass">{{ iconText }}</i>
    <span class="button__text">
      <slot></slot>
    </span>
  </router-link>
</template>

<script>
export default {
  props: {
    color: { type: String },
    iconClass: { type: String, default: 'material-icons' },
    iconText: { type: String },
    route: { type: Object },
  }
}
</script>

<style>
.button-link {
  cursor: pointer;
}
</style>
