export default {
  props: {
    value: { type: [Number, String] },
    options: { type: Array, default: () => [] },
    theme: { type: String, default: 'primary' },
  },

  template: `
    <nav class="tabs" :class="theme">
      <ul class="tab-list">
        <li
          v-for="option in options"
          class="tab-item clickable"
          :class="{ 'active': option.value === value }"
          @click="$emit('change', option.value)"
        >{{ option.label }}</li>
      </ul>
    </nav>
  `
}
