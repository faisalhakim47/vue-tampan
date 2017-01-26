import { createArrayWithLength } from '../tools/array'
import { longpress, mergeEvents } from '../tools/events'
import { isString } from '../tools/typecheck'

export default {
  name: 'table-view',

  props: {
    items: { type: Array, required: true },
    indexes: { type: Array, default: () => [] },
    columnMap: { type: Object, required: true },
    columnWidth: { type: Array, default: () => [] },
    limit: { type: Number, default: 10 },
    visibleColumns: { type: Array },
    onrowclick: { type: Function },
    pagination: { type: Boolean, default: true },
    selectable: { type: Boolean, default: false }
  },

  data() {
    const indexes = this.indexes || []
    return {
      sortBy: null,
      sortDirection: 'asc',
      skip: 0,
      query: '',
      columnTitles: Object.keys(this.columnMap),
      selectedItems: []
    }
  },

  computed: {
    isIndexed() {
      return !!this.indexes.length
    },

    indexedItems() {
      const indexes = this.indexes || []
      return this.items.map((item, index) => {
        item._fulltext_ = indexes
          .map((key) => item['key'])
          .join(' ')
        item._key_ = index
        item._isSelected = false
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
      if (!this.pagination) return this.filteredItems
      return this.filteredItems.slice(this.skip, this.skip + this.limit)
    },

    isSelecting() {
      return !!this.selectedItems.length
    }
  },

  methods: {
    toggleSelect(item) {
      if (!this.selectable) return
      const index = this.selectedItems.indexOf(item)
      if (index === -1) {
        this.selectedItems.push(item)
        item._isSelected = true
      } else {
        this.selectedItems.splice(index, 1)
        item._isSelected = false
      }
    },
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
          e('tr', this.columnTitles.map((columnTitle, index) => {
            return e('th', {
              attrs: { style: this.columnWidth[index] ? `width:${this.columnWidth[index]}px` : null }
            }, columnTitle)
          }))
        ]),

        e('tbody', this.slicedItems.map((item, index) => {
          return e('tr', {
            class: { 'is-selected': item._isSelected },
            key: item._index_,
            on: mergeEvents([
              longpress(() => {
                this.toggleSelect(item)
              }),
              {
                click: (e) => {
                  if (e.ctrlKey || this.isSelecting) return this.toggleSelect(item)
                  if (this.onrowclick) return this.onrowclick(item, index)
                }
              }
            ])
          }, this.columnTitles.map((columnTitle) => {
            const column = this.columnMap[columnTitle]
            if (Array.isArray(column)) {
              if (this.isSelecting)
                return e('td', [
                  e('i', { staticClass: 'material-icons check-icon' }, 'check')
                ])
              else
                return e('td', column.map((btn) => {
                  return e('button', { staticClass: 'button ripple' }, [
                    e('i', {
                      staticClass: 'icon ' + btn.iconClass,
                      on: { click: () => btn.callback(item, index) }
                    }, btn.iconText),
                    btn.text
                  ])
                }))
            }

            else if (typeof column === 'function')
              return e('td', column(item, index))

            else
              return e('td', column)
          }))
        }))
      ]),

      this.pagination
        ? e('div', { staticClass: 'table-view-navigate' }, [
          e('div', { staticClass: 'table-view-navigate-left' }, [
            e('field', { props: { label: 'Batasi', direction: 'horizontal' } }, [
              e('input-select', {
                props: {
                  options: createArrayWithLength(10).map((_, i) => ((i + 1) * 10)),
                  value: this.limit
                },
                on: { change: ({ value }) => this.limit = value }
              }),
            ])
          ]),
          e('div', { staticClass: 'table-view-navigate-right' }, [
            e('button', { staticClass: 'button', on: { click: this.prevPage } }, [
              e('i', { staticClass: 'icon material-icons' }, 'navigate_before')
            ]),
            e('button', { staticClass: 'button', on: { click: this.nextPage } }, [
              e('i', { staticClass: 'icon material-icons' }, 'navigate_next')
            ])
          ])
        ])
        : e('div', { staticClass: 'table-view-spacing' })
    ])
  }
}
