<template>
  <div class="tampan">
    <slot></slot>
    <ModalList></ModalList>
    <ProgressIndicator></ProgressIndicator>
  </div>
</template>

<script>
  import ModalList from './dialog/modal-list.vue'
  import ProgressIndicator from './misc/progress-indicator.vue'

  export default {
    components: {
      ModalList,
      ProgressIndicator,
    },
  }

</script>