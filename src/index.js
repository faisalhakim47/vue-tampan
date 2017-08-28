import { initiateTampan } from './tampan'
import { initiateLayout } from './layout'
import Tampan from './components/tampan.vue'
import Modal from './components/dialog/modal.vue'
import ButtonTampan from './components/element/button.vue'
import Field from './components/form/field.vue'
import InputAddressInd from './components/form/input-address-ind.vue'
import InputDate from './components/form/input-date.vue'
import InputSelect from './components/form/input-select.vue'
import AdminPanel from './components/layout/admin-panel.vue'
import Box from './components/layout/box.vue'
import Column from './components/layout/column.vue'
import Page from './components/layout/page.vue'
import Row from './components/layout/row.vue'

export const VueTampan = {
  install(Vue, mixin) {
    const tampan = initiateTampan(mixin)
    initiateLayout({ tampan })
    Vue.prototype.$tampan = tampan
    Vue.component('button-tampan', ButtonTampan)
    Vue.component('vue-tampan', Tampan)
    Vue.component('modal', Modal)
    Vue.component('field', Field)
    Vue.component('input-address-ind', InputAddressInd)
    Vue.component('input-date', InputDate)
    Vue.component('input-select', InputSelect)
    Vue.component('admin-panel', AdminPanel)
    Vue.component('box', Box)
    Vue.component('column', Column)
    Vue.component('page', Page)
    Vue.component('row', Row)
  },
}

export * from './global'
