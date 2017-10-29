import Vue from 'vue';
import nprogress from 'nprogress';

const maxMediumSize = 1024;
const maxSmallSize = 768;

function getClienDeviceInfo() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const isLandscape = width > height;
  const isPortrait = !isLandscape;
  const isSmallScreen = width <= maxSmallSize;
  const isMediumScreen = !isSmallScreen && width <= maxMediumSize;
  const isLargeScreen = !isSmallScreen && !isMediumScreen;
  const isTouchDevice = (isSmallScreen || isMediumScreen)
    && ('ontouchstart' in window || navigator.maxTouchPoints);
  const isMobileOS = /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent);
  return {
    width,
    height,
    isLandscape,
    isPortrait,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isTouchDevice,
    isMobileOS,
  }
}

function initiateTampan(mixin) {
  return new Vue({
    mixins: [mixin],

    data() {
      const client = getClienDeviceInfo();
      return {
        client,
        modalShowNumber: 0,
        modalList: [],
        loadingCount: 0,
        isSidebarShow: !client.isSmallScreen,
      }
    },

    computed: {
      isModalShown() {
        return this.modalShowNumber !== 0
      },

      isSidebarToggleable() {
        return this.client.isSmallScreen
      },

      isSidebarVisible() {
        if (!this.isSidebarToggleable) return true
        if (this.isSidebarShow) return true
        return false
      },
    },

    watch: {
      'loadingCount'(loadingCount, oldLoadingCount) {
        if (loadingCount === 0) {
          nprogress.done(true);
        } else if (loadingCount > 0) {
          if (oldLoadingCount === 0) {
            nprogress.start();
          } else if (oldLoadingCount > loadingCount) {
            nprogress.inc();
          }
        }
      },
    },

    methods: {
      showSidebar() {
        return this.isSidebarShow = true
      },

      hideSidebar() {
        return this.isSidebarShow = false
      },

      toggleSidebar() {
        return new Promise((resolve) => {
          if (!this.isSidebarShow) this.$nextTick().then(() => {
            this.isSidebarShow = !this.isSidebarShow;
            this.$nextTick().then(resolve);
          });
          else {
            this.isSidebarShow = !this.isSidebarShow;
            this.$nextTick().then(resolve);
          }
        })
      },

      addLoadingState() {
        this.loadingCount += 1;
      },
      reduceLoadingState() {
        this.loadingCount -= 1;
      },
      useLoadingState(promiseWork) {
        const finish = () => this.reduceLoadingState();
        this.addLoadingState();
        this.$nextTick().then(() => promiseWork)
          .then(finish)
          .catch(finish);
        return promiseWork
      },

      alert({ title = '', text = '', confirmText = 'Tutup' }) {
        return new Promise((resolve) => {
          const alert = {
            type: 'alert',
            title,
            text,
            resolve: () => {
              this.modalList.splice(this.modalList.indexOf(alert), 1);
              resolve();
            }
          };
          this.modalList.push(alert);
        })
      },

      confirm({
        title = 'Apakah anda yakin?',
        text = '',
        resolveText = 'Yakin',
        rejectText = 'Batal'
      }) {
        return new Promise((resolve, reject) => {
          var close = () => {
            this.modalList.splice(this.modalList.indexOf(confirm), 1);
          };
          var confirm = {
            type: 'confirm',
            title,
            text,
            resolveText,
            rejectText,
            resolve: () => {
              close();
              resolve();
            },
            reject: () => {
              close();
              reject();
            },
          };
          this.modalList.push(confirm);
        })
      },
    },
  })
}

function throttle(func, duration = 100) {
  let isThrotted = false;
  let pendingFunc = false;
  let lastValue = null;
  function throttledFunc(...args) {
    if (isThrotted) {
      pendingFunc = () => {
        return throttledFunc.apply(this, args)
      };
      return lastValue
    }
    isThrotted = true;
    setTimeout(() => {
      isThrotted = false;
      if (typeof pendingFunc === 'function') {
        pendingFunc();
      }
      pendingFunc = false;
    }, duration);
    return lastValue = func.apply(this, args)
  }
  return throttledFunc
}

function changeBodyClass(className, condition) {
  const classList = document.body.classList;
  if (condition) classList.add(className);
  else classList.remove(className);
}

function initiateLayout({ tampan }) {
  const screenChangeHandler = () => tampan.client = getClienDeviceInfo();
  window.addEventListener('resize', screenChangeHandler, { passive: true });
  window.addEventListener('orientationchange', screenChangeHandler, { passive: true });

  tampan.$watch(() => {
    const {
      isLargeScreen,
      isMediumScreen,
      isSmallScreen,
      height,
    } = tampan.client;
    changeBodyClass('is-largescreen', isLargeScreen);
    changeBodyClass('is-mediumscreen', isMediumScreen);
    changeBodyClass('is-smallscreen', isSmallScreen);
  });

  tampan.$watch(() => {
    changeBodyClass('is-sidebar-toggleable', tampan.isSidebarToggleable);
  });

  tampan.$watch(() => {
    if (tampan.isSidebarToggleable) {
      tampan.isSidebarShow = false;
    }
  });
}

