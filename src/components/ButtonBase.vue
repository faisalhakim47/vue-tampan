<template>
  <router-link v-if="route" tag="button" :to="route" class="button" :class="`${color}`" :disabled="disabled">
    <i class="button-icon" :class="iconClass">{{ iconText }}</i>
    <span v-if="$slots.default" class="button-text">
      <slot></slot>
    </span>
  </router-link>
  <button v-else class="button" :class="`${color}`" :disabled="disabled" @click="$emit('click')">
    <i class="button-icon" :class="iconClass">{{ iconText }}</i>
    <span v-if="$slots.default" class="button-text">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  props: {
    disabled: { type: Boolean },
    color: { type: String },
    iconClass: { type: String, default: 'material-icons' },
    iconText: { type: String },
    route: { type: Object },
  },
}

</script>