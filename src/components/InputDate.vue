<template>
  <input v-if="isUsingISO8601" type="date" v-model="ISO8601" @input="ISO8601Input">
  <div v-else class="input input-sets input-date">
    <Row>
      <Column :width="{ sm: 2/8 }">
        <Field>
          <input type="number" min="1" max="31" v-model.number="date.date" @input="input">
        </Field>
      </Column>
      <Column :width="{ sm: 4/8 }">
        <Field>
          <select v-model.number="date.month" @input="input">
            <option v-for="month in monthOptions" :value="month.value" :key="month.value">{{ month.label }}</option>
          </select>
        </Field>
      </Column>
      <Column :width="{ sm: 2/8 }">
        <Field>
          <input type="number" min="1000" max="9999" v-model.number="date.year" @input="input">
        </Field>
      </Column>
    </Row>
  </div>
</template>

<script>
import { months, fromISO8601, toISO8601 } from '../tools/date'
import Field from './Field.vue'
import Row from './Row.vue'
import Column from './Column.vue'

function dateToObject(date = new Date()) {
  date = new Date(date)
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
export default {
  props: {
    value: { type: Date, default: () => new Date() }
  },

  components: {
    Field,
    Row,
    Column,
  },

  data() {
    const date = new Date(this.value)
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
        const date = objectToDate(this.date)
        this.$emit('input', date)
      })
    },

    ISO8601Input() {
      const date = fromISO8601(this.ISO8601)
      this.$emit('input', date)
    },
  },

  watch: {
    value(newValue) {
      this.ISO8601 = toISO8601(new Date(newValue))
      this.date = dateToObject(new Date(newValue))
    },
  }
}
</script>
