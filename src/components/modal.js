import { ensureArrayType } from '../tools/array'
import { click } from '../tools/events'

export default {
  data() {
    return {
      isBodyOverflow: false
    }
  },

  computed: {
    modal() {
      return this.$tampan.modalList[this.$tampan.modalList.length - 1]
    },
    isModalExist() {
      return !!this.modal
    }
  },

  methods: {
    controlBodyOverflow() {
      const elModalBody = this.$refs.modalBody
      if (!elModalBody) return
      this.isBodyOverflow = elModalBody.scrollHeight > elModalBody.clientHeight
    }
  },

  mounted() {
    this.controlBodyOverflow()
    this.$watch('modal', this.controlBodyOverflow),
      this.$tampan.$on('window:resize', this.controlBodyOverflow)
  },

  render(e) {
    const modal = this.modal
    return e('transition', { props: { name: 'fade' } }, [
      this.isModalExist
        ? e('div', { staticClass: 'modal-container', class: { 'is-bodyoverflow': this.isBodyOverflow } }, [
          e(modal.type === 'form' ? 'form' : 'div', {
            staticClass: 'modal',
            on: typeof modal.onSubmit === 'function'
              ? { submit: ev => modal.onSubmit(ev, modal) }
              : {}
          }, [
              e('div', { staticClass: 'modal-header' }, [
                e('h3', { staticClass: 'modal-title' }, modal.title),
                modal.disableCloseButton
                  ? null
                  : e('button', {
                    staticClass: 'button modal-close-btn',
                    on: click(modal.resolve)
                  }, [
                      e('i', { staticClass: 'icon material-icons' }, 'close')
                    ])
              ]),
              modal.body
                ? e('div', { ref: 'modalBody', staticClass: 'modal-body' }, (() => {
                  return ensureArrayType(modal.body(e, modal))
                })())
                : null,
              modal.footer
                ? e('div', { staticClass: 'modal-footer' }, (() => {
                  return ensureArrayType(modal.footer(e, modal))
                })())
                : null
            ])
        ])
        : null
    ])
  }
}
