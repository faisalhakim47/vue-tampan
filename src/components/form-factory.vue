<template>
  <form class="form-factory" @submit.prevent="submit">
    <Field v-for="(field, index) in items" :label="field.label" :info="field.info" :key="index + field.label">
  
      <InputText v-if="field.type === 'text'" v-model="value[field.target]"></InputText>
  
      <InputTextarea v-if="field.type === 'textarea'" v-model="value[field.target]"></InputTextarea>
  
      <InputNumber v-else-if="field.type === 'number'" v-model="value[field.target]"></InputNumber>
  
    </Field>
  </form>
</template>

<script>
import { cloneObject } from '../tools/object'
import { throttle } from '../tools/throttle'
import Field from './field.vue'
import InputNumber from './input-number.vue'
import InputText from './input-text.vue'
import InputTextarea from './input-textarea.vue'

export default {
  props: {
    items: { type: Array, required: true },
    value: { Object, required: true },
    onSubmit: { type: Function }
  },

  components: {
    Field,
    InputNumber,
    InputText,
    InputTextarea,
  },

  methods: {
    submit(event) {
      console.log('sub', { event })
      if (typeof this.onSubmit === 'function') this.onSubmit(event)
    }
  }
}
</script>