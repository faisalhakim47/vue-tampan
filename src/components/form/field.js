export default {
  name: 'field',
  functional: true,
  props: ['label', 'info'],
  render(e, { props, children }) {
    return e('div', { staticClass: 'field' }, [
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
