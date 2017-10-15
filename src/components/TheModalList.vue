<template>
  <Modal :show="isModalExist" @close="(modal.type === 'alert' ? modal.resolve : modal.rejectModal)()">
    <div slot="header">
      <h2 class="modal-title">{{ modal.title }}</h2>
    </div>

    <p class="modal-text">{{ modal.text }}</p>

    <template slot="footer">
      <div class="button-group" style="text-align: right;">
        <button-base v-if="modal.type === 'alert'" icon-text="close" @click="modal.resolve">Tutup</button-base>
        <button-base v-if="modal.type === 'confirm'" icon-text="close" @click="modal.reject">{{ modal.rejectText }}</button-base>
        <button-base v-if="modal.type === 'confirm'" icon-text="check" @click="modal.resolve">{{ modal.resolveText }}</button-base>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from './Modal.vue'
import ButtonBase from './ButtonBase.vue'

export default {
  components: {
    Modal,
    ButtonBase,
  },

  computed: {
    modal() {
      return this.$tampan.modalList[0] || {}
    },

    isModalExist() {
      return Object.keys(this.modal).length !== 0
    },
  },
}

</script>