var Box = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"box"},[(_vm.title)?_c('div',{staticClass:"box-header",on:{"click":function($event){_vm.$emit('update:collapsed', !_vm.collapsed);}}},[_c('h3',{staticClass:"box-title"},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_c('div',{staticClass:"box-controls"},[_vm._t("controls"),_vm._v(" "),(_vm.collapsable)?_c('i',{staticClass:"material-icons"},[_vm._v(_vm._s(_vm.isCollapsed ? 'arrow_drop_down' : 'arrow_drop_up'))]):_vm._e()],2)]):_vm._e(),_vm._v(" "),(!_vm.isCollapsed)?_c('div',{staticClass:"box-content",style:({ overflowX : _vm.overflowX ? 'auto' : 'hidden' })},[_vm._t("default")],2):_vm._e()])},staticRenderFns: [],
  props: {
    collapsable: { type: Boolean, default: false },
    collapsed: { type: Boolean, default: false },
    overflowX: { type: Boolean, default: false },
    title: { type: String },
  },

  computed: {
    isCollapsed() {
      if (!this.collapsable) return false
      if (this.collapsed) return true
      return false
    },
  },
};

var ButtonBase = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.route)?_c('router-link',{staticClass:"button",class:`${_vm.color}`,attrs:{"tag":"button","to":_vm.route,"disabled":_vm.disabled}},[_c('i',{staticClass:"button-icon",class:_vm.iconClass},[_vm._v(_vm._s(_vm.iconText))]),_vm._v(" "),(_vm.$slots.default)?_c('span',{staticClass:"button-text"},[_vm._t("default")],2):_vm._e()]):_c('button',{staticClass:"button",class:`${_vm.color}`,attrs:{"disabled":_vm.disabled},on:{"click":function($event){_vm.$emit('click');}}},[_c('i',{staticClass:"button-icon",class:_vm.iconClass},[_vm._v(_vm._s(_vm.iconText))]),_vm._v(" "),(_vm.$slots.default)?_c('span',{staticClass:"button-text"},[_vm._t("default")],2):_vm._e()])},staticRenderFns: [],
  props: {
    disabled: { type: Boolean },
    color: { type: String },
    iconClass: { type: String, default: 'material-icons' },
    iconText: { type: String },
    route: { type: Object },
  },
};

function isNumber(data) {
  return typeof data === 'number'
}

function or(...nums) {
  return nums.find(isNumber)
}

var Column = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"column",style:({ flexBasis: _vm.elWidth, maxWidth: _vm.elWidth, order: _vm.elOrder })},[_vm._t("default")],2)},staticRenderFns: [],
  props: {
    width: { type: Object, default: () => { return {} } },
    order: { type: Object, default: () => { return {} } },
  },

  computed: {
    elWidth() {
      let width = 1;
      const { lg, md, sm } = this.width;
      if (this.$tampan.client.isLargeScreen)
        width = or(lg, md, sm, 1);
      if (this.$tampan.client.isMediumScreen)
        width = or(md, sm, 1);
      if (this.$tampan.client.isSmallScreen)
        width = or(sm, 1);
      return `${(width * 100)}%`
    },

    elOrder() {
      let order = 1;
      const { lg, md, sm } = this.order;
      if (this.$tampan.client.isLargeScreen)
        order = or(lg, md, sm);
      if (this.$tampan.client.isMediumScreen)
        order = or(md, sm);
      if (this.$tampan.client.isSmallScreen)
        order = or(sm);
      return isNumber(order) ? order.toString() : 'auto'
    },
  }
};

const charlist = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charlength = charlist.length;

function randomChar(length = 1) {
  let str = '';
  while (length--) {
    str += charlist[Math.floor(Math.random() * charlength)];
  }
  return str
}

// function test(char = 2, itteration = 10) {
//   const results = []
//   while (itteration--) {
//     let notFound = true
//     const testObj = {}
//     let count = 0
//     while (notFound) {
//       const random = randomChar(char)
//       if (testObj[random]) {
//         notFound = false
//         results.push(count)
//         break
//       }
//       testObj[random] = true
//       count++
//     }
//   }
//   return results.reduce((a, b) => a + b, 0) / results.length
// }

// window.r = randomChar
// window.t = test

