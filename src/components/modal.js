export default {
  computed: {
    modal() {
      return this.$tampan.modalList[this.$tampan.modalList.length - 1]
    },
    isModalExist() {
      return !!this.modal
    }
  },

  render(e) {
    const modal = this.modal
    return e('transition', { props: { name: 'fade' } }, [
      this.isModalExist
        ? e('div', { staticClass: 'modal-container' }, [
          e('div', { staticClass: 'modal' }, [
            e('div', { staticClass: 'modal-header' }, [
              e('h3', { staticClass: 'modal-title' }, modal.title),
              e('button', {
                staticClass: 'button modal-close-btn', on: {
                  click: modal.reject
                }
              }, [
                  e('i', { staticClass: 'icon material-icons' }, 'close')
                ])
            ]),
            modal.body
              ? e('div', { staticClass: 'modal-body' }, (() => {
                const body = modal.body(e, modal)
                return Array.isArray(body) ? body : [body]
              })())
              : null,
            modal.foot
              ? e('div', { staticClass: 'modal-foot' }, (() => {
                const foot = modal.foot(e, modal)
                return Array.isArray(foot) ? foot : [foot]
              })())
              : null
          ])
        ])
        : null
    ])
  }
}
