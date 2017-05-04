export default {
  name: 'field',
  props: {
    label: { type: String },
    info: { type: String },
    direction: { type: String, default: 'vertical' }
  },
  render(e) {
    return e('div', {
      staticClass: 'field',
      class: { 'is-inline': this.direction === 'horizontal' }
    }, [
        this.label
          ? e('div', { staticClass: 'field-label' }, [e('label', this.label)])
          : '',
        this.info
          ? e('div', { staticClass: 'field-info' }, [e('p', this.info)])
          : '',
        e('div', { staticClass: 'field-input' }, this.$slots.default)
      ])
  }
}
