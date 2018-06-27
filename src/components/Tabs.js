export default {
  props: {
    value: { type: [Number, String] },
    options: { type: Array, default: () => [] },
    theme: { type: String, default: 'primary' },
  },

  computed: {
    optionIndex() {
      return this.options.findIndex((option) => {
        return option.value === this.value
      })
    },
  },

  methods: {
    change(option) {
      this.$emit('change', option.value)
      this.$emit('input', option.value)
    },
  },

  template: `
    <nav class="tabs" :class="theme">
      <ul class="tab-list">
        <li
          v-for="(option, index) in options"
          :key="option.value"
          class="tab-item clickable"
          :class="{
            'active': index === optionIndex,
            'previous-active': index === (optionIndex - 1),
          }"
          @click="change(option)"
        >{{ option.label }}</li>
        <li class="tab-cover" style="flex: 1;"></li>
      </ul>
    </nav>
  `
}
