export default {
  name: 'field',
  props: {
    label: { type: String },
    info: { type: String },
    direction: { type: String, default: 'vertical' }
  },
  render(e) {
    const { $props: props } = this
    return e('div', {
      staticClass: 'field',
      class: { 'is-inline': props.direction === 'horizontal' }
    }, [
        props.label
          ? e('div', { staticClass: 'field-label' }, [e('label', props.label)])
          : '',
        props.info
          ? e('div', { staticClass: 'field-info' }, [e('p', props.info)])
          : '',
        e('div', { staticClass: 'field-input' }, this.$slots.default)
      ])
  }
}
