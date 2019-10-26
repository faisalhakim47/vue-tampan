import { throttle } from '../tools/throttle.js';

import Field from './Field.js';
import Row from './Row.js';
import Column from './Column.js';
import InputSelect from './InputSelect.js';

function parseJson(address) {
  if (address && typeof address === 'object') {
    return address;
  }
  try {
    return JSON.parse(address);
  }
  catch (e) {
    console.warn('wrong address format', e);
    return {};
  }
}

export default {
  props: {
    endpoint: { type: String },
    value: { type: String, default: '{}' },
    disabled: { type: Boolean, default: false },
  },

  components: {
    Field,
    Column,
    Row,
    InputSelect,
  },

  data() {
    const address = parseJson(this.value);
    return {
      provinces: [],
      regencies: [],
      districts: [],
      villages: [],
      address,
      isManualFetch: true,
    };
  },

  methods: {
    request(query) {
      const sparator = this.endpoint.indexOf('?') === -1 ? '?' : '&'
      const queryString = Object.keys(query).map((key) => `${key}=${query[key]}`).join('&')
      const url = `${this.endpoint}${sparator}${queryString}`;
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest()
        request.open('GET', url, true)
        request.addEventListener('readystatechange', () => {
          if (request.readyState === request.DONE) {
            if (request.status === 200) {
              resolve(JSON.parse(request.responseText))
            }
            else {
              reject(request.responseText)
            }
          }
        })
        request.addEventListener('error', reject)
        request.send()
      })
    },

    prefetchAddress() {
      const promises = []
      promises.push(
        this.request({ type: 'province' })
          .then((provinces) => this.provinces = provinces)
      )
      if (this.address.province_id) promises.push(
        this.request({
            type: 'regency',
            province_id: this.address.province_id,
        }).then((regencies) => this.regencies = regencies)
      )
      if (this.address.regency_id) promises.push(
        this.request({
          type: 'district',
          regency_id: this.address.regency_id
        }).then((districts) => this.districts = districts)
      )
      if (this.address.district_id) promises.push(
        this.request({
          type: 'village',
          district_id: this.address.district_id
        }).then((villages) => this.villages = villages)
      )
      Promise.all(promises).then(() => {
        this.isManualFetch = false
      })
    },

    fetchProvinces() {
      this.request({ type: 'province' })
        .then((provinces) => {
          this.provinces = provinces
        })
    },

    fetchRegencies() {
      if (this.address.province_id === null) this.regencies = []
      else this.request({
          type: 'regency',
          province_id: this.address.province_id,
      }).then((regencies) => {
        this.regencies = regencies
      })
    },

    fetchDistricts() {
      if (this.address.regency_id === null) this.districts = []
      else this.request({
          type: 'district',
          regency_id: this.address.regency_id
      }).then((districts) => {
        this.districts = districts
      })
    },

    fetchVillages() {
      if (this.address.district_id === null) this.villages = []
      else this.request({
          type: 'village',
          district_id: this.address.district_id
      }).then((villages) => {
        this.villages = villages
      })
    },
  },

  watch: {
    value(value) {
      this.isManualFetch = true
      this.address = parseJson(value)
      this.prefetchAddress()
    },

    'address.province_id'() {
      if (this.isManualFetch) return
      this.address.regency_id = null
      this.address.district_id = null
      this.address.village_id = null
      this.fetchRegencies()
    },

    'address.regency_id'() {
      if (this.isManualFetch) return
      this.address.district_id = null
      this.address.village_id = null
      this.fetchDistricts()
    },

    'address.district_id'() {
      if (this.isManualFetch) return
      this.address.village_id = null
      this.fetchVillages()
    },

    address: {
      deep: true,
      handler(address) {
        this.$emit('input', JSON.stringify(address));
      },
    },
  },

  mounted() {
    this.prefetchAddress();
  },

  template: `
    <div class="idn-input-address input-sets">
      <Row>
        <Column :width="{ sm: 4/4, md: 2/4 }" style="margin: .25rem 0;">
          <Field label="Kode POS">
            <input type="number" :disabled="disabled" v-model="address.postalcode">
          </Field>
        </Column>
        <Column :width="{ sm: 4/4, md: 2/4 }" style="margin: .25rem 0;">
          <Field label="Provinsi">
            <input-select
              :options="provinces"
              :disabled="provinces.length === 0"
              v-model="address.province_id"
            ></input-select>
          </Field>
        </Column>
        <Column :width="{ sm: 4/4, md: 2/4 }" style="margin: .25rem 0;">
          <Field label="Kota">
            <input-select
              :options="regencies"
              :disabled="regencies.length === 0"
              v-model="address.regency_id"
            ></input-select>
          </Field>
        </Column>
        <Column :width="{ sm: 4/4, md: 2/4 }" style="margin: .25rem 0;">
          <Field label="Kecamatan">
            <input-select
              :options="districts"
              :disabled="districts.length === 0"
              v-model="address.district_id"
            ></input-select>
          </Field>
        </Column>
        <Column :width="{ sm: 4/4, md: 2/4 }" style="margin: .25rem 0;">
          <Field label="Kelurahan/Desa">
            <input-select
              :options="villages"
              :disabled="villages.length === 0"
              v-model="address.village_id"
            ></input-select>
          </Field>
        </Column>
        <Column :width="{ sm: 2/4, md: 1/4 }" style="margin: .25rem 0;">
          <Field label="RT">
            <input type="number" :disabled="disabled" v-model="address.rt">
          </Field>
        </Column>
        <Column :width="{ sm: 2/4, md: 1/4 }" style="margin: .25rem 0;">
          <Field label="RW">
            <input type="number" :disabled="disabled" v-model="address.rw">
          </Field>
        </Column>
        <Column :width="{ sm: 4/4 }" style="margin: .25rem 0;">
          <Field label="Jalan">
            <input type="text" :disabled="disabled" v-model="address.street">
          </Field>
        </Column>
      </Row>
    </div>
  `,
};
