import MainHeader from './layout/main-header'
import MainContent from './layout/main-content'
import MainMenu from './layout/main-menu'
import MainFooter from './layout/main-footer'
import Notification from './components/notification'
import Loading from './components/loading'
import Overlay from './components/overlay'
import Modal from './components/modal'

export default {
  components: {
    MainHeader,
    MainContent,
    MainMenu,
    MainFooter,
    Notification,
    Loading,
    Overlay,
    Modal
  },

  render(e) {
    console.log('APP RENDER')
    return e('div', { attrs: { id: 'app' } }, [
      e('MainHeader'),
      e('div', { attrs: { id: 'main-container' } }, [
        e('MainContent'),
        e('MainFooter'),
      ]),
      e('MainMenu'),
      e('Notification'),
      e('Loading'),
      e('Overlay'),
      e('Modal'),
    ])
  }
}
