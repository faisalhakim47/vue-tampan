import { cloneObject, isJSONString } from '../../tools/object'
import InputText from './input-text'

export default {
  name: 'input-address',

  components: [
    InputText
  ],

  props: {
    value: { type: String, default: '{}', validator: isJSONString }
  },

  data() {
    return {
      objectValue: JSON.parse(this.value)
    }
  },

  // computed: {
  //   objectValue() {
  //     return JSON.parse(this.value)
  //   }
  // },

  methods: {
    update(patchAddress) {
      const newAddress = Object.assign(this.objectValue, patchAddress)
      const value = JSON.stringify(newAddress)
      this.$emit('input', { value })
    }
  },

  render(e) {
    const isSmallScreen = this.$tampan.client.isSmallScreen
    const smallcreenSparator = isSmallScreen
      ? e('div', {
        attrs: { style: 'width: 100%; height: 8px;' }
      })
      : null
    const largescreenSparator = e('div', {
      attrs: { style: 'width: 100%; height: 8px;' }
    })

    return e('div', {
      staticClass: 'input-address',
      attrs: { style: 'display: flex; flex-wrap: wrap; justify-content: space-between;' }
    }, [

        e('input-text', {
          attrs: { style: isSmallScreen ? 'width: 100%;' : 'width: 64%;' },
          props: { value: this.objectValue.street, placeholder: 'Nama jalan/dusun/desa' },
          on: { input: ev => this.update({ street: ev.value }) }
        }),

        smallcreenSparator,

        e('input-text', {
          attrs: { style: isSmallScreen ? 'width: 49%' : 'width: 17%;' },
          props: { type: 'number', value: this.objectValue.rt, placeholder: 'RT' },
          on: { input: ev => this.update({ rt: ev.value }) }
        }),

        e('input-text', {
          attrs: { style: isSmallScreen ? 'width: 49%' : 'width: 17%;' },
          props: { type: 'number', value: this.objectValue.rw, placeholder: 'RW' },
          on: { input: ev => this.update({ rw: ev.value }) }
        }),

        largescreenSparator,

        e('input-text', {
          attrs: { style: isSmallScreen ? 'width: 100%;' : 'width: 49.5%;' },
          props: { value: this.objectValue.village, placeholder: 'Kelurahan' },
          on: { input: ev => this.update({ village: ev.value }) }
        }),

        smallcreenSparator,

        e('input-text', {
          attrs: { style: isSmallScreen ? 'width: 100%;' : 'width: 49.5%;' },
          props: { value: this.objectValue.district, placeholder: 'Kecamatan' },
          on: { input: ev => this.update({ district: ev.value }) }
        }),

        largescreenSparator,

        e('input-text', {
          attrs: { style: isSmallScreen ? 'width: 64%;' : 'width: 64%;' },
          props: { value: this.objectValue.regency, placeholder: 'Kota' },
          on: { input: ev => this.update({ regency: ev.value }) }
        }),

        e('input-text', {
          attrs: { style: isSmallScreen ? 'width: 34%;' : 'width: 35%;' },
          props: { type: 'number', value: this.objectValue.postalcode, placeholder: 'Kode Pos' },
          on: { input: ev => this.update({ postalcode: ev.value }) }
        })

      ])
  }
}
