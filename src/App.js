import Alert from './components/alert'
import Confirmation from './components/confirmation'
import MainHeader from './components/main-header'
import MainSidebar from './components/main-sidebar'

export default {
  components: {
    Alert,
    Confirmation,
    MainHeader,
    MainSidebar
  },
  render(e) {
    return e('div', { attrs: { id: 'app' } }, [
      e('MainHeader'),
      e('div', { staticClass: 'main-container' }, [
        e('MainSidebar'),
        e('div', { staticClass: 'main-content' }, [
          e('transition', { props: { name: 'slide', mode: 'out-in' } }, [
            e('router-view', { props: { key: this.$route.path } })
          ])
        ])
      ]),
      e('div', { staticClass: 'sidebar-overlay', on: { click: this.$tampan.toggleSidebar } }),
      e('Alert'),
      e('Confirmation')
    ])
  }
}
