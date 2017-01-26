export default {
  render(e) {
    const confirmation = this.$tampan.confirmation

    return e('transition', { props: { name: 'fade' } }, [
      !!confirmation
        ? e('div', { staticClass: 'confirmation' }, [
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
        : null
    ])
  }
}
