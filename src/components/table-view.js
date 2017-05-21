import { VueTampan } from '../tampan'
import { createArrayWithLength, ensureArrayType } from '../tools/array'
import { click, longpress, mergeEvents } from '../tools/events'
import { isString } from '../tools/typecheck'

export function tableViewDataFactory({ items, indexMap }) {
  const isIndexMapCallable = typeof indexMap === 'function'
  const indexedItems = items
    .map((item, index) => {
      if (!isIndexMapCallable) {
        return item
      }
      return Object.assign(
        item,
        {
          _searchTerm: indexMap(item),
          _index: index
        }
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
    dataProvider: { type: [Function, Array], required: true },
    emptyText: { type: String },
    columnMap: { type: Object, required: true },
    columnWidth: { type: Object, default: () => ({}) },
    controls: { type: Array, default: () => [] },
    defaultRowLimit: { type: Number },
    fixedRowNumber: { type: Boolean, default: true },
    visibleColumns: { type: Array },
    onRowClick: { type: Function },
    onSelectionChange: { type: Function },
    headless: { type: Boolean, default: false },
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
      query: '',
      skip: 0,
      limit: this.defaultRowLimit || (
        !this.$tampan.client.isSmallScreen ? 10 : 5
      ),
      loadCount: 0,
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
      return this.selectable === 'always' || (this.selectedItems && this.selectedItems.length !== 0)
    },

    isShowClickableArrowIcon() {
      return this.isClickableRow && !this.isLargeScreen
    },

    isPaginated() {
      return this.pagination
    },

    isLoading() {
      return this.loadCount !== 0
    },

    currentColumnWidth() {
      const defaultColumnWidth = this.columnWidth.default || []
      return this.$tampan.client.isLargeScreen
        ? (this.columnWidth.largescreen || defaultColumnWidth)
        : (
          this.$tampan.client.isMediumScreen
            ? (this.columnWidth.madiumscreen || defaultColumnWidth)
            : (
              this.$tampan.client.isSmallScreen
                ? (this.columnWidth.smallscreen || defaultColumnWidth)
                : defaultColumnWidth
            )
        )
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
      const options = [5, 10, 25, 50, 100]
      if (options.indexOf(this.defaultRowLimit) === -1) options.unshift(this.defaultRowLimit)
      return options.filter(option => !!option).sort((a, b) => a - b)
    },

    availableControls() {
      return this.controls.filter(control => !!control)
    },

    bottomLeftControls() {
      return this.availableControls.filter(control => control.position === 'bottom-left')
    }
  },

  methods: {
    toggleSelect(item = {}) {
      if (this.selectable === 'none') return
      item.isSelected = !item.isSelected
    },

    getSelectedItems() {
      return this.items.filter(item => item.isSelected)
    },

    nextPage() {
      if (this.isLoading) return
      this.skip += this.limit
    },

    prevPage() {
      if (this.skip - this.limit < 0) return
      this.skip -= this.limit
    },

    generateData() {
      const request = Array.isArray(this.dataProvider)
        ? this.dataProvider
        : this.dataProvider({
          query: this.query,
          skip: this.skip,
          limit: this.limit,
        })
      const finding = this.$tampan.useLoadingState(
        Promise.resolve(request)
      )
      finding.then((items) => {
        this.items = items.map((item, index) => {
          return {
            index,
            content: item,
            isSelected: false,
          }
        })
        // this.loadCount--
      })
      // finding.catch(() => {
      //   this.loadCount--
      // })
      // this.loadCount++
    },

    rowClick(ev, item, index) {
      if (ev.ctrlKey || this.isSelecting) this.toggleSelect(item)
      if (this.onRowClick) this.onRowClick(item, index)
      if (typeof this.onSelectionChange !== 'function') return
      this.onSelectionChange(this.getSelectedItems())
    }
  },

  watch: {
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
    const rowRole = this.isClickableRow ? 'button' : null
    return e('div', {
      staticClass: 'table-view',
      class: {
        'is-clickable': this.isClickableRow
      }
    }, [
        e('table', { staticClass: 'table' }, [
          e('thead', [
            !this.headless
              ? e('tr', [
                ...this.columnTitles.map((columnTitle, index) => {
                  const columnWidth = this.currentColumnWidth[index]
                  if (columnWidth === 0) return null
                  return e('th', {
                    attrs: { style: columnWidth ? `width:${columnWidth}px` : null }
                  }, !this.headless ? columnTitle : '')
                }),
                this.isShowClickableArrowIcon
                  ? e('th', { attrs: { style: `width:32px;border-left:none;` } })
                  : null
              ])
              : null,
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
                          : (this.emptyText || 'Tabel kosong.')
                      ])
                    ])
                ])
              ]
              : [
                ...this.items.map((item, rowIndex) => {
                  const itemContent = item.content
                  return e('tr', {
                    attrs: { role: rowRole, tabindex: this.isClickableRow ? rowIndex + 1 : null },
                    class: {
                      'is-selected': item.isSelected
                    },
                    key: item.index,
                    on: mergeEvents([
                      longpress(() => {
                        this.toggleSelect(item)
                      }),
                      click(ev => {
                        this.rowClick(ev, itemContent, rowIndex)
                      })
                    ])
                  }, [
                      ...this.columnTitles.map((columnTitle, columnIndex) => {
                        const columnWidth = this.currentColumnWidth[columnIndex]
                        if (columnWidth === 0) return null
                        const columnMap = this.columnMap[columnTitle]
                        return e('td', {
                          attrs: { style: columnWidth ? `width:${columnWidth}px` : null }
                        }, ensureArrayType(columnMap(itemContent, rowIndex, e)))
                      }),
                      this.isShowClickableArrowIcon
                        ? e('td', { attrs: { style: `width:32px;border-left:none;text-align: center;` } }, [
                          e('span', { staticClass: 'icon material-icons row-clickable-icon' }, 'keyboard_arrow_right')
                        ])
                        : null
                    ])
                }),
                this.additionalRowsArray.map(() => {
                  return e('tr', {
                    staticClass: 'additional-row'
                  }, createArrayWithLength(this.columnLength).map((_, index) => {
                    if (this.currentColumnWidth[index] === 0) return null
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
              ? e('button', {
                attrs: { disabled: this.skip === 0 },
                staticClass: 'button ripple',
                on: click(this.prevPage)
              }, [
                  e('i', { staticClass: 'icon material-icons' }, 'navigate_before')
                ])
              : null,
            this.isPaginated
              ? e('button', {
                attrs: { disabled: this.items.length < this.limit },
                staticClass: 'button ripple',
                on: click(this.nextPage)
              }, [
                  e('i', { staticClass: 'icon material-icons' }, 'navigate_next')
                ])
              : null
          ])
        ])
      ])
  }
}
