export default {
  props: {
    type: { type: String, default: 'button' },
    disabled: { type: Boolean },
    color: { type: String, default: '' },
    display: { type: String, default: '' },
    iconClass: { type: String, default: 'material-icons' },
    iconText: { type: String },
    route: { type: Object },
  },

  computed: {
    classes() {
      return [
        ...this.color.split(' '),
        ...this.display.split(' '),
      ].map((className) => {
        return className ? 'button-' + className : ''
      }).join(' ')
    },
  },

  template: `
    <router-link v-if="route" tag="button" :to="route" class="button" :class="classes" :disabled="disabled">
      <span class="button-shell">
        <span class="button-icon" :class="iconClass">{{ iconText }}</span>
        <span v-if="$slots.default" class="button-text">
          <slot></slot>
        </span>
      </span>
    </router-link>
    <button
      v-else
      :disabled="disabled"
      :type="type"
      class="button"
      :class="classes"
      @click="$emit('click')"
    >
      <span class="button-shell">
        <span class="button-icon" :class="iconClass">{{ iconText }}</span>
        <span v-if="$slots.default" class="button-text">
          <slot></slot>
        </span>
      </span>
    </button>
  `
}
