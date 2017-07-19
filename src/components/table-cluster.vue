<template>
  <div class="table-cluster" :style="{ 'height': `${tableHeight}px`, 'min-height': `${tableHeight}px`, 'max-height': `${tableHeight}px` }">
  
    <div class="table-cluster__header">
      <table class="">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header">{{ header }}</th>
          </tr>
        </thead>
      </table>
    </div>
  
    <div ref="table__body" class="table-cluster__body">
      <table class="table">
        <tbody>
          <tr class="table-cluster__prepend" :style="{ height: this.prependHeight }"></tr>
          <tr v-for="(item, index) in items" class="table-cluster__row" :style="{ height: this.rowHeight }" :key="index">
            <td v-for="(header, index) in headers" :key="index">{{ item[columnMap[header]] }}</td>
          </tr>
          <tr class="table-cluster__append" :style="{ height: this.appendHeight }"></tr>
        </tbody>
      </table>
    </div>
  
  </div>
</template>

<script>
export default {
  props: {
    rowHeight: { type: Number, default: 48 },
    tableHeight: { type: Number, default: 320 },
    columnMap: { type: Object, required: true },
    dataProvider: { type: Function, required: true },
    onRowClick: { type: Function }
  },

  data() {
    return {
      skip: 0,
      length: 0,
      query: '',
      items: [],
    }
  },

  computed: {
    headers() {
      return Object.keys(this.columnMap)
    },

    prependHeight() {
      return this.rowHeight * this.skip
    },

    appendHeight() {
      return (this.length - this.skip - this.items.length) * this.rowHeight
    },

    tableBodyHeight() {
      return parseInt(getComputedStyle(this.$refs.table__body).height, 10)
    },

    requireRowLength() {
      return Math.floor(this.tableBodyHeight / this.rowHeight) * 2
    },

    maxRenderedRowLength() {
      return this.requireRowLength * 2
    }
  },

  methods: {
    scroll(event) {
      console.log({ event })
    },

    requestAppend() {
      this.dataProvider({
        query: this.query,
        skip: this.skip,
        limit: this.requireRowLength,
      }).then(({ items, length }) => {
        this.length = length
        this.items = this.items.concat(items)
        this.skip += this.requireRowLength
        const itemLengthDiff = this.items.length - this.maxRenderedRowLength
        if (itemLengthDiff > 0) {
          this.items.slice(itemLengthDiff, this.items.length)
        }
      })
    },

    requestPrepend() {
      const skip = this.skip - this.maxmaxRenderedRowLength
      this.dataProvider({
        query: this.query,
        skip: skip < 0 ? 0 : skip,
        limit: skip < 0 ? this.requireRowLength - skip : this.requireRowLength,
      }).then(({ items, length }) => {
        this.length = length
        this.items = items.concat(this.items)
        this.skip -= this.requireRowLength
      })
    },
  },

  mounted() {
    this.$refs.table-cluster__body.addEventListener('scroll', this.scroll)
    this.requestAppend()
  },

  beforeDestroy() {
    this.$refs.table-cluster__body.removeEventListener('scroll', this.scroll)
  },
}
</script>

<style>
.table-cluster {
  display: flex;
}
</style>
