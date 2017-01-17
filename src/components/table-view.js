import { isString } from '../tools/typecheck'

export default {
  name: 'table-view',
  props: {
    items: { type: Array, required: true },
    columnMap: { type: Object, required: true },
    visibleColumns: { type: Array },
    indexes: { type: Array }
  },
  data() {
    const indexes = this.indexes || []
    return {
      sortBy: null,
      sortDirection: 'asc',
      skip: 0,
      limit: 10,
      query: '',
      columnTitles: Object.keys(this.columnMap)
    }
  },
  computed: {
    indexedItems() {
      const indexes = this.indexes || []
      return this.items.map((item) => {
        item._fulltext_ = indexes
          .map((key) => item['key'])
          .join(' ')
        return item
      })
    },
    sortedItems() {
      if (this.sortBy === null)
        return this.indexedItems
      if (this.sortDirection === 'asc')
        return this.indexedItems
          .sort((a, b) => a[this.sortBy] > a[this.sortBy])
      if (this.sortDirection === 'des')
        return this.indexedItems
          .sort((a, b) => a[this.sortBy] < a[this.sortBy])
    },
    filteredItems() {
      if (!isString(this.query) || this.query === '')
        return this.sortedItems
      const filterRex = new RegExp(this.query, 'i')
      return this.sortedItems.filter(item => {
        return filterRex.test(item._fulltext_)
      })
    },
    slicedItems() {
      return this.filteredItems.slice(this.skip, this.skip + this.limit)
    }
  },
  methods: {
    nextPage() {
      if (this.skip + this.limit >= this.filteredItems.length) return
      this.skip += this.limit
    },
    prevPage() {
      if (this.skip - this.limit < 0) return
      this.skip -= this.limit
    }
  },
  render(e) {
    console.log('table-view')
    return e('div', { staticClass: 'table-view' }, [
      e('table', { staticClass: 'table' }, [
        e('thead', [
          e('tr', this.columnTitles.map((columnTitle) => {
            return e('th', columnTitle)
          }))
        ]),
        e('tbody', this.slicedItems.map((item) => {
          return e('tr', this.columnTitles.map((columnTitle) => {
            return e('td', this.columnMap[columnTitle](item))
          }))
        }))
      ]),
      e('div', { staticClass: 'table-view-navigate' }, [
        e('button', { staticClass: 'button', on: { click: this.nextPage } }, [
          e('i', { staticClass: 'icon material-icons' }, 'navigate_next')
        ]),
        e('button', { staticClass: 'button', on: { click: this.prevPage } }, [
          e('i', { staticClass: 'icon material-icons' }, 'navigate_before')
        ])
      ])
    ])
  }
}
