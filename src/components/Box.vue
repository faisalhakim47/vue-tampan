<template>
  <div class="box">
    <div v-if="title" class="box-header" @click="$emit('update:collapsed', !collapsed)">
      <h3 class="box-title">{{ title }}</h3>
      <div class="box-controls">
        <slot name="controls"></slot>
        <i v-if="collapsable" class="material-icons">{{ isCollapsed ? 'arrow_drop_down' : 'arrow_drop_up' }}</i>
      </div>
    </div>
    <div v-if="!isCollapsed" class="box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    collapsable: { type: Boolean, default: false },
    collapsed: { type: Boolean, default: false },
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

<style>
.box {
  border: 1px solid #FFFFFF;
  margin-top: 16px;
  margin-bottom: 16px;
  border-radius: 2px;
}

.is-smallscreen .box {
  margin-top: 12px;
  margin-bottom: 12px;
}

.column>.box {
  margin-top: 8px;
  margin-bottom: 8px;
}

.box-header {
  user-select: none;
  cursor: default;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  padding: 1.25rem;
}

.is-smallscreen .box-header {
  padding: 16px 12px;
}

.box-title {
  font-size: 1.25rem;
  font-weight: 400;
  margin: 0px;
}

.box-controls {
  display: flex;
  flex-direction: row-reverse;
}

.box-content>p {
  margin: 8px 16px;
}

.is-smallscreen .box-content>p {
  margin: 8px 12px;
}

.box-content a {
  text-decoration: none;
}

.box-content a:hover {
  text-decoration: underline;
}

.box-content>ul {
  margin: 16px 0px;
  padding-left: 32px;
}

.box-content ul:first-child {
  margin-top: 0px;
}

.box-content ul>li {
  padding: 8px 0px;
}
</style>