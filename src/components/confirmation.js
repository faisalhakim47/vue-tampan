export default {
  render(e) {
    const confirmation = this.$tampan.confirmation
    return e('div', {
      staticClass: 'confirmation',
      class: { 'is-active': confirmation }
    }, [
        e('div', { staticClass: 'confirmation-overlay' }, [
          e('transition', { props: { name: 'scale' } }, [
            !!confirmation
              ? e('div', { staticClass: 'confirmation-container' }, [
                e('p', { staticClass: 'confirmation-body' }, confirmation.text),
                e('div', { staticClass: 'confirmation-footer' }, [
                  e('button', {
                    staticClass: 'confirmation-confirm-btn button primary ripple',
                    on: { click: () => confirmation.confirmCallback() }
                  }, confirmation.confirmText),
                  e('button', {
                    staticClass: 'confirmation-cancel-btn button ripple',
                    on: { click: () => confirmation.cancelCallback() }
                  }, confirmation.cancelText)
                ])
              ])
              : undefined
          ])
        ])
      ])
  }
}
