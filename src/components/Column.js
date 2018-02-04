import { isNumber } from '../tools/typecheck.js'

function or(...nums) {
  return nums.find(isNumber)
}

export default {
  props: {
    width: { type: Object, default: () => { return {} } },
    order: { type: Object, default: () => { return {} } },
  },

  computed: {
    elWidth() {
      let width = 1
      const { lg, md, sm } = this.width
      if (this.$tampan.client.isLargeScreen)
        width = or(lg, md, sm, 1)
      if (this.$tampan.client.isMediumScreen)
        width = or(md, sm, 1)
      if (this.$tampan.client.isSmallScreen)
        width = or(sm, 1)
      return `${(width * 100)}%`
    },

    elOrder() {
      let order = 1
      const { lg, md, sm } = this.order
      if (this.$tampan.client.isLargeScreen)
        order = or(lg, md, sm)
      if (this.$tampan.client.isMediumScreen)
        order = or(md, sm)
      if (this.$tampan.client.isSmallScreen)
        order = or(sm)
      return isNumber(order) ? order.toString() : 'auto'
    },
  },

  template: `
    <div class="column" :style="{ flexBasis: elWidth, maxWidth: elWidth, order: elOrder }">
      <slot></slot>
    </div>
  `
}
