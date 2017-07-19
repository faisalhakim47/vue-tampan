import './style/index.css'
import { getTampan } from './tampan'
import Box from './components/box.vue'
import ButtonTampan from './components/button.vue'
import ButtonLink from './components/button-link.vue'
import Column from './components/column.vue'
import Field from './components/field.vue'
import IdnInputAddress from './components/idn-input-address.vue'
import InputDateSimple from './components/input-date-simple.vue'
import InputNumber from './components/input-number.vue'
import InputSelect from './components/input-select.vue'
import InputSwitch from './components/input-switch.vue'
import InputText from './components/input-text.vue'
import InputTextarea from './components/input-textarea.vue'
import Page from './components/page.vue'
import Row from './components/row.vue'
import TableCluster from './components/table-cluster.vue'

export function installGlobalComponents(Vue) {
  Vue.component('box', Box)
  Vue.component('button-tampan', ButtonTampan)
  Vue.component('button-link', ButtonLink)
  Vue.component('column', Column)
  Vue.component('field', Field)
  Vue.component('idn-input-address', IdnInputAddress)
  Vue.component('input-date-simple', InputDateSimple)
  Vue.component('input-number', InputNumber)
  Vue.component('input-select', InputSelect)
  Vue.component('input-switch', InputSwitch)
  Vue.component('input-text', InputText)
  Vue.component('input-textarea', InputTextarea)
  Vue.component('page', Page)
  Vue.component('row', Row)
  Vue.component('table-cluster', TableCluster)
}
