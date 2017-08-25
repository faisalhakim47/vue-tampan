<template>
  <div class="input input-switch">
    <input ref="switchInput" type="checkbox" class="input-switch__input" :value="value" @change="change">
    <label ref="switchLabel" class="input-switch__label"></label>
  </div>
</template>

<script>
import { randomChar } from '../tools/string'

export default {
  props: {
    value: { type: Boolean }
  },

  methods: {
    change(event) {
      this.$emit('input', event.target.checked)
    },
  },
}
</script>

<style>
.input-switch__input {
  display: none;
}

.input-switch__label {
  position: relative;
  display: inline-block;
  cursor: pointer;
  font-weight: 500;
  text-align: left;
  padding: 16px 0 16px 44px;
}

.input-switch__label:before,
.input-switch__label:after {
  content: "";
  position: absolute;
  margin: 0;
  outline: 0;
  top: 50%;
  -ms-transform: translate(0, -50%);
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  -webkit-transition: all 150ms ease;
  transition: all 150ms ease;
}

.input-switch__label:before {
  left: 1px;
  width: 34px;
  height: 14px;
  background-color: #9E9E9E;
  border-radius: 8px;
}

.input-switch__label:after {
  left: 0;
  width: 20px;
  height: 20px;
  background-color: #FAFAFA;
  border-radius: 50%;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.14), 0 2px 2px 0 rgba(0, 0, 0, 0.098), 0 1px 5px 0 rgba(0, 0, 0, 0.084);
}

.input-switch__input:checked+.input-switch__label:before {
  background-color: #A5D6A7;
}

.input-switch__input:checked+.input-switch__label:after {
  background-color: #4CAF50;
  -ms-transform: translate(80%, -50%);
  -webkit-transform: translate(80%, -50%);
  transform: translate(80%, -50%);
}
</style>