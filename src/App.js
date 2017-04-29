import MainHeader from './layout/main-header'
import MainSidebar from './layout/main-sidebar'
import Notification from './components/notification'
import Loading from './components/loading'
import Overlay from './components/overlay'
import Modal from './components/modal'

export default {
  components: {
    Notification,
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
          e('router-view'),
        ]),
        e('MainSidebar'),
      ]),
      e('Notification'),
      e('Loading'),
      e('Overlay'),
      e('Modal'),
    ])
  }
}
