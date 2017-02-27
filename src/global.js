import Field from './components/form/field'
import InputText from './components/form/input-text'
import InputTextarea from './components/form/input-textarea'
import InputSelect from './components/form/input-select'
import InputCheckbox from './components/form/input-checkbox'
import InputRadio from './components/form/input-radio'
import InputRange from './components/form/input-range'
import InputDate from './components/form/input-date'
import Breadcrumb from './components/breadcrumb'
import TableView from './components/table-view'

export function installComponents(Vue) {
  Vue.component('field', Field)
  Vue.component('input-text', InputText)
  Vue.component('input-textarea', InputTextarea)
  Vue.component('input-select', InputSelect)
  Vue.component('input-checkbox', InputCheckbox)
  Vue.component('input-radio', InputRadio)
  Vue.component('input-range', InputRange)
  Vue.component('input-date', InputDate)
  Vue.component('breadcrumb', Breadcrumb)
  Vue.component('table-view', TableView)
}
