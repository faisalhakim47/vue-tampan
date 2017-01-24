export default {
  render(e) {
    return e('transition', { props: { name: 'loading-fade' } }, [
      this.$tampan.isLoading
        ? e('div', { attrs: { id: 'loading-container' } }, [
          e('div', { staticClass: 'spinner' }, [
            e('div', { staticClass: 'dot1' }),
            e('div', { staticClass: 'dot2' })
          ])
        ])
        : null
    ])
  }
}
