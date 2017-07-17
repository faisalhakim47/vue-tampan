<template>
  <button class="button" @click="$emit('click', $event)">
    <i class="button__icon" :class="iconClass">{{ iconText }}</i>
    <span class="button__text">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  props: {
    iconClass: { type: String },
    iconText: { type: String },
  }
}
</script>

<style>
.button {
  user-select: none;
  font: inherit;
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  transition-property: background-color, border-color, transform;
  transition-duration: 150ms;
  padding: 0px 8px;
  border: 1px solid #FFFFFF;
  background-color: #FFFFFF;
  color: #212121;
}

.button:hover {
  border-color: #E0E0E0;
  background-color: #F5F5F5;
}

.button:focus {
  outline: none;
  border-color: #E0E0E0;
}

.button:active {
  transform: scale(.96);
}

.button__icon {
  font-size: 20px;
  line-height: 32px;
  float: left;
  margin-right: 4px;
}

.button__text {
  line-height: 32px;
}
</style>
