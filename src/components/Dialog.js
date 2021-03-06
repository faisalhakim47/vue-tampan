import ButtonTampan from './ButtonBase.js'
import Modal from './Modal.js'

export default {
  components: {
    ButtonTampan,
    Modal,
  },

  props: {
    show: { type: Boolean, required: true },
    type: { type: String, required: true },
    title: { type: String },
    text: { type: String },
    confirmText: { type: String },
    confirmIconText: { type: String, default: 'check' },
    rejectText: { type: String },
    resolve: { type: Function },
    reject: { type: Function, default: () => { } },
  },

  template: `
  <modal :show="show" @close="type === 'confirm' ? reject() : resolve()">
    <header v-if="title" slot="header" class="modal-header">
      <h3 class="modal-title">{{ title }}</h3>
    </header>

    <p v-if="text">{{ text }}</p>

    <footer slot="footer" class="modal-footer">
      <div
        class="button-group"
        :class="{
          'align-right': type === 'alert',
          'justify-between': type === 'confirm',
        }"
      >
        <button-tampan
          v-if="type === 'confirm'"
          @click="reject"
          icon-text="close"
        >{{ rejectText }}</button-tampan>
        <button-tampan
          @click="resolve"
          :icon-text="type === 'confirm' ? confirmIconText : 'close'"
        >{{ confirmText }}</button-tampan>
      </div>
    </footer>
  </modal>
  `
}
