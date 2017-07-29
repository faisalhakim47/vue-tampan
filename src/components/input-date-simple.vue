<template>
  <div class="input input-date-simple">
    <Row>
      <Column :width="{ sm: 1/7 }">
        <InputNumber v-model="date.date" @input="input" :max-value="99" :min-value="1"></InputNumber>
      </Column>
      <Column :width="{ sm: 4/7 }">
        <InputSelect v-model="date.month" @input="input" :options="monthOptions"></InputSelect>
      </Column>
      <Column :width="{ sm: 2/7 }">
        <InputNumber v-model="date.year" @input="input" :max-value="9999" :min-value="0"></InputNumber>
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
