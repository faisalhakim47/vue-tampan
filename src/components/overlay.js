export default {
  computed: {
    isOverlaid() {
      return this.$tampan.overlayCount !== 0
    }
  },
  render(e) {
    return e('transition', { props: { name: 'overlay-fade' } }, [
      this.isOverlaid
        ? e('div', { attrs: { id: 'overlay' } })
        : null
    ])
  }
}
