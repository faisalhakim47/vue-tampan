import { createArrayWithLength } from '../../tools/array'
import { months, getDayLengthInMonth } from '../../tools/date'
import { isNumber } from '../../tools/typecheck'
import InputSelect from './input-select'

export default {
  props: {
    value: [String, Date],
    minYear: { type: Number, default: new Date().getFullYear() - 12 },
    maxYear: { type: Number, default: new Date().getFullYear() },
  },

  components: [InputSelect],

  data() {
    const date = new Date()
    return {
      date,
      dateLength: getDayLengthInMonth(date.getFullYear(), date.getMonth())
    }
  },

  computed: {
    yearOptionLength() {
      return this.maxYear - this.minYear + 1
    }
  },

  methods: {
    update({ date, month, year }) {
      console.log({ date, month, year })
      if (isNumber(date)) {
        this.date.setDate(parseInt(date, 10))
      }
      else if (isNumber(month)) {
        this.date.setMonth(parseInt(month, 10))
        this.dateLength = getDayLengthInMonth(
          this.date.getFullYear(),
          parseInt(month, 10)
        )
      }
      else if (isNumber(year)) {
        this.date.setFullYear(parseInt(year, 10))
        this.dateLength = getDayLengthInMonth(
          parseInt(year, 10),
          this.date.getMonth()
        )
      }
      const updateEvent = { value: this.date }
      this.$emit('change', updateEvent)
      this.$emit('input', updateEvent)
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.date = new Date(this.value)
      if (this.date.toString() === 'Invalid Date') {
        this.date = new Date()
      }
    })
  },

  render(e) {
    console.log('DATE', this.date)
    return e('div', { staticClass: 'input input-date is-frameless' }, [
      e('input-select', {
        staticClass: 'input-date-date',
        props: {
          value: this.date.getDate(),
          options: createArrayWithLength(this.dateLength).map((_, i) => i + 1)
        },
        on: {
          change: ({ value }) => this.update({ date: value })
        }
      }),
      e('input-select', {
        staticClass: 'input-date-month',
        props: {
          value: months[this.date.getMonth()],
          options: months
        },
        on: {
          change: ({ value }) => this.update({ month: months.indexOf(value) })
        }
      }),
      e('input-select', {
        staticClass: 'input-date-year',
        props: {
          value: this.date.getFullYear(),
          options: createArrayWithLength(this.yearOptionLength).map((_, i) => i + this.minYear)
        },
        on: {
          change: ({ value }) => this.update({ year: value })
        }
      }),
    ])
  }
}
