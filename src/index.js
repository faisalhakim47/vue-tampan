import { initiateTampan } from './tampan.js'
import { initiateLayout } from './layout.js'

import AdminPanel from './components/AdminPanel.js'
import ButtonBase from './components/ButtonBase.js'
import Column from './components/Column.js'
import Dialog from './components/Dialog.js'
import Field from './components/Field.js'
import InputAddressInd from './components/InputAddressInd.js'
import InputDate from './components/InputDate.js'
import InputDatetime from './components/InputDatetime.js'
import InputSelect from './components/InputSelect.js'
import Modal from './components/Modal.js'
import Row from './components/Row.js'
import Tabs from './components/Tabs.js'

export const VueTampan = {
  install(Vue, mixin = {}) {
    const tampan = initiateTampan(Vue, mixin)
    Vue.component('admin-panel', AdminPanel)
    Vue.component('button-tampan', ButtonBase)
    Vue.component('modal', Modal)
    Vue.component('field', Field)
    Vue.component('input-address-ind', InputAddressInd)
    Vue.component('input-date', InputDate)
    Vue.component('input-datetime', InputDatetime)
    Vue.component('input-select', InputSelect)
    Vue.component('column', Column)
    Vue.component('row', Row)
    Vue.component('tabs', Tabs)
    initiateLayout(tampan)
  },
}

export { days, fromISO8601, getDayLengthInMonth, months, shortMonths, toIndoDate, toISO8601, toTimeHour } from './tools/date.js'
export { fromMysqlDateTime, toMysqlDate, toMysqlDateTime } from './tools/mysql.js'
export { isNumeric, toCurrency, toDigit } from './tools/number.js'
export { cloneObject, getPath, isJSONString, setPath } from './tools/object.js'
export { request } from './tools/request.js'
export { throttle } from './tools/throttle.js'