var Field = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"field"},[(_vm.label)?_c('div',{staticClass:"field-label"},[_c('label',{attrs:{"for":_vm.id}},[_vm._v(_vm._s(_vm.label))])]):_vm._e(),_vm._v(" "),_c('div',{ref:"field_input",staticClass:"field-input"},[_vm._t("default")],2),_vm._v(" "),(_vm.info)?_c('p',{staticClass:"field-info"},[_vm._v(" "+_vm._s(_vm.info)+" ")]):_vm._e()])},staticRenderFns: [],
  props: {
    label: String,
    info: String,
  },

  data() {
    return {
      id: `field-${randomChar(8)}`,
    }
  },

  mounted() {
    const field_input = this.$refs.field_input;
    const elInput = field_input.getElementsByTagName('input').item(0)
      || field_input.getElementsByTagName('select').item(0)
      || field_input.getElementsByTagName('textarea').item(0);
    const elLabel = field_input.getElementsByTagName('label').item(0);
    if (elInput) {
      elInput.id = this.id;
    }
    if (elLabel) {
      elLabel.setAttribute('for', this.id);
    }
  }
};

var Row = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row"},[_vm._t("default")],2)},staticRenderFns: [],};

function addressToObject(address) {
  if (address && typeof address === 'object') {
    return address
  }
  try {
    const { street, rt, rw, village, district, regency, province, postalcode } = JSON.parse(address);
    return { street, rt, rw, village, district, regency, province, postalcode }
  } catch (e) {
    console.warn('wrong address format', e);
    return {}
  }
}

var InputAddressInd = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"idn-input-address input-sets"},[_c('Row',[_c('Column',{attrs:{"width":{ sm: 4/4, md: 2/4 }}},[_c('Field',{attrs:{"label":"Kode POS"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.addressObject.postalcode),expression:"addressObject.postalcode"}],attrs:{"type":"number"},domProps:{"value":(_vm.addressObject.postalcode)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.addressObject, "postalcode", $event.target.value);}}})])],1),_vm._v(" "),_c('Column',{attrs:{"width":{ sm: 4/4, md: 2/4 }}},[_c('Field',{attrs:{"label":"Provinsi"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.addressObject.province),expression:"addressObject.province"}],attrs:{"type":"text"},domProps:{"value":(_vm.addressObject.province)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.addressObject, "province", $event.target.value);}}})])],1),_vm._v(" "),_c('Column',{attrs:{"width":{ sm: 4/4, md: 2/4 }}},[_c('Field',{attrs:{"label":"Kota"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.addressObject.regency),expression:"addressObject.regency"}],attrs:{"type":"text"},domProps:{"value":(_vm.addressObject.regency)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.addressObject, "regency", $event.target.value);}}})])],1),_vm._v(" "),_c('Column',{attrs:{"width":{ sm: 4/4, md: 2/4 }}},[_c('Field',{attrs:{"label":"Kecamatan"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.addressObject.district),expression:"addressObject.district"}],attrs:{"type":"text"},domProps:{"value":(_vm.addressObject.district)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.addressObject, "district", $event.target.value);}}})])],1),_vm._v(" "),_c('Column',{attrs:{"width":{ sm: 4/4, md: 2/4 }}},[_c('Field',{attrs:{"label":"Kelurahan"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.addressObject.village),expression:"addressObject.village"}],attrs:{"type":"text"},domProps:{"value":(_vm.addressObject.village)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.addressObject, "village", $event.target.value);}}})])],1),_vm._v(" "),_c('Column',{attrs:{"width":{ sm: 2/4, md: 1/4 }}},[_c('Field',{attrs:{"label":"RT"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.addressObject.rt),expression:"addressObject.rt"}],attrs:{"type":"number"},domProps:{"value":(_vm.addressObject.rt)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.addressObject, "rt", $event.target.value);}}})])],1),_vm._v(" "),_c('Column',{attrs:{"width":{ sm: 2/4, md: 1/4 }}},[_c('Field',{attrs:{"label":"RW"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.addressObject.rw),expression:"addressObject.rw"}],attrs:{"type":"number"},domProps:{"value":(_vm.addressObject.rw)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.addressObject, "rw", $event.target.value);}}})])],1),_vm._v(" "),_c('Column',{attrs:{"width":{ sm: 4/4 }}},[_c('Field',{attrs:{"label":"Jalan"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.addressObject.street),expression:"addressObject.street"}],attrs:{"type":"text"},domProps:{"value":(_vm.addressObject.street)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.addressObject, "street", $event.target.value);}}})])],1)],1)],1)},staticRenderFns: [],
  props: {
    value: { type: [String, Object], default: () => ({}) },
    suggestionProvider: { type: String },
  },

  components: {
    Field,
    Column,
    Row,
  },

  data() {
    return {
      addressObject: addressToObject(this.value),
      provinceProvider: throttle(({ query }) => {
        return new Promise
      }, 500)
    }
  },

  watch: {
    value: {
      deep: true,
      handler(value) {
        this.addressObject = addressToObject(value);
      }
    },
    addressObject: {
      deep: true,
      handler(addressObject) {
        this.$emit('input', JSON.stringify(addressObject));
      }
    },
  },
};

