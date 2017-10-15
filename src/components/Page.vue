<template>
  <div class="page">
    <div v-if="$slots.header" class="page-header">
      <slot name="header"></slot>
    </div>
    <!-- <div class="page-header">
      <button-base v-if="titleButton === 'menu' && $tampan.isSidebarToggleable" class="page-title-button" @click="$tampan.toggleSidebar" icon-class="material-icons" icon-text="menu"></button-base>
      <button-base v-else-if="titleButton === 'back'" class="page-title-button" @click="back" icon-class="material-icons" icon-text="arrow_back"></button-base>
      <h1 class="page-title">{{ title }}</h1>
    </div> -->
    <div class="page-content" :style="{ overflowY: overflowY ? 'scroll' : 'hidden', overflowX: overflowX ? 'scroll' : 'hidden', padding: noPadding ? '0px' : 'auto' }">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="page-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    overflowY: { type: Boolean, default: true },
    overflowX: { type: Boolean, default: false },
    noPadding: { type: Boolean, default: false },
  },
}

</script>

<style>
.page {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100%;
}

.page-header {
  user-select: none;
  cursor: default;
  box-sizing: border-box;
  height: 56px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding-left: 16px;
}

.is-smallscreen .page-header {
  padding-left: 0px;
}

.is-sidebar-toggleable .page-header {
  position: relative;
  box-shadow: 0px -2px 10px #000000;
}

button.page-title-button {
  cursor: pointer;
  background-color: unset;
  border: none;
}

button.page-title-button:hover {
  background-color: unset;
  border: none;
}

button.page-title-button>.button-icon {
  font-size: 1.75rem;
}

.page-title {
  box-sizing: border-box;
  font-size: 1.75rem;
  font-weight: 400;
  margin: 0px;
  line-height: 64px;
}

.is-smallscreen .page-title:first-child {
  margin-left: 12px;
}

.page-content {
  box-sizing: border-box;
  padding: 16px;
  flex: 1;
}

.is-smallscreen .page-content {
  padding: 4px;
}

.page-footer {
  box-sizing: border-box;
  min-height: 44px;
  max-height: 44px;
  display: flex;
  align-items: center;
  align-content: center;
  flex-direction: row-reverse;
  border-top: 1px solid #FFFFFF;
}
</style>