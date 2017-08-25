import Vue from 'vue'
import VueRouter from 'vue-router'
import Introduction from './pages/introduction.vue'
import Form from './pages/form.vue'
import Button from './pages/button.vue'
import Table from './pages/table.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
  routes: [
    { name: 'introduction', path: '/introduction', component: Introduction },
    { name: 'button', path: '/button', component: Button },
    { name: 'table', path: '/table', component: Table },
    { name: 'form', path: '/form', component: Form },
    { path: '*', redirect: { name: 'introduction' } },
  ]
})
