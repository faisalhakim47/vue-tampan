import { createArrayWithLength, ensureArrayType } from '../tools/array'
import { longpress, mergeEvents } from '../tools/events'
import { isString } from '../tools/typecheck'

export function tableViewDataFactory({ items, indexMap }) {
  const indexedItems = items
    .map(indexMap)
    .map((searchTerm, index) => {
      return Object.assign(
        {
          _searchTerm: searchTerm,
          _index: index
        },
        items[index]
      )
    })
  return ({ query, skip, limit }) => {
    const queryRx = new RegExp(query, 'i')
    const filteredItems = query && typeof query === 'string'
      ? indexedItems.filter((indexedItem) => {
        return queryRx.test(indexedItem._searchTerm)
      })
      : indexedItems
    const slicedItems = filteredItems.slice(skip, skip + limit)
    return slicedItems
  }
}

export default {
  name: 'table-view',

  props: {
    dataProvider: { type: Function, required: true },
    emptyText: { type: String },
    columnMap: { type: Object, required: true },
    columnWidth: { type: Array, default: () => [] },
    controls: { type: Array, default: () => [] },
    defaultRowLimit: { type: Number, default: 10 },
    fixedRowNumber: { type: Boolean, default: true },
    visibleColumns: { type: Array },
    onRowClick: { type: Function },
    onSelectedChange: { type: Function },
    pagination: { type: Boolean, default: true },
    limitation: { type: Boolean, default: true },
    searchable: { type: Boolean, default: false },
    selectable: { type: String, default: 'none' }
  },

  data() {
    const columnTitles = Object.keys(this.columnMap)

    return {
      columnTitles,
      items: [],
      selectedItems: [],
      query: '',
      skip: 0,
      limit: this.defaultRowLimit,
      sortBy: null,
      sortDirection: 'asc',
    }
  },

  computed: {
    isLargeScreen() {
      return this.$tampan.client.isLargeScreen
    },

    isEmpty() {
      return this.items.length === 0
    },

    isClickableRow() {
      return this.isSelecting || !!this.onRowClick
    },

    isSearching() {
      return typeof this.query === 'string' && this.query.length > 0
    },

    isSelecting() {
      return this.selectable === 'always' || this.selectedItems.length !== 0
    },

    isShowClickableArrowIcon() {
      return this.isClickableRow && !this.isLargeScreen
    },

    isPaginated() {
      return this.pagination
    },

    columnLength() {
      let length = this.columnTitles.length
      if (this.isShowClickableArrowIcon) length++
      return length
    },

    additionalRowsArray() {
      if (!this.isPaginated || !this.fixedRowNumber) {
        return []
      }
      return createArrayWithLength(this.limit - this.items.length)
    },

    paginationLimitOptions() {
      const options = createArrayWithLength(10).map((_, i) => ((i + 1) * 10))
      if (options.indexOf(this.defaultRowLimit) === -1) options.unshift(this.defaultRowLimit)
      return options
    },

    availableControls() {
      return this.controls.filter(control => !!control)
    },

    bottomLeftControls() {
      return this.availableControls.filter(control => control.position === 'bottom-left')
    }
  },

  methods: {
    toggleSelect(item) {
      if (this.selectable === 'none') return
      const index = this.selectedItems.indexOf(item)
      if (index === -1) {
        this.selectedItems.push(item)
      } else {
        this.selectedItems.splice(index, 1)
      }
    },

    nextPage() {
      if (this.skip + this.limit >= this.filteredItems.length) return
      this.skip += this.limit
    },

    prevPage() {
      if (this.skip - this.limit < 0) return
      this.skip -= this.limit
    },

    generateData() {
      const finding = this.dataProvider({
        query: this.query,
        skip: this.skip,
        limit: this.limit,
      })
      if (finding instanceof Promise) {
        this.$tampan.useLoadingState(finding)
      }
      Promise.resolve(finding)
        .then((resultItems) => {
          this.items = resultItems
        })
    }
  },

  watch: {
    'selectedItems'() {
      this.onSelectedChange(this.selectedItems)
    },
    'dataProvider'() {
      this.generateData()
    },
    'query'() {
      this.generateData()
    },
    'skip'() {
      this.generateData()
    },
    'limit'() {
      this.generateData()
    }
  },

  mounted() {
    this.generateData()
  },

  render(e) {
    return e('div', {
      staticClass: 'table-view',
      class: {
        'is-clickable': this.isClickableRow
      }
    }, [
        e('table', { staticClass: 'table' }, [
          e('thead', [
            e('tr', [
              ...this.columnTitles.map((columnTitle, index) => {
                return e('th', {
                  attrs: { style: this.columnWidth[index] ? `width:${this.columnWidth[index]}px` : null }
                }, columnTitle)
              }),
              this.isShowClickableArrowIcon
                ? e('th', { attrs: { style: `width:32px` } })
                : null
            ]),
            this.searchable
              ? e('tr', { staticClass: 'table-view-search-box' }, [
                e('th', { attrs: { colspan: this.columnLength } }, [
                  e('field', [
                    e('input-text', {
                      props: { value: this.query },
                      on: { input: ev => this.query = ev.value },
                    })
                  ])
                ])
              ])
              : null
          ]),
          e('tbody',
            this.isEmpty
              ? [
                e('tr', { staticClass: 'empty-row-text' }, [
                  e('td', {
                    attrs: { colspan: this.columnLength.toString(), style: 'text-align: center;' }
                  }, [
                      e('em', [
                        this.isSearching
                          ? 'Hasil pencarian tidak ditemukan.'
                          : (this.emptyText || 'Belum ada daftar.')
                      ])
                    ])
                ])
              ]
              : [
                ...this.items.map((item, index) => {
                  return e('tr', {
                    class: {
                      'is-selected': this.selectedItems.indexOf(item) !== -1
                    },
                    key: item._index_,
                    on: mergeEvents([
                      longpress(() => {
                        this.toggleSelect(item)
                      }),
                      {
                        click: (e) => {
                          if (e.ctrlKey || this.isSelecting) return this.toggleSelect(item)
                          if (this.onRowClick) return this.onRowClick(item, index)
                        }
                      }
                    ])
                  }, [
                      ...this.columnTitles.map((columnTitle) => {
                        const columnMap = this.columnMap[columnTitle]
                        return e('td', ensureArrayType(columnMap(item, index, e)))
                      }),
                      this.isShowClickableArrowIcon
                        ? e('td', [
                          e('span', { staticClass: 'icon material-icons row-clickable-icon' }, 'keyboard_arrow_right')
                        ])
                        : null
                    ])
                }),
                this.additionalRowsArray.map(() => {
                  return e('tr', { staticClass: 'additional-row' }, createArrayWithLength(this.columnLength).map(() => {
                    return e('td')
                  }))
                })
              ]
          )
        ]),

        e('div', { staticClass: 'table-view-navigate' }, [
          e('div', { staticClass: 'table-view-navigate-left' }, [
            this.isPaginated && this.limitation
              ? e('field', { props: { label: 'Batasi', direction: 'horizontal' } }, [
                e('input-select', {
                  props: {
                    options: this.paginationLimitOptions,
                    value: this.limit
                  },
                  on: { change: ({ value }) => this.limit = value }
                }),
              ])
              : null
          ]),
          e('div', { staticClass: 'table-view-navigate-right' }, [
            ...this.bottomLeftControls.map(control => control.render(e)),
            this.isPaginated
              ? e('button', { staticClass: 'button ripple', on: { click: this.prevPage } }, [
                e('i', { staticClass: 'icon material-icons' }, 'navigate_before')
              ])
              : null,
            this.isPaginated
              ? e('button', { staticClass: 'button ripple', on: { click: this.nextPage } }, [
                e('i', { staticClass: 'icon material-icons' }, 'navigate_next')
              ])
              : null
          ])
        ])
      ])
  }
}
