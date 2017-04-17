import MainHeader from './layout/main-header'
import MainSidebar from './layout/main-sidebar'

import Notification from './components/notification'
import Confirmation from './components/confirmation'
import Loading from './components/loading'
import Overlay from './components/overlay'
import Modal from './components/modal'

export default {
  components: {
    Notification,
    Confirmation,
    MainHeader,
    MainSidebar,
    Loading,
    Overlay,
    Modal
  },

  render(e) {
    return e('div', { attrs: { id: 'app' } }, [
      e('div', { staticClass: 'app-container' }, [
        e('MainHeader'),
        e('div', { staticClass: 'main-content' }, [
          this.$tampan.isLargeScreen
            ? e('transition', { props: { name: 'content-fade', mode: 'out-in' } }, [
              e('router-view')
            ])
            : e('router-view')
        ]),
        e('MainSidebar')
      ]),
      e('Notification'),
      e('Confirmation'),
      e('Loading'),
      e('Overlay'),
      e('Modal')
    ])
  }
}
