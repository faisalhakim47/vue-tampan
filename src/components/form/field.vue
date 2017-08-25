<template>
  <div class="field">
    <div v-if="label" class="field__label">
      <label :for="id">{{ label }}</label>
    </div>
    <p v-if="info" class="field__info">
      {{ info }}
    </p>
    <div ref="field__input" class="field__input">
      <slot id=""></slot>
    </div>
  </div>
</template>

<script>
import { randomChar } from '../tools/string'
export default {
  props: {
    label: String,
    info: String,
  },

  data() {
    return {
      id: `field-${randomChar(3)}`,
    }
  },

  mounted() {
    const field__input = this.$refs.field__input
    const elInput = field__input.getElementsByTagName('input').item(0)
      || field__input.getElementsByTagName('select').item(0)
      || field__input.getElementsByTagName('textarea').item(0)
    const elLabel = field__input.getElementsByTagName('label').item(0)
    if (elInput) {
      elInput.id = this.id
    }
    if (elLabel) {
      elLabel.setAttribute('for', this.id)
    }
  }
}
</script>

<style>
.field {
  margin-top: 8px;
  margin-bottom: 8px;
}

.box__content .field {
  padding-left: 16px;
  padding-right: 16px;
}

.box__content > .row > .column > .field {
  padding-left: 0px;
  padding-right: 0px;
}

.modal__content .field {
  padding-left: 16px;
  padding-right: 16px;
}

.field__label {
  user-select: none;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  padding-top: 3px;
  padding-bottom: 3px;
}
</style>
