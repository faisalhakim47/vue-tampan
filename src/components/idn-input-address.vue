<template>
  <div class="idn-input-address">
  
    <Row>
      <Column :width="{ md: 4/6 }">
        <InputText v-model="addressObject.street" placeholder="Nama jalan/dusun"></InputText>
      </Column>
      <Column :width="{ sm: 2/8, md: 1/6 }">
        <InputNumber v-model="addressObject.rt" placeholder="RT"></InputNumber>
      </Column>
      <Column :width="{ sm: 2/8, md: 1/6 }">
        <InputNumber v-model="addressObject.rw" placeholder="RW"></InputNumber>
      </Column>
      <Column :width="{ sm: 4/8, md: 1/6 }">
        <InputNumber v-model="addressObject.postalcode" placeholder="Kode POS"></InputNumber>
      </Column>
      <Column :width="{ md: 2/6 }">
        <InputAutotext v-model="addressObject.province" placeholder="Provinsi"></InputAutotext>
      </Column>
      <Column :width="{ md: 3/6 }">
        <InputText v-model="addressObject.regency" placeholder="Kota/kabupaten"></InputText>
      </Column>
      <Column :width="{ md: 3/6 }">
        <InputText v-model="addressObject.district" placeholder="Kecamatan"></InputText>
      </Column>
      <Column :width="{ md: 3/6 }">
        <InputText v-model="addressObject.village" placeholder="Kelurahan"></InputText>
      </Column>
    </Row>
  
  </div>
</template>

<script>
import { throttle } from '../tools/throttle'
import InputAutotext from './input-autotext.vue'
import InputText from './input-text.vue'
import InputNumber from './input-number.vue'
import Row from './row.vue'
import Column from './column.vue'

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
    InputAutotext,
    InputText,
    InputNumber,
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

<style>
.idn-input-address .column {
  padding: 4px;
}
</style>
