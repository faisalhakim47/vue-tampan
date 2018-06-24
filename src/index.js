import { initiateTampan } from './tampan.js'
import { initiateLayout } from './layout.js'

import AdminPanel from './components/AdminPanel.js'
import ButtonAction from './components/ButtonAction.js'
import ButtonBase from './components/ButtonBase.js'
import Column from './components/Column.js'
import Field from './components/Field.js'
import InputAddressInd from './components/InputAddressInd.js'
import InputAutotext from './components/InputAutotext.js'
import InputDate from './components/InputDate.js'
import InputDatetime from './components/InputDatetime.js'
import InputMonth from './components/InputMonth.js'
import InputRange from './components/InputRange.js'
import InputSelect from './components/InputSelect.js'
import InputTime from './components/InputTime.js'
import ListBlock from './components/ListBlock.js'
import ListPanel from './components/ListPanel.js'
import Modal from './components/Modal.js'
import Row from './components/Row.js'
import Tabs from './components/Tabs.js'

import focus from './directives/focus.js'

export const VueTampan = {
  install(Vue, mixin = {}) {
    const tampan = initiateTampan(Vue, mixin)

    Vue.component('admin-panel', AdminPanel)
    Vue.component('button-action', ButtonAction)
    Vue.component('button-tampan', ButtonBase)
    Vue.component('modal', Modal)
    Vue.component('field', Field)
    Vue.component('input-address-ind', InputAddressInd)
    Vue.component('input-autotext', InputAutotext)
    Vue.component('input-date', InputDate)
    Vue.component('input-datetime', InputDatetime)
    Vue.component('input-range', InputRange)
    Vue.component('input-month', InputMonth)
    Vue.component('input-select', InputSelect)
    Vue.component('input-time', InputTime)
    Vue.component('list-block', ListBlock)
    Vue.component('list-panel', ListPanel)
    Vue.component('column', Column)
    Vue.component('row', Row)
    Vue.component('tabs', Tabs)

    Vue.directive('focus', focus)

    initiateLayout(tampan)
  },
}

export { days, fromISO8601, getDayLengthInMonth, months, shortMonths, toIndoDate, toISO8601, toTimeHour } from './tools/date.js'
export { fromMysqlDateTime, toMysqlDate, toMysqlDateTime } from './tools/mysql.js'
export { isNumeric, toCurrency, toDigit } from './tools/number.js'
export { cloneObject, getPath, isJSONString, setPath } from './tools/object.js'
export { request } from './tools/request.js'
export { throttle } from './tools/throttle.js'
