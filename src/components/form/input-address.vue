<template>
  <div class="input-address" style="display: flex; flex-wrap: wrap; justify-content: space-between;">
    <input-text :style="{ width: isSmallScreen ? '100%' : '64%' }" placeholder="Nama jalan/dusun/desa" v-model="addressObject.street"></input-text>
  
    <div v-if="isSmallScreen" class="sparator" style="width: 100%; height: 8px;"></div>
  
    <input-text :style="{ width: isSmallScreen ? '49%' : '17%' }" placeholder="RT" v-model="addressObject.rt"></input-text>
  
    <input-text :style="{ width: isSmallScreen ? '49%' : '17%' }" placeholder="RW" v-model="addressObject.rw"></input-text>
  
    <div class="sparator" style="width: 100%; height: 8px;"></div>
  
    <input-text :style="{ width: isSmallScreen ? '100%' : '49.5%' }" placeholder="Kelurahan" v-model="addressObject.village"></input-text>
  
    <div v-if="isSmallScreen" class="sparator" style="width: 100%; height: 8px;"></div>
  
    <input-text :style="{ width: isSmallScreen ? '100%' : '49.5%' }" placeholder="Kecamatan" v-model="addressObject.district"></input-text>
  
    <div class="sparator" style="width: 100%; height: 8px;"></div>
  
    <input-text :style="{ width: isSmallScreen ? '100%' : '64%' }" placeholder="Kota" v-model="addressObject.regency"></input-text>
  
    <input-text :style="{ width: isSmallScreen ? '100%' : '35%' }" placeholder="Kode Pos" v-model="addressObject.postalcode"></input-text>
  </div>
</template>

<script>
import { cloneObject, isJSONString } from '../../tools/object'
import InputText from './input-text'

export default {
  name: 'input-address',

  components: {
    'input-text': InputText
  },

  props: {
    value: { type: String, default: '{}', validator: isJSONString }
  },

  data() {
    return {
      addressObject: JSON.parse(this.value)
    }
  },

  watch: {
    addressObject() {
      this.$emit('input', JSON.stringify(this.addressObject))
    }
  }
}
</script>