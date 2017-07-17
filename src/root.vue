<template>
  <div id="app">
    <div id="app-container">
      <router-view></router-view>
      <AppSidebar :menuGroupList="$tampan.menuGroupList"></AppSidebar>
    </div>
    <ModalList :items="$tampan.modalList" @close="closeModal"></ModalList>
    <ProgressIndicator></ProgressIndicator>
  </div>
</template>

<script>
import AppSidebar from './components/app-sidebar.vue'
import ModalList from './components/modal-list.vue'
import ProgressIndicator from './components/progress-indicator.vue'

export default {
  components: {
    AppSidebar,
    ModalList,
    ProgressIndicator,
  },

  methods: {
    closeModal(modal) {
      this.$tampan.modalList.splice(
        this.$tampan.modalList.indexOf(modal),
        1
      )
    },
  }
}
</script>