function toDigit(num, digit) {
  let str = num.toString();
  if (str.length < digit) {
    for (let i = digit - str.length; i--;) {
      str = '0' + str;
    }
  }
  return str
}

function toCurrency(num) {
  num = Math.floor(num).toString().split('');
  const length = num.length;
  const each3 = Math.floor(length / 3);
  for (let i = 1; i <= each3; i++) {
    num.splice(length - i * 3, 0, '.');
  }
  if (num[0] === '.') {
    num.shift();
  }
  num = num.join('');
  return num
}

const numericRegx = /^-?\d+\.?\d*$/;
function isNumeric(data) {
  return numericRegx.test(data)
}

const days = [
  'Ahad',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jum\'at',
  'Sabtu'
];

const months = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mey',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
];

const shortMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mey',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des'
];

function getDayLengthInMonth(month, month2) {
  let year = 1970;
  if (month2 != undefined) {
    year = month;
    month = month2;
  }
  month = typeof month === 'string' ? months.indexOf(month) : month;
  return new Date(year, month, 0).getDate()
}

function toIndoDate(date) {
  date = new Date(date);
  if (!isFinite(date)) return null
  return `${toDigit(date.getDate(), 2)} ${months[date.getMonth()]} ${date.getFullYear()}`
}

function toTimeHour(date) {
  date = new Date(date);
  if (!isFinite(date)) return null
  return `${toDigit(date.getHours(), 2)}:${toDigit(date.getMinutes(), 2)}`
}

function toISO8601(date, { includeDate = true, includeTime = false } = {}) {
  date = new Date(date);
  if (!isFinite(date)) return null
  let ISODate = date.toISOString();
  if (!includeTime) ISODate = ISODate.slice(0, 10);
  if (!includeDate) ISODate = ISODate.slice(10);
  if (includeTime && !includeDate) ISODate = ISODate.slice(1, -1);
  return ISODate
}

function fromISO8601(ISODate) {
  return new Date(ISODate)
}

function dateToObject(date = new Date()) {
  date = new Date(date);
  return {
    minute: date.getMinutes(),
    hour: date.getHours(),
    date: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  }
}

function objectToDate({ year = 0, month = 0, date = 0, hour = 0, minute = 0 } = {}) {
  return new Date(year, month, date, hour, minute)
}
var InputDate = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isUsingISO8601)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.ISO8601),expression:"ISO8601"}],attrs:{"type":"date"},domProps:{"value":(_vm.ISO8601)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.ISO8601=$event.target.value;},_vm.ISO8601Input]}}):_c('div',{staticClass:"input input-sets input-date"},[_c('Row',[_c('Column',{attrs:{"width":{ sm: 2/8 }}},[_c('Field',[_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.date.date),expression:"date.date",modifiers:{"number":true}}],attrs:{"type":"number","min":"1","max":"31"},domProps:{"value":(_vm.date.date)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.$set(_vm.date, "date", _vm._n($event.target.value));},_vm.input],"blur":function($event){_vm.$forceUpdate();}}})])],1),_vm._v(" "),_c('Column',{attrs:{"width":{ sm: 4/8 }}},[_c('Field',[_c('select',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.date.month),expression:"date.month",modifiers:{"number":true}}],on:{"input":_vm.input,"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return _vm._n(val)}); _vm.$set(_vm.date, "month", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);}}},_vm._l((_vm.monthOptions),function(month){return _c('option',{key:month.value,domProps:{"value":month.value}},[_vm._v(_vm._s(month.label))])}))])],1),_vm._v(" "),_c('Column',{attrs:{"width":{ sm: 2/8 }}},[_c('Field',[_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.date.year),expression:"date.year",modifiers:{"number":true}}],attrs:{"type":"number","min":"1000","max":"9999"},domProps:{"value":(_vm.date.year)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.$set(_vm.date, "year", _vm._n($event.target.value));},_vm.input],"blur":function($event){_vm.$forceUpdate();}}})])],1)],1)],1)},staticRenderFns: [],
  props: {
    value: { type: Date, default: () => new Date() }
  },

  components: {
    Field,
    Row,
    Column,
  },

  data() {
    const date = new Date(this.value);
    return {
      ISO8601: toISO8601(date),
      date: dateToObject(date),
      monthOptions: months.map((monthName, index) => {
        return {
          value: index,
          label: monthName
        }
      })
    }
  },

  computed: {
    isUsingISO8601() {
      return this.$tampan.client.isMobileOS
    },
  },

  methods: {
    input() {
      this.$nextTick().then(() => {
        const date = objectToDate(this.date);
        this.$emit('input', date);
      });
    },

    ISO8601Input() {
      const date = fromISO8601(this.ISO8601);
      this.$emit('input', date);
    },
  },

  watch: {
    value(newValue) {
      this.ISO8601 = toISO8601(new Date(newValue));
      this.date = dateToObject(new Date(newValue));
    },
  }
};

function dateToObject$1(date = new Date()) {
  date = new Date(date);
  return {
    minute: date.getMinutes(),
    hour: date.getHours(),
    date: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  }
}

function objectToDate$1({ year = 0, month = 0, date = 0, hour = 0, minute = 0 } = {}) {
  return new Date(year, month, date, hour, minute)
}

var InputTime = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isUsingISO8601)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.ISO8601Time),expression:"ISO8601Time"}],attrs:{"type":"time"},domProps:{"value":(_vm.ISO8601Time)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.ISO8601Time=$event.target.value;},_vm.ISO8601Input]}}):_c('div',{staticClass:"input input-sets input-date"},[_c('Row',[_c('Column',{attrs:{"width":{ sm: 1/2 }}},[_c('Field',[_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.date.hour),expression:"date.hour",modifiers:{"number":true}}],attrs:{"type":"number","min":"0","max":"23"},domProps:{"value":(_vm.date.hour)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.$set(_vm.date, "hour", _vm._n($event.target.value));},_vm.input],"blur":function($event){_vm.$forceUpdate();}}})])],1),_vm._v(" "),_c('Column',{attrs:{"width":{ sm: 1/2 }}},[_c('Field',[_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.date.minute),expression:"date.minute",modifiers:{"number":true}}],attrs:{"type":"number","min":"0","max":"59"},domProps:{"value":(_vm.date.minute)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.$set(_vm.date, "minute", _vm._n($event.target.value));},_vm.input],"blur":function($event){_vm.$forceUpdate();}}})])],1)],1)],1)},staticRenderFns: [],
  props: {
    value: { type: Date, default: () => new Date() }
  },

  components: {
    Field,
    Row,
    Column,
  },

  data() {
    const date = new Date(this.value);
    return {
      ISO8601Time: toISO8601(date, { includeDate: false, includeTime: true }),
      date: dateToObject$1(date),
    }
  },

  computed: {
    isUsingISO8601() {
      return this.$tampan.client.isMobileOS
    },
  },

  methods: {
    input() {
      const date = objectToDate$1(this.date);
      this.$emit('input', date);
    },

    ISO8601Input() {
      const { year, month, date } = this.date;
      const [hour, minute, second] = this.ISO8601Time.split(':').map(p => parseFloat(p));
      const result = new Date(year, month, date, hour, minute, second);
      this.$emit('input', result);
    },
  },

  watch: {
    value(newValue) {
      this.ISO8601Time = toISO8601(new Date(newValue), { includeDate: false, includeTime: true });
      this.date = dateToObject$1(new Date(newValue));
    },
  }
};

