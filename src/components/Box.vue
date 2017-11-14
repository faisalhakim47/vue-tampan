<template>
  <div class="box">
    <div v-if="title" class="box-header" @click="$emit('update:collapsed', !collapsed)">
      <h3 class="box-title">{{ title }}</h3>
      <div class="box-controls">
        <slot name="controls"></slot>
        <i v-if="collapsable" class="material-icons">{{ isCollapsed ? 'arrow_drop_down' : 'arrow_drop_up' }}</i>
      </div>
    </div>
    <div v-if="!isCollapsed" class="box-content" :style="{ overflowX : overflowX ? 'auto' : 'hidden' }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    collapsable: { type: Boolean, default: false },
    collapsed: { type: Boolean, default: false },
    overflowX: { type: Boolean, default: false },
    title: { type: String },
  },

  computed: {
    isCollapsed() {
      if (!this.collapsable) return false
      if (this.collapsed) return true
      return false
    },
  },
}

</script>