<template>
  <div class="page">
    <div class="page__header">
      <ButtonTampan v-if="titleButton === 'menu' && $tampan.isMainMenuToggleable" class="page__title-button" @click="$tampan.toggleMainMenu" iconClass="material-icons" iconText="menu"></ButtonTampan>
  
      <ButtonTampan v-else-if="titleButton === 'back'" class="page__title-button" @click="back" iconClass="material-icons" iconText="arrow_back"></ButtonTampan>
  
      <h1 class="page__title">{{ title }}</h1>
    </div>
    <div class="page__navigation">
  
    </div>
    <div class="page__content">
      <slot></slot>
    </div>
    <div class="page__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import ButtonTampan from './button.vue'
import { getRootInstance } from '../tampan'

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
      getRootInstance().then((root) => {
        root.$router.go(-1)
      })
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

.page__header {
  box-sizing: border-box;
  flex-basis: 64px;
  min-height: 64px;
  max-height: 64px;
  background-color: #43A047;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding-left: 16px;
}

.is-smallscreen .page__header {
  flex-basis: 56px;
  min-height: 56px;
  max-height: 56px;
}

button.page__title-button {
  cursor: pointer;
  background-color: unset;
  border: none;
  color: #FFFFFF;
}

button.page__title-button:hover {
  background-color: unset;
  border: none;
}

button.page__title-button>.button__icon {
  font-size: 26px;
}

.page__title {
  box-sizing: border-box;
  font-size: 24px;
  font-weight: 400;
  margin: 0px;
  line-height: 64px;
  color: #FFF;
}

.page__content {
  box-sizing: border-box;
  padding: 16px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}

.is-smallscreen .page__content {
  padding: 4px;
}

.page__footer {
  min-height: 44px;
  max-height: 44px;
}
</style>
