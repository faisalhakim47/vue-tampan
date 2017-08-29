<template>
  <Modal v-if="isModalExist" @close="(modal.type === 'alert' ? modal.resolve : modal.rejectModal)()">
    <div slot="header">
      <h2 class="modal-title">{{ modal.title }}</h2>
    </div>

    <p class="modal-text">{{ modal.text }}</p>

    <template slot="footer">
      <div class="button-group" style="text-align: right;">
        <ButtonTampan v-if="modal.type === 'alert'" iconText="close" @click="modal.resolve">Tutup</ButtonTampan>
        <ButtonTampan v-if="modal.type === 'confirm'" iconText="close" @click="modal.reject">{{ modal.rejectText }}</ButtonTampan>
        <ButtonTampan v-if="modal.type === 'confirm'" iconText="check" @click="modal.resolve">{{ modal.resolveText }}</ButtonTampan>
      </div>
    </template>
  </Modal>
</template>

<script>
  import Modal from './modal.vue'
  import ButtonTampan from '../element/button.vue'

  export default {
    components: {
      Modal,
      ButtonTampan,
    },

    computed: {
      modal() {
        return this.$tampan.modalList[0]
      },

      isModalExist() {
        return !!this.modal
      },
    },
  }

</script>