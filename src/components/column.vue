<template>
  <div class="column" :style="{ flexBasis: width, maxWidth: width }">
    <slot></slot>
  </div>
</template>

<script>
import { isNumber } from '../tools/typecheck'

function or(...nums) {
  return nums.find(isNumber) || 1
}

export default {
  props: {
    lg: { type: Number },
    md: { type: Number },
    sm: { type: Number },
  },

  computed: {
    width() {
      let width = 1
      const { sm, md, lg } = this
      if (this.$tampan.client.isLargeScreen)
        width = or(lg, md, sm)
      else if (this.$tampan.client.isMediumScreen)
        width = or(md, sm)
      else if (this.$tampan.client.isSmallScreen)
        width = or(sm)
      return `${(width * 100)}%`
    }
  }
}
</script>

<style>
.row>.column {
  box-sizing: border-box;
  flex-grow: 0;
  flex-shrink: 0;
  padding-left: 4px;
  padding-right: 4px;
}

.page__content>.row>.column {
  padding-left: 8px;
  padding-right: 8px;
}
</style>
