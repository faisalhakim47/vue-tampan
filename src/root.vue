<template>
  <div id="app">
    <div id="app-container">
      <router-view></router-view>
      <Sidebar></Sidebar>
    </div>
    <Confirm></Confirm>
    <Alert></Alert>
    <ProgressIndicator></ProgressIndicator>
  </div>
</template>

<script>
import Alert from './components/dialog/alert.vue'
import Confirm from './components/dialog/confirm.vue'
import Sidebar from './components/layout/sidebar.vue'
import ProgressIndicator from './components/progress-indicator.vue'

export default {
  components: {
    Alert,
    Confirm,
    Sidebar,
    ProgressIndicator,
  },
}
</script>
