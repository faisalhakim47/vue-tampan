<template>
  <div class="element-factory">
    <div v-for="(item, index) in items" class="element-factory__item" :key="index">
  
      <ButtonTampan v-if="item.type === 'button'" @click="item.onClick" :iconClass="item.iconClass" :iconText="item.iconText">{{ item.text }}</ButtonTampan>
  
    </div>
  </div>
</template>

<script>
import ButtonTampan from './button.vue'

export default {
  props: {
    items: { type: Array, required: true },
  },

  components: {
    ButtonTampan
  },
}
</script>

<style>
.element-factory {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
}
</style>
