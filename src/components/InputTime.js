import { months, toISO8601, dateToObject, objectToDate } from '../tools/date.js'
import { toDigit } from '../tools/number.js'

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
      const [hour, minute] = this.ISO8601Time.split(':').map(p => parseInt(p, 10))
      const result = new Date(year, month, date, hour, minute)
      this.$emit('input', result)
    },
  },

  watch: {
    value(newValue) {
      const date = new Date(newValue)
      this.ISO8601Time = `${toDigit(date.getHours(), 2)}:${toDigit(date.getMinutes(), 2)}`
      this.date = dateToObject(new Date(newValue))
    },
  },

  template: `
    <input v-if="isUsingISO8601" type="time" :disabled="disabled" v-model="ISO8601Time" @input="ISO8601Input">
    <div v-else class="input input-sets input-date">
      <Row>
        <Column :width="{ sm: 1/2 }">
          <Field>
            <input type="number" min="0" max="23" :disabled="disabled" v-model.number="date.hour" @input="input">
          </Field>
        </Column>
        <Column :width="{ sm: 1/2 }">
          <Field>
            <input type="number" min="0" max="59" :disabled="disabled" v-model.number="date.minute" @input="input">
          </Field>
        </Column>
      </Row>
    </div>
  `
}
