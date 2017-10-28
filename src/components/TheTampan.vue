<template>
  <div class="tampan">
    <slot></slot>
    <ModalList></ModalList>
  </div>
</template>

<script>
import ModalList from './TheModalList.vue'

export default {
  components: {
    ModalList,
  },

  mounted() {
    if (this.$router) {
      this.$router.beforeEach((to, from, next) => {
        
      })
    }
  },
}

</script>