var InputDatetime = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isUsingISO8601)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.ISO8601),expression:"ISO8601"}],attrs:{"type":"datetime-local"},domProps:{"value":(_vm.ISO8601)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.ISO8601=$event.target.value;},_vm.ISO8601Input]}}):_c('div',{staticClass:"input input-sets input-date"},[_c('row',[_c('column',{attrs:{"width":{ md: 1/3 }}},[_c('field',{attrs:{"label":"Jam"}},[_c('input-time',{on:{"input":_vm.input},model:{value:(_vm.date),callback:function ($$v) {_vm.date=$$v;},expression:"date"}})],1)],1),_vm._v(" "),_c('column',{attrs:{"width":{ md: 2/3 }}},[_c('field',{attrs:{"label":"Tanggal"}},[_c('input-date',{on:{"input":_vm.input},model:{value:(_vm.date),callback:function ($$v) {_vm.date=$$v;},expression:"date"}})],1)],1)],1)],1)},staticRenderFns: [],
  props: {
    value: { type: Date, default: () => new Date() }
  },

  components: {
    InputDate,
    InputTime,
    Field,
    Row,
    Column,
  },

  data() {
    const date = new Date(this.value);
    return {
      ISO8601: this.toISO8601(date),
      date: date,
    }
  },

  computed: {
    isUsingISO8601() {
      return this.$tampan.client.isMobileOS
    },
  },

  methods: {
    toISO8601(datetime) {
      datetime = new Date(datetime);
      datetime.setHours(datetime.getHours() + (datetime.getTimezoneOffset() / -60));
      return toISO8601(datetime, { includeTime: true }).slice(0, -1)
    },

    fromISO8601(ISO8601) {
      const datetime = new Date(ISO8601 + 'Z');
      datetime.setHours(datetime.getHours() - (datetime.getTimezoneOffset() / -60));
      return datetime
    },

    input() {
      const datetime = new Date(this.date);
      this.$emit('input', datetime);
    },

    ISO8601Input() {
      this.$emit('input', this.fromISO8601(this.ISO8601));
    },
  },

  watch: {
    value(newValue) {
      this.date = new Date(newValue);
      this.ISO8601 = this.toISO8601(this.date);
    },
  }
};

