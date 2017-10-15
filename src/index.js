import { initiateTampan } from './tampan'
import { initiateLayout } from './layout'
import Box from './components/Box.vue'
import ButtonBase from './components/ButtonBase.vue'
import Column from './components/Column.vue'
import Field from './components/Field.vue'
import InputAddressInd from './components/InputAddressInd.vue'
import InputDate from './components/InputDate.vue'
import InputDatetime from './components/InputDatetime.vue'
import InputSelect from './components/InputSelect.vue'
import Modal from './components/Modal.vue'
import Page from './components/Page.vue'
import Row from './components/Row.vue'
import AdminPanel from './components/TheAdminPanel.vue'
import Tampan from './components/TheTampan.vue'

export const VueTampan = {
  install(Vue, mixin) {
    const tampan = initiateTampan(mixin)
    initiateLayout({ tampan })
    Vue.prototype.$tampan = tampan
    Vue.component('button-tampan', ButtonBase)
    Vue.component('vue-tampan', Tampan)
    Vue.component('modal', Modal)
    Vue.component('field', Field)
    Vue.component('input-address-ind', InputAddressInd)
    Vue.component('input-date', InputDate)
    Vue.component('input-datetime', InputDatetime)
    Vue.component('input-select', InputSelect)
    Vue.component('admin-panel', AdminPanel)
    Vue.component('box', Box)
    Vue.component('column', Column)
    Vue.component('page', Page)
    Vue.component('row', Row)
  },
}

export * from './global'
