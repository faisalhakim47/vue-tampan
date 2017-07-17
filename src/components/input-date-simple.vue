<template>
  <div class="input input-date-simple">
    <Row>
      <Column :sm="1/7">
        <InputNumber v-model="date.date" :max-value="99" :min-value="1"></InputNumber>
      </Column>
      <Column :sm="4/7">
        <InputSelect v-model="date.month" :options="monthOptions"></InputSelect>
      </Column>
      <Column :sm="2/7">
        <InputNumber v-model="date.year" :max-value="9999" :min-value="0"></InputNumber>
      </Column>
    </Row>
  </div>
</template>

<script>
import { months } from '../tools/date'
import InputNumber from './input-number.vue'
import InputSelect from './input-select.vue'
import Row from './row.vue'
import Column from './column.vue'

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
    InputNumber,
    InputSelect,
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

  watch: {
    date: {
      deep: true,
      handler() {
        const date = objectToDate(this.date)
        this.$emit('input', date)
      }
    }
  }
}
</script>