var InputSelect = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('select',{ref:"input_select",staticClass:"input input-select",domProps:{"value":_vm.value},on:{"change":_vm.change}},_vm._l((_vm.options),function(option){return _c('option',{key:option.value,domProps:{"value":option.value}},[_vm._v(_vm._s(option.label))])}))},staticRenderFns: [],
  props: {
    options: { type: Array, default: () => [] },
    value: { type: [String, Number] }
  },

  methods: {
    change(event) {
      let newVal = isNumber(this.value)
        ? parseInt(event.target.value, 10)
        : event.target.value;
      this.$emit('input', newVal);
    }
  },

  updated() {
    this.$refs.input_select.value = this.value || '';
  }
};

var Modal = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"modal",class:{ 'overflow': _vm.isContentOverflow }},[_c('transition',{attrs:{"name":"fade-overlay"}},[(_vm.show)?_c('div',{staticClass:"modal-overlay"}):_vm._e()]),_vm._v(" "),_c('transition',{attrs:{"name":_vm.transition}},[(_vm.show)?_c('div',{staticClass:"modal-wrapper",on:{"click":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.close($event);}}},[_c('div',{staticClass:"modal-container",style:({ maxWidth: _vm.maxWidth + 'px' })},[_c('header',{staticClass:"modal-header"},[_vm._t("header")],2),_vm._v(" "),_c('div',{ref:"modal_content",staticClass:"modal-content",style:({ overflowX: _vm.overflowX ? 'auto' : 'hidden' })},[_vm._t("default")],2),_vm._v(" "),_c('footer',{staticClass:"modal-footer"},[_vm._t("footer")],2)])]):_vm._e()])],1)},staticRenderFns: [],
  props: {
    show: { type: Boolean, default: false },
    overflowX: { type: Boolean, default: false },
    transition: { type: String, default: 'zoom' },
    maxWidth: { type: Number, default: 480 },
  },

  data() {
    return {
      isContentOverflow: false,
    }
  },

  methods: {
    controlBodyOverflow() {
      const { modal_content } = this.$refs;
      if (modal_content) {
        this.isContentOverflow = modal_content.scrollHeight > modal_content.clientHeight;
      }
    },

    close() {
      if (this.show) this.$emit('close');
    },
  },

  watch: {
    'show'(show) {
      if (show) {
        this.$tampan.modalShowNumber += 1;
      } else {
        this.$tampan.modalShowNumber -= 1;
      }
    },

    '$tampan.client': {
      deep: true,
      handler() {
        this.controlBodyOverflow();
      }
    },
  },

  mounted() {
    this.controlBodyOverflow();
    this.$tampan.$on('modal:close', this.close);
    this.$tampan.$on('window:resize', this.controlBodyOverflow);
    this.$tampan.$on('modal:overflowcontrol', this.controlBodyOverflow);
  },

  updated() {
    this.controlBodyOverflow();
  },

  beforeDestroy() {
    this.$tampan.$off('modal:close', this.close);
    this.$tampan.$off('window:resize', this.controlBodyOverflow);
    this.$tampan.$off('modal:overflowcontrol', this.controlBodyOverflow);
  },
};

var Page = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"page"},[(_vm.$slots.header)?_c('div',{staticClass:"page-header"},[_vm._t("header")],2):_c('div',{staticClass:"page-header"},[(_vm.titleButton === 'menu' && _vm.$tampan.isSidebarToggleable)?_c('button-base',{attrs:{"icon-class":"material-icons","icon-text":"menu"},on:{"click":_vm.$tampan.toggleSidebar}}):(_vm.titleButton === 'back')?_c('button-base',{attrs:{"icon-class":"material-icons","icon-text":"arrow_back"},on:{"click":_vm.back}}):_vm._e(),_vm._v(" "),_c('h1',{staticClass:"page-title"},[_vm._v(_vm._s(_vm.title))])],1),_vm._v(" "),_c('div',{staticClass:"page-content",style:({ overflowY: _vm.overflowY ? 'scroll' : 'hidden', overflowX: _vm.overflowX ? 'scroll' : 'hidden', padding: _vm.noPadding ? '0px' : 'auto' }),on:{"scroll":function($event){_vm.$emit('page-scroll', $event);}}},[_vm._t("default")],2),_vm._v(" "),(_vm.$slots.footer)?_c('div',{staticClass:"page-footer"},[_vm._t("footer")],2):_vm._e()])},staticRenderFns: [],
  props: {
    overflowY: { type: Boolean, default: true },
    overflowX: { type: Boolean, default: false },
    noPadding: { type: Boolean, default: false },
  },
};

const sidebarWidth = 280;
let timeTouchStart;

