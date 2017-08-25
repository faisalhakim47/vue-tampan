<template>
  <div class="input input-sets input-date">
    <Row>
      <Column :width="{ sm: 1/7 }">
        <Field>
          <input type="number" min="1" max="31" v-model.number="date.date" @change="input">
        </Field>
      </Column>
      <Column :width="{ sm: 4/7 }">
        <Field>
          <select v-model.number="date.month">
            <option v-for="month in monthOptions" :value="month.value" :key="month.value">{{ month.label }}</option>
          </select>
        </Field>
      </Column>
      <Column :width="{ sm: 2/7 }">
        <Field>
          <input type="number" min="1000" max="9999" v-model.number="date.year" @change="input">
        </Field>
      </Column>
    </Row>
  </div>
</template>

<script>
import { months } from '../../tools/date'
import Field from './field.vue'
import Row from '../layout/row.vue'
import Column from '../layout/column.vue'

function dateToObject(date) {
  return {
    date: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  }
}

function objectToDate({ year, month, date }) {
  return new Date(year, month, date)
}

export default {
  props: {
    value: { type: [Date, String], default: () => new Date() }
  },

  components: {
    Field,
    Row,
    Column,
  },

  data() {
    const date = new Date(this.value)
    return {
      date: dateToObject(date),
      monthOptions: months.map((monthName, index) => {
        return {
          value: index,
          label: monthName
        }
      })
    }
  },

  methods: {
    input() {
      const date = objectToDate(this.date)
      this.$emit('input', date)
    }
  },

  watch: {
    value(newValue) {
      this.date = dateToObject(new Date(newValue))
    },
  }
}
</script>
