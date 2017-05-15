export default {
  render(e) {
    return e('div', { attrs: { id: 'main-content' } }, [
      e('transition', { props: { name: 'content-fade', mode: 'out-in' } }, [
        e('router-view')
      ])
    ])
  }
}
