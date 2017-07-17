import './style/index.css'
import Box from './components/box.vue'
import ButtonTampan from './components/button.vue'
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

export function installGlobalComponents(Vue) {
  Vue.component('box', Box)
  Vue.component('button-tampan', ButtonTampan)
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

  Vue.prototype.$loadAsyncData = function loadAsyncData({ req, map }) {
    const Request = typeof req === 'function'
      ? req(this.$route)
      : req
    Request.then(data => map(this, data))
      .catch((error) => {
        const { status } = error.response
        getTampan().then((tampan) => {
          tampan.alert({
            title: 'Gagal Memuat Data',
            text: JSON.stringify(error.json())
          })
          console.warn('loadAsyncData', status, error)
        })
      })
  }
}
