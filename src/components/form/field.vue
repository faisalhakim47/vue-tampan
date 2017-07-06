<template>
  <div class="field" :class="{ 'is-inline': direction === 'vertical' }">
    <div class="field-label">
      <label for="">{{ label }}</label>
    </div>
    <div class="field-info">
      <p>{{ info }}</p>
    </div>
    <div class="field-input">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'field',

  props: {
    label: { type: String },
    info: { type: String },
    direction: { type: String, default: 'vertical' }
  },
}
</script>
