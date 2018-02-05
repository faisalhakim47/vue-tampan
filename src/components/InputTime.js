import { months, toISO8601, dateToObject, objectToDate } from '../tools/date.js'

import Field from './Field.js'
import Row from './Row.js'
import Column from './Column.js'

export default {
  props: {
    value: { type: Date, default: () => new Date() },
    disabled: { type: Boolean, default: false },
  },

  components: {
    Field,
    Row,
    Column,
  },

  data() {
    const date = new Date(this.value)
    return {
      ISO8601Time: toISO8601(date, { includeDate: false, includeTime: true }),
      date: dateToObject(date),
    }
  },

  computed: {
    isUsingISO8601() {
      return this.$tampan.client.isMobileOS
    },
  },

  methods: {
    input() {
      const date = objectToDate(this.date)
      this.$emit('input', date)
    },

    ISO8601Input() {
      const { year, month, date } = this.date
      const [hour, minute, second] = this.ISO8601Time.split(':').map(p => parseFloat(p))
      const result = new Date(year, month, date, hour, minute, second)
      this.$emit('input', result)
    },
  },

  watch: {
    value(newValue) {
      this.ISO8601Time = toISO8601(new Date(newValue), { includeDate: false, includeTime: true })
      this.date = dateToObject(new Date(newValue))
      console.log(this.date.hour)
    },
  },

  template: `
    <input v-if="isUsingISO8601" type="time" v-model="ISO8601Time" @input="ISO8601Input">
    <div v-else class="input input-sets input-date">
      <Row>
        <Column :width="{ sm: 1/2 }">
          <Field>
            <input type="number" min="0" max="23" v-model.number="date.hour" @input="input" :disabled="disabled">
          </Field>
        </Column>
        <Column :width="{ sm: 1/2 }">
          <Field>
            <input type="number" min="0" max="59" v-model.number="date.minute" @input="input" :disabled="disabled">
          </Field>
        </Column>
      </Row>
    </div>
  `
}
