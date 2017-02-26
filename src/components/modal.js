import { ensureArrayType } from '../tools/array'

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
              modal.disableCloseButton
                ? null
                : e('button', {
                  staticClass: 'button modal-close-btn',
                  on: { click: modal.resolve }
                }, [
                    e('i', { staticClass: 'icon material-icons' }, 'close')
                  ])
            ]),
            modal.body
              ? e('div', { staticClass: 'modal-body' }, (() => {
                return ensureArrayType(modal.body(e, modal))
              })())
              : null,
            modal.foot
              ? e('div', { staticClass: 'modal-foot' }, (() => {
                return ensureArrayType(modal.foot(e, modal))
              })())
              : null
          ])
        ])
        : null
    ])
  }
}
