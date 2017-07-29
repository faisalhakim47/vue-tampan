<template>
  <button class="button" :class="`button--${color}`" @click="$emit('click', $event)">
    <i class="button__icon" :class="iconClass">{{ iconText }}</i>
    <span class="button__text">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  props: {
    color: { type: String },
    iconClass: { type: String, default: 'material-icons' },
    iconText: { type: String },
  }
}
</script>