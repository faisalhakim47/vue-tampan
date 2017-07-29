<template>
  <div class="box">
    <div v-if="title" class="box__header" @click="$emit('update:collapsed', !collapsed)">
      <h3 class="box__title">{{ title }}</h3>
      <div class="box__controls">
        <i v-if="collapsable" class="material-icons" style="font-size: 22px;">{{ isCollapsed ? 'arrow_drop_down' : 'arrow_drop_up' }}</i>
      </div>
    </div>
    <div v-if="!isCollapsed" class="box__content">
      <slot></slot>
    </div>
    <div v-if="!isCollapsed && $slots.footer" class="box__footer">
      <slot name="footer"></slot>
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
  border: 1px solid #E0E0E0;
  margin-top: 16px;
  margin-bottom: 16px;
  background-color: #FFFFFF;
  border-radius: 2px;
}

.column>.box {
  margin-top: 8px;
  margin-bottom: 8px;
}

.box__header {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  padding: 16px;
}

.box__title {
  font-size: 18px;
  font-weight: 300;
  margin: 0px;
}

.box_controls {
  display: flex;
  flex-direction: row-reverse;
}

.box__content>p {
  margin: 8px 16px;
}

.box__content a {
  color: #1976D2;
  text-decoration: none;
}

.box__content a:hover {
  color: #1565C0;
  text-decoration: underline;
}

.box__content ul {
  margin: 16px 0px;
  padding-left: 32px;
}

.box__content ul>li {
  padding: 4px 0px;
}

.box__footer {
  display: flex;
  flex-direction: row-reverse;
  padding: 4px 16px;
}
</style>
