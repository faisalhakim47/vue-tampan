<template>
  <Modal v-if="isModalExist" @close="closeModal">
    <div slot="header">
      <h2 class="modal__title">{{ modal.title }}</h2>
    </div>

    <p v-if="modal.type === 'text'">{{ modal.body }}</p>

    <FormFactory v-else-if="modal.type === 'form'" :items="modal.body.fieldList" :value.sync="modal.body.syncValue" @submit="formSubmit"></FormFactory>

    <ElementFactory slot="footer" :items="modal.footer"></ElementFactory>
  </Modal>
</template>

<script>
import { isFunction } from '../tools/typecheck'
import ButtonTampan from './button.vue'
import ElementFactory from './element-factory.vue'
import FormFactory from './form-factory.vue'
import Modal from './modal.vue'

export default {
  props: {
    items: { type: Array, default: () => [] },
  },

  components: {
    ButtonTampan,
    ElementFactory,
    FormFactory,
    Modal,
  },

  computed: {
    isModalExist() {
      return !!this.items[0]
    },

    modal() {
      return this.isModalExist ? this.items[0].options : null
    },

    closeModal() {
      return this.isModalExist ? this.items[0].close : (() => {})
    }
  },

  methods: {
    formSubmit(event) {
      if (isFunction(this.onSubmit)) {
        this.onSubmit(event)
      }
    },
  },
}
</script>