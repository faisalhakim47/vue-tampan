<template>
  <div class="idn-input-address input-sets">
    <Row>
      <Column :width="{ sm: 4/4, md: 2/4 }">
        <Field label="Kode POS">
          <input type="number" v-model="addressObject.postalcode">
        </Field>
      </Column>
      <Column :width="{ sm: 4/4, md: 2/4 }">
        <Field label="Provinsi">
          <input type="text" v-model="addressObject.province">
        </Field>
      </Column>
      <Column :width="{ sm: 4/4, md: 2/4 }">
        <Field label="Kota">
          <input type="text" v-model="addressObject.regency">
        </Field>
      </Column>
      <Column :width="{ sm: 4/4, md: 2/4 }">
        <Field label="Kecamatan">
          <input type="text" v-model="addressObject.district">
        </Field>
      </Column>
      <Column :width="{ sm: 4/4, md: 2/4 }">
        <Field label="Kelurahan">
          <input type="text" v-model="addressObject.village">
        </Field>
      </Column>
      <Column :width="{ sm: 2/4, md: 1/4 }">
        <Field label="RT">
          <input type="number" v-model="addressObject.rt">
        </Field>
      </Column>
      <Column :width="{ sm: 2/4, md: 1/4 }">
        <Field label="RW">
          <input type="number" v-model="addressObject.rw">
        </Field>
      </Column>
      <Column :width="{ sm: 4/4 }">
        <Field label="Jalan">
          <input type="text" v-model="addressObject.street">
        </Field>
      </Column>
    </Row>
  </div>
</template>

<script>
  import { throttle } from '../../tools/throttle'
  import Field from './field.vue'
  import Row from '../layout/row.vue'
  import Column from '../layout/column.vue'

  function addressToObject(address) {
    if (address && typeof address === 'object') {
      return address
    }
    try {
      const { street, rt, rw, village, district, regency, province, postalcode } = JSON.parse(address)
      return { street, rt, rw, village, district, regency, province, postalcode }
    } catch (e) {
      console.warn('wrong address format', e)
      return {}
    }
  }

  function objectToAddress({ street, rt, rw, village, district, regency, province, postalcode }) {
    return JSON.stringify({ street, rt, rw, village, district, regency, province, postalcode })
  }

  export default {
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
          this.addressObject = addressToObject(value)
        }
      },
      addressObject: {
        deep: true,
        handler(addressObject) {
          this.$emit('input', JSON.stringify(addressObject))
        }
      },
    },
  }
</script>
