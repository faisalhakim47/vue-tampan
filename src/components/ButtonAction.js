import ButtonBase from './ButtonBase.js';

export default {
  props: {
    type: {type: String, default: 'button'},
    disabled: {type: Boolean},
    color: {type: String, default: ''},
    display: {type: String, default: ''},
    iconClass: {type: String, default: 'material-icons'},
    iconText: {type: String},
  },

  components: {
    ButtonBase,
  },

  template: `
  <div class="button-action">
    <button-base
      :type="type"
      :color="color"
      :display="display"
      :icon-text="iconText"
      :icon-class="iconClass"
      :disabled="disabled"
      @click="$emit('click')"
    ><slot></slot></button-base>
  </div>
  `,
};
