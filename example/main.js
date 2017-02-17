import VueTampan from '../src/index'
import About from './pages/about'
import Button from './pages/button'
import Form from './pages/form'
import Table from './pages/table'
import Others from './pages/others'

VueTampan({
  el: '#app',

  router: new VueRouter({
    routes: [
      { path: '/about', component: About },
      { path: '/button', component: Button },
      { path: '/form', component: Form },
      { path: '/table', component: Table },
      { path: '/others', component: Others },
      { path: '/*', redirect: '/about' }
    ]
  }),

  data() {
    return {
      sidebarMenus: [
        {
          name: 'About',
          iconClass: 'material-icons',
          iconText: 'info_outline',
          path: '/about'
        },
        {
          name: 'Button',
          iconClass: 'material-icons',
          iconText: 'touch_app',
          path: '/button'
        },
        {
          name: 'Formulir',
          iconClass: 'material-icons',
          iconText: 'assignment',
          path: '/form'
        },
        {
          name: 'Tabel',
          iconClass: 'material-icons',
          iconText: 'border_all',
          path: '/table'
        },
        {
          name: 'Others',
          iconClass: 'material-icons',
          iconText: 'error_outline',
          path: '/others'
        }
      ]
    }
  }
})
