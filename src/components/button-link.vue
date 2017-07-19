<template>
  <router-link tag="button" class="button button-link" :to="route">
    <i class="button__icon" :class="iconClass">{{ iconText }}</i>
    <span class="button__text">
      <slot></slot>
    </span>
  </router-link>
</template>

<script>
export default {
  props: {
    iconClass: { type: String },
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

