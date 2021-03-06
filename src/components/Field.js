import { randomChar } from '../tools/string.js'

export default {
  props: {
    label: String,
    info: String,
    labelDescription: String,
  },

  data() {
    return {
      id: `field-${randomChar(8)}`,
    }
  },

  mounted() {
    const field_input = this.$refs.field_input
    const elInput = field_input.getElementsByTagName('input').item(0)
      || field_input.getElementsByTagName('select').item(0)
      || field_input.getElementsByTagName('textarea').item(0)
    const elLabel = field_input.getElementsByTagName('label').item(0)
    if (elInput) {
      elInput.id = this.id
    }
    if (elLabel) {
      elLabel.setAttribute('for', this.id)
    }
  },

  template: `
    <div class="field">
      <div v-if="label" class="field-label">
        <label :for="id" :title="labelDescription">{{ label }}</label>
      </div>
      <p v-if="info" class="field-info">
        {{ info }}
      </p>
      <div ref="field_input" class="field-input">
        <slot></slot>
      </div>
    </div>
  `
}
