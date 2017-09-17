<template>
  <div class="page">
    <div class="page-header">
      <ButtonTampan v-if="titleButton === 'menu' && $tampan.isSidebarToggleable" class="page-title-button" @click="$tampan.toggleSidebar"
        iconClass="material-icons" iconText="menu"></ButtonTampan>
      <ButtonTampan v-else-if="titleButton === 'back'" class="page-title-button" @click="back" iconClass="material-icons" iconText="arrow_back"></ButtonTampan>
      <h1 class="page-title">{{ title }}</h1>
    </div>
    <div class="page-content">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="page-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  import ButtonTampan from '../element/button-tampan.vue'

  export default {
    props: {
      titleButton: { type: String },
      title: { type: String },
    },

    components: {
      ButtonTampan
    },

    methods: {
      back() {
        this.$router.go(-1)
      },
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
    font-size: 26px;
  }

  .page-title {
    box-sizing: border-box;
    font-size: 24px;
    font-weight: 400;
    margin: 0px;
    line-height: 64px;
  }

  .page-content {
    box-sizing: border-box;
    padding: 16px;
    flex: 1;
    overflow-y: scroll;
    overflow-x: hidden;
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