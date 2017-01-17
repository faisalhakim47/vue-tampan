import Field from './components/form/field'
import InputText from './components/form/input-text'
import InputTextarea from './components/form/input-textarea'
import InputSelect from './components/form/input-select'
import InputRadio from './components/form/input-radio'
import InputCheckbox from './components/form/input-checkbox'
import InputDate from './components/form/input-date'
import TableView from './components/table-view'

export function installComponents(Vue) {
  Vue.component('field', Field)
  Vue.component('input-text', InputText)
  Vue.component('input-textarea', InputTextarea)
  Vue.component('input-select', InputSelect)
  Vue.component('input-radio', InputRadio)
  Vue.component('input-checkbox', InputCheckbox)
  Vue.component('input-date', InputDate)
  Vue.component('table-view', TableView)
}
