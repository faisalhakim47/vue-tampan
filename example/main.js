import VueRouter from 'vue-router'
import { VueTampan } from '../src/index'

import Form from './pages/form.vue'
import Modal from './pages/modal.vue'
import Table from './pages/table.vue'

new VueTampan({
  el: '#app',

  router: new VueRouter({
    routes: [
      { name: 'form', path: '/form', component: Form },
      { name: 'modal', path: '/modal', component: Modal },
      { name: 'table', path: '/table', component: Table },
      { path: '*', redirect: '/modal' }
    ]
  }),

  data() {
    return {
      menuGroupList: [
        {
          name: 'Komponen',
          menuList: [
            {
              name: 'Input Formulir',
              iconClass: 'material-icons',
              iconText: 'save',
              route: { name: 'form' }
            },
            {
              name: 'Modal',
              iconClass: 'material-icons',
              iconText: 'save',
              route: { name: 'modal' }
            },
            {
              name: 'Tabel',
              iconClass: 'material-icons',
              iconText: 'view_headline',
              route: { name: 'table' }
            },
          ]
        }
      ]
    }
  }
})
