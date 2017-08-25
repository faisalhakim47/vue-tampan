<template>
  <Modal v-if="isModalExist" class="confirm" @close="rejectConfirm">
    <div slot="header">
      <h2 class="modal__title">{{ confirm.title }}</h2>
    </div>

    <p class="modal__text">{{ confirm.text }}</p>

    <template slot="footer">
      <ButtonTampan iconText="close" @click="confirm.resolve">{{ confirm.rejectText }}</ButtonTampan>
      <ButtonTampan iconText="check" @click="confirm.reject">{{ confirm.resolveText }}</ButtonTampan>
    </template>
  </Modal>
</template>

<script>
export default {
  computed: {
    confirm() {
      return this.$tampan.confirmList[0]
    },

    isConfirmExist() {
      return !!this.confirm
    },
  },
}
</script>
