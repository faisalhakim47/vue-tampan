export default {
  name: 'field',
  functional: true,
  props: {
    label: { type: String },
    info: { type: String },
    direction: { type: String, default: 'vertical' }
  },
  render(e, { props, children }) {
    return e('div', {
      staticClass: 'field',
      class: { 'is-inline': props.direction === 'horizontal' }
    }, [
        props.label
          ? e('div', { staticClass: 'field-label' }, [e('label', props.label)])
          : '',
        e('div', { staticClass: 'field-input' }, children),
        props.info
          ? e('div', { staticClass: 'field-info' }, [e('p', props.info)])
          : ''
      ])
  }
}