var AdminPanel = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"admin-panel"},[_c('transition',{attrs:{"name":"fade-overlay"}},[(_vm.$tampan.isSidebarShow && _vm.$tampan.isSidebarToggleable)?_c('div',{staticClass:"tampan-sidebar-overlay",on:{"click":_vm.$tampan.toggleSidebar}}):_vm._e()]),_vm._v(" "),_c('section',{staticClass:"tampan-sidebar",style:(_vm.sidebarStyle)},[(_vm.$slots.header)?_c('header',{staticClass:"tampan-header"},[_vm._t("header")],2):_vm._e(),_vm._v(" "),_c('ul',{staticClass:"menu-groups",attrs:{"role":"navigation"}},_vm._l((_vm.menuGroups),function(menuGroup){return _c('li',{key:menuGroup.name,staticClass:"menu-group"},[_c('span',{staticClass:"menu-group-title"},[_vm._v(_vm._s(menuGroup.name))]),_vm._v(" "),_vm._l((menuGroup.menus),function(menu){return _c('ul',{key:menu.route ? menu.route.name : menu.name,staticClass:"menus"},[_c('li',{staticClass:"menu"},[(menu.route)?_c('router-link',{staticClass:"menu-link",attrs:{"to":menu.route}},[_c('i',{staticClass:"menu-icon",class:menu.iconClass || 'material-icons'},[_vm._v(_vm._s(menu.iconText))]),_vm._v(" "),_c('span',{staticClass:"menu-text"},[_vm._v(_vm._s(menu.name))])]):_c('a',{staticClass:"menu-link exteral-link",attrs:{"href":menu.href,"target":"_blank"}},[_c('i',{staticClass:"menu-icon",class:menu.iconClass || 'material-icons'},[_vm._v(" "+_vm._s(menu.iconText)+" ")]),_vm._v(" "),_c('span',{staticClass:"menu-text"},[_vm._v(_vm._s(menu.name))])])],1)])})],2)}))]),_vm._v(" "),_c('section',{staticClass:"tampan-content",attrs:{"role":"main"}},[_vm._t("content")],2)],1)},staticRenderFns: [],
  props: {
    menuGroups: { type: Array, default: () => [] },
  },

  data() {
    return {
      isSliding: false,
      isScrolling: false,
      touchX: 0,
      touchXStart: 0,
    }
  },

  computed: {
    sidebarOffset() {
      if (this.isSliding) {
        const touchXDiff = this.touchX - this.touchXStart;
        if (!(this.$tampan.isSidebarVisible || !this.menuGroups.length)) {
          return touchXDiff > sidebarWidth ? 0 : -sidebarWidth + touchXDiff
        } else {
          return touchXDiff < -sidebarWidth ? -sidebarWidth : (touchXDiff > 0 ? 0 : touchXDiff)
        }
      } else {
        return this.$tampan.isSidebarVisible ? 0 : -sidebarWidth
      }
    },

    sidebarStyle() {
      const style = { 'transform': `translateX(${this.sidebarOffset}px)` };
      if (this.isSliding) style['transition'] = 'none';
      return style
    },
  },

  methods: {
    touchstart(event) {
      const touch = event.changedTouches[0];
      if (!touch) return
      if (!this.$tampan.isSidebarShow && touch.clientX <= 44) {
        this.isSliding = true;
        this.touchX = this.touchXStart = touch.clientX;
      }
      timeTouchStart = new Date().getTime();
    },

    touchmove(event) {
      const touch = event.changedTouches[0];
      if (!touch) return
      if (this.isSliding) {
        this.touchX = touch.clientX;
      }
      if (this.$tampan.isSidebarShow && !this.isSliding) {
        this.isSliding = true;
        this.touchX = this.touchXStart = touch.clientX;
      }
    },

    touchend(event) {
      if (this.isSliding) {
        const touchXDiff = this.touchX - this.touchXStart;
        const touchTimeDiff = new Date().getTime() - timeTouchStart;
        if (
          !this.$tampan.isSidebarShow
          && (touchXDiff > 120 || (touchXDiff > 50 && touchTimeDiff < 300))
        ) this.$tampan.showSidebar();
        else if (
          this.$tampan.isSidebarShow
          && (touchXDiff < -120 || (touchXDiff < -50 && touchTimeDiff < 300))
        ) this.$tampan.hideSidebar();
      }
      this.touchX = this.touchXStart = 0;
      this.isSliding = false;
    },

    touchcancel() {
      this.touchX = this.touchXStart = 0;
      this.isSliding = false;
    },
  },

  mounted() {
    this.$watch(() => {
      if (this.$tampan.isSidebarToggleable) {
        window.addEventListener('touchstart', this.touchstart, { passive: true });
        window.addEventListener('touchmove', this.touchmove, { passive: true });
        window.addEventListener('touchend', this.touchend, { passive: true });
        window.addEventListener('touchcancel', this.touchcancel, { passive: true });
      } else {
        window.removeEventListener('touchstart', this.touchstart);
        window.removeEventListener('touchmove', this.touchmove);
        window.removeEventListener('touchend', this.touchend);
        window.removeEventListener('touchcancel', this.touchcancel);
      }
    });

    this.$router.beforeEach((to, from, next) => {
      if (this.$tampan.isSidebarToggleable) {
        this.$tampan.isSidebarShow = false;
      }
      next();
    });
  },
};

