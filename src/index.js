import './layout'
import { tampan } from './tampan'
import ButtonTampan from './components/button.vue'
import AdminPanel from './components/admin-panel/admin-panel.vue'
import Field from './components/form/field.vue'
import InputAddressInd from './components/form/input-address-ind.vue'
import InputDate from './components/form/input-date.vue'
import Box from './components/layout/box.vue'
import Column from './components/layout/column.vue'
import Page from './components/layout/page.vue'
import Row from './components/layout/row.vue'

export const VueTampan = {
  install(Vue) {
    Vue.prototype.$tampan = tampan
    Vue.component('button-tampan', ButtonTampan)
    Vue.component('vue-tampan', AdminPanel)
    Vue.component('field', Field)
    Vue.component('input-address-ind', InputAddressInd)
    Vue.component('input-date', InputDate)
    Vue.component('box', Box)
    Vue.component('column', Column)
    Vue.component('page', Page)
    Vue.component('row', Row)
  },
}

export * from './global'
