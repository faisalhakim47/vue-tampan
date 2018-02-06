import { fromISO8601, toISO8601 } from '../tools/date.js'

import InputDate from './InputDate.js'
import InputTime from './InputTime.js'
import Field from './Field.js'
import Row from './Row.js'
import Column from './Column.js'

export default {
  props: {
    value: { type: Date, default: () => new Date() },
    disabled: { type: Boolean, default: false },
  },

  components: {
    InputDate,
    InputTime,
    Field,
    Row,
    Column,
  },

  data() {
    const date = new Date(this.value)
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
      datetime = new Date(datetime)
      datetime.setHours(datetime.getHours() + (datetime.getTimezoneOffset() / -60))
      return toISO8601(datetime, { includeTime: true }).slice(0, -1)
    },

    fromISO8601(ISO8601) {
      const datetime = new Date(ISO8601 + 'Z')
      datetime.setHours(datetime.getHours() - (datetime.getTimezoneOffset() / -60))
      return datetime
    },

    input() {
      const datetime = new Date(this.date)
      this.$emit('input', datetime)
    },

    ISO8601Input() {
      this.$emit('input', this.fromISO8601(this.ISO8601))
    },
  },

  watch: {
    value(newValue) {
      this.date = new Date(newValue)
      this.ISO8601 = this.toISO8601(this.date)
    },
  },

  template: `
    <input v-if="isUsingISO8601" type="datetime-local" :disabled="disabled" v-model="ISO8601" @input="ISO8601Input">
    <div v-else class="input input-sets input-date">
      <row>
        <column :width="{ md: 1/3 }">
          <field label="Jam">
            <input-time :disabled="disabled" v-model="date" @input="input"></input-time>
          </field>
        </column>
        <column :width="{ md: 2/3 }">
          <field label="Tanggal">
            <input-date :disabled="disabled" v-model="date" @input="input"></input-date>
          </field>
        </column>
      </row>
    </div>
  `,  
}
