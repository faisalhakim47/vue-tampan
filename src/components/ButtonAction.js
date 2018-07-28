import ButtonBase from './ButtonBase.js'

export default {
  props: {
    iconText: { type: String },
    iconClass: { type: String },
  },

  components: {
    ButtonBase,
  },

  template: `
  <div class="button-action">
    <button-base
      :icon-text="iconText"
      :icon-class="iconClass"
      @click="$emit('click')"
    ></button-base>
  </div>
  `
}
