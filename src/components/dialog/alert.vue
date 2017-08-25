<template>
  <Modal v-if="isModalExist" class="alert" @close="closeAlert">
    <div slot="header">
      <h2 class="alert__title">{{ alert.title }}</h2>
    </div>

    <p class="alert__text">{{ alert.text }}</p>

    <template slot="footer">
      <ButtonTampan iconText="close">Tutup</ButtonTampan>
    </template>
  </Modal>
</template>

<script>
export default {
  computed: {
    alert() {
      return this.$tampan.alertList[0]
    },

    isAlertExist() {
      return !!this.alert
    },
  },

  methods: {
    closeAlert() {
      this.alert.close()
    },
  },
}
</script>
