<template>
  <div class="idn-input-address">
  
    <Row>
      <Column :sm="4/6">
        <InputText v-model="addressObject.street" placeholder="Nama jalan/dusun"></InputText>
      </Column>
      <Column :sm="1/6">
        <InputNumber v-model="addressObject.rt" placeholder="RT"></InputNumber>
      </Column>
      <Column :sm="1/6">
        <InputNumber v-model="addressObject.rw" placeholder="RW"></InputNumber>
      </Column>
      <Column :sm="1/6">
        <InputNumber v-model="addressObject.postalcode" placeholder="Kode POS"></InputNumber>
      </Column>
      <Column :sm="2/6">
        <InputAutotext v-model="addressObject.province" placeholder="Provinsi" :dataProvider="provinceSuggestionProvider"></InputAutotext>
      </Column>
      <Column :sm="3/6">
        <InputText v-model="addressObject.regency" placeholder="Kota/kabupaten"></InputText>
      </Column>
      <Column :sm="3/6">
        <InputText v-model="addressObject.district" placeholder="Kecamatan"></InputText>
      </Column>
      <Column :sm="3/6">
        <InputText v-model="addressObject.village" placeholder="Kelurahan"></InputText>
      </Column>
    </Row>
  
  </div>
</template>

<script>
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
    const { street, rt, rw, village, district, regecency, province, postalcode } = JSON.parse(address)
    return { street, rt, rw, village, district, regecency, province, postalcode }
  } catch (e) {
    return {}
  }
}

function objectToAddress({ street, rt, rw, village, district, regecency, province, postalcode }) {
  return JSON.stringify({ street, rt, rw, village, district, regecency, province, postalcode })
}

export default {
  props: {
    value: { type: [String, Object], default: () => ({}) }
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
      provinceSuggestionProvider: ({ query }) => new Promise((resolve) => {
        setTimeout(
          () => resolve(
            [
              'Jawa Tengah',
              'Jawa Timur',
              'Jawa Barat',
              'Jawa Selatan',
              'Jogjakarta',
            ]
              .map((name) => ({ text: name, value: name, search: name }))
              .filter(({ search }) => new RegExp(query, 'i').test(search))
          ),
          500
        )
      })
    }
  },
}
</script>

<style>
.idn-input-address .column {
  padding: 4px;
}
</style>
