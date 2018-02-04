export default {
  props: {
    disabled: { type: Boolean },
    color: { type: String },
    iconClass: { type: String, default: 'material-icons' },
    iconText: { type: String },
    route: { type: Object },
  },

  template: `
    <router-link v-if="route" tag="button" :to="route" class="button" :class="color" :disabled="disabled">
      <span class="button-shell">
        <span class="button-icon" :class="iconClass">{{ iconText }}</span>
        <span v-if="$slots.default" class="button-text">
          <slot></slot>
        </span>
      </span>
    </router-link>
    <button v-else class="button" :class="color" :disabled="disabled" @click="$emit('click')">
      <span class="button-shell">
        <span class="button-icon" :class="iconClass">{{ iconText }}</span>
        <span v-if="$slots.default" class="button-text">
          <slot></slot>
        </span>
      </span>
    </button>
  `
}
