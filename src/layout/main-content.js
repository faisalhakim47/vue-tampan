export default {
  render(e) {
    return e('div', { attrs: { id: 'main-content' } }, [
      e('router-view')
    ])
  }
}
