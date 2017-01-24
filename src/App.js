import Alert from './components/alert'
import Confirmation from './components/confirmation'
import MainHeader from './components/main-header'
import MainSidebar from './components/main-sidebar'
import Loading from './components/loading'

export default {
  components: {
    Alert,
    Confirmation,
    MainHeader,
    MainSidebar,
    Loading
  },
  render(e) {
    return e('div', { attrs: { id: 'app' } }, [
      e('div', { staticClass: 'app-container' }, [
        e('MainHeader'),
        e('div', { staticClass: 'main-content' }, [
          e('transition', { props: { name: 'slide', mode: 'out-in' } }, [
            e('router-view', { props: { key: this.$route.path } })
          ])
        ]),
        e('MainControl'),
        e('MainSidebar')
      ]),
      e('div', { staticClass: 'sidebar-overlay', on: { click: this.$tampan.toggleSidebar } }),
      e('Alert'),
      e('Confirmation'),
      e('Loading')
    ])
  }
}
