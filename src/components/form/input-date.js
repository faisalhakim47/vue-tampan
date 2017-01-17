import { createArrayWithLength } from '../../tools/array'
import { months, getDayLengthInMonth } from '../../tools/date'
import InputSelect from './input-select'

export default {
  props: ['value'],
  props: {
    value: {
      required: true,
      validator: function (value) {
        return value instanceof Date
      }
    }
  },
  components: [InputSelect],
  data() {
    let date = new Date(this.value || value)
    if (date.toString() === 'Invalid Date') {
      date = new Date()
    }
    return {
      date,
      dateLength: getDayLengthInMonth(date.getFullYear(), date.getMonth())
    }
  },
  methods: {
    update({ target, date, month, year }) {
      if (date) {
        this.date.setDate(parseInt(date, 10))
      }
      else if (month) {
        this.date.setMonth(parseInt(month, 10))
        this.dateLength = getDayLengthInMonth(
          this.date.getFullYear(),
          parseInt(month, 10)
        )
      }
      else if (year) {
        this.date.setFullYear(parseInt(year, 10))
        this.dateLength = getDayLengthInMonth(
          parseInt(year, 10),
          this.date.getMonth()
        )
      }
      this.$emit('change', { target, value: this.date })
    }
  },
  render(e) {
    return e('div', { staticClass: 'input input-date is-frameless' }, [
      e('input-select', {
        staticClass: 'input-date-date',
        props: {
          value: this.date.getDate(),
          options: createArrayWithLength(this.dateLength).map((_, i) => i + 1)
        },
        on: {
          change: ({ target, value }) => this.update({ target, date: value })
        }
      }),
      e('input-select', {
        staticClass: 'input-date-month',
        props: {
          value: months[this.date.getMonth()],
          options: months
        },
        on: {
          change: ({ target, value }) => this.update({ target, month: months.indexOf(value) })
        }
      }),
      e('input-select', {
        staticClass: 'input-date-year',
        props: {
          value: this.date.getFullYear(),
          options: createArrayWithLength(20).map((_, i) => i + 1990)
        },
        on: {
          change: ({ target, value }) => this.update({ target, year: value })
        }
      }),
    ])
  }
}
