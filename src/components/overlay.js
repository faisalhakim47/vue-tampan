export default {
  render(e) {
    return e('transition', { props: { name: 'overlay-fade' } }, [
      this.$tampan.isOverlaid
        ? e('div', { attrs: { id: 'overlay' } })
        : null
    ])
  }
}