var ModalList = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('Modal',{attrs:{"show":_vm.isModalExist},on:{"close":function($event){(_vm.modal.type === 'alert' ? _vm.modal.resolve : _vm.modal.rejectModal)();}}},[_c('div',{attrs:{"slot":"header"},slot:"header"},[_c('h2',{staticClass:"modal-title"},[_vm._v(_vm._s(_vm.modal.title))])]),_vm._v(" "),_c('p',{staticClass:"modal-text"},[_vm._v(_vm._s(_vm.modal.text))]),_vm._v(" "),_c('template',{attrs:{"slot":"footer"},slot:"footer"},[_c('div',{staticClass:"button-group",staticStyle:{"text-align":"right"}},[(_vm.modal.type === 'alert')?_c('button-base',{attrs:{"icon-text":"close"},on:{"click":_vm.modal.resolve}},[_vm._v("Tutup")]):_vm._e(),_vm._v(" "),(_vm.modal.type === 'confirm')?_c('button-base',{attrs:{"icon-text":"close"},on:{"click":_vm.modal.reject}},[_vm._v(_vm._s(_vm.modal.rejectText))]):_vm._e(),_vm._v(" "),(_vm.modal.type === 'confirm')?_c('button-base',{attrs:{"icon-text":"check"},on:{"click":_vm.modal.resolve}},[_vm._v(_vm._s(_vm.modal.resolveText))]):_vm._e()],1)])],2)},staticRenderFns: [],
  components: {
    Modal,
    ButtonBase,
  },

  computed: {
    modal() {
      return this.$tampan.modalList[0] || {}
    },

    isModalExist() {
      return Object.keys(this.modal).length !== 0
    },
  },
};

var Tampan = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tampan"},[_vm._t("default"),_vm._v(" "),_c('ModalList')],2)},staticRenderFns: [],
  components: {
    ModalList,
  },

  mounted() {
    if (this.$router) {
      this.$router.beforeEach((to, from, next) => {
        if (this.$tampan.modalShowNumber === 0) {
          next();
        } else {
          next(false);
          this.$tampan.$emit('modal:close');
        }
      });
    }
  },
};

function toMysqlDate(date) {
  date = new Date(date);
  if (!isFinite(date)) return null
  return toISO8601(date)
}

function toMysqlDateTime(datetime) {
  datetime = new Date(datetime);
  if (!isFinite(datetime)) return null
  return datetime.getUTCFullYear() + "-" + toDigit(1 + datetime.getUTCMonth(), 2) + "-" + toDigit(datetime.getUTCDate(), 2) + " " + toDigit(datetime.getUTCHours(), 2) + ":" + toDigit(datetime.getUTCMinutes(), 2) + ":" + toDigit(datetime.getUTCSeconds(), 2)
}

function fromMysqlDateTime(datetime) {
  datetime = new Date(datetime);
  if (!isFinite(datetime)) return null
  datetime.setHours(datetime.getHours() + (datetime.getTimezoneOffset() / -60));
  return datetime
}

function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function isJSONString(string) {
  try {
    return true
  } catch (e) {
    return false
  }
}

function getPath(target, path) {
  const pathSegments = path.split('.');
  return pathSegments.reduce((holder, pathSegment) => {
    return holder[pathSegment]
  }, target)
}

function setPath(target, path, newValue) {
  const pathSegments = path.split('.');
  const lastPath = pathSegments.pop();
  const holder = pathSegments.reduce((holder, pathSegment) => {
    return holder[pathSegment]
  }, target);
  holder[lastPath] = newValue;
}

// import './style/index.css'

const VueTampan = {
  install(Vue$$1, mixin) {
    const tampan = initiateTampan(mixin);
    initiateLayout({ tampan });
    Vue$$1.prototype.$tampan = tampan;
    Vue$$1.component('button-tampan', ButtonBase);
    Vue$$1.component('vue-tampan', Tampan);
    Vue$$1.component('modal', Modal);
    Vue$$1.component('field', Field);
    Vue$$1.component('input-address-ind', InputAddressInd);
    Vue$$1.component('input-date', InputDate);
    Vue$$1.component('input-datetime', InputDatetime);
    Vue$$1.component('input-select', InputSelect);
    Vue$$1.component('admin-panel', AdminPanel);
    Vue$$1.component('box', Box);
    Vue$$1.component('column', Column);
    Vue$$1.component('page', Page);
    Vue$$1.component('row', Row);
  },
};

export { VueTampan, days, fromISO8601, getDayLengthInMonth, months, shortMonths, toIndoDate, toISO8601, toTimeHour, fromMysqlDateTime, toMysqlDate, toMysqlDateTime, isNumeric, toCurrency, toDigit, cloneObject, getPath, isJSONString, setPath, throttle };
