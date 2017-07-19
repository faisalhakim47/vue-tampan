<template>
  <div class="table-view" :class="{ 'is-clickable': isClickableRow }">
    <table class="table">
  
      <thead>
        <tr v-if="!headless">
          <td v-for="(columnTitle, index) in columnTitles" :style="{ display: currentColumnWidth[index] === 0 ? 'none' : 'auto', 'width': `width:${currentColumnWidth[index]}px` }" :key="columnTitle">{{ columnTitle }}</td>
          <td v-if="isShowClickableArrowIcon" style="width:32px;border-left:none;"></td>
        </tr>
        <tr v-if="searchable" class="table-view-search-box">
          <th :colspan="columnLength">
            <field>
              <input-text v-model="query"></input-text>
            </field>
          </th>
        </tr>
      </thead>
  
      <tbody>
        <tr v-if="isEmpty" class="empty-row-text">
          <td :colspan="columnLength" style="text-align: center;">
            <em>{{ isSearching ? 'Hasil pencarian tidak ditemukan.' : (emptyText || 'Tabel kosong.') }}</em>
          </td>
        </tr>
  
        <tr v-else v-for="(item, rowIndex) in items" :class="{ 'is-selected': item.isSelected }" :role="rowRole" :tabindex="selectable ? rowIndex + 1 : null" @click="rowClick($event, item, rowIndex)" :key="rowIndex">
          <td v-for="(columnTitle, index) in columnTitles" :style="{ display: currentColumnWidth[index] === 0 ? 'none' : 'auto', 'width': `width:${currentColumnWidth[index]}px` }" :key="columnTitle">{{ item[columnMap[columnTitle]] }}</td>
          <td v-if="isShowClickableArrowIcon" style="width:32px;border-left:none;text-align: center;">
            <span class="icon material-icons row-clickable-icon">keyboard_arrow_right</span>
          </td>
        </tr>
  
        <tr v-for="i in additionalRowsArray" class="additional-row" :key="i">
          <td v-for="(j, index) in columnLength" :style="{ display: currentColumnWidth[index] === 0 ? 'none' : 'auto', 'width': `width:${currentColumnWidth[index]}px` }" :key="j"></td>
        </tr>
  
      </tbody>
  
    </table>
  
    <div class="table-view-navigate">
      <div class="table-view-navigate-left">
        <field v-if="isPaginated && limitation" label="Batasi" direction="horizontal">
          <input-select :options="paginationLimitOptions" v-model="limit"></input-select>
        </field>
      </div>
      <div class="table-view-navigate-right">
        <button-tampan v-if="isPaginated" :disabled="skip === 0" @click="prevPage">
          <i class="icon material-icons">navigate_before</i>
        </button-tampan>
        <button-tampan v-if="isPaginated" :disabled="items.length < limit" @click="nextPage">
          <i class="icon material-icons">navigate_next</i>
        </button-tampan>
      </div>
    </div>
  </div>
</template>

<script>
import { VueTampan } from '../tampan'
import { createArrayWithLength, ensureArrayType } from '../tools/array'
import { click, longpress, mergeEvents } from '../tools/events'
import { isString } from '../tools/typecheck'

export function tableViewDataFactory({ items = [], indexMap = item => `${item}`, selectedItems = [] }) {
  const isIndexMapCallable = typeof indexMap === 'function'
  const indexedItems = items
    .map((item, index) => {
      if (!isIndexMapCallable) {
        return item
      }
      return {
        index,
        searchTerm: indexMap(item),
        isSelected: selectedItems.indexOf(item) !== -1,
        content: item
      }
    })
  return ({ query = false, skip = 0, limit = 0 }) => {
    const queryRx = new RegExp(query, 'i')
    const filteredItems = !!query && typeof query === 'string'
      ? indexedItems.filter((indexedItem) => {
        return queryRx.test(indexedItem.searchTerm)
      })
      : indexedItems
    const slicedItems = filteredItems.slice(
      skip,
      limit > 0 ? skip + limit : filteredItems.length
    )
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
      return this.selectable === 'always'
        || (Array.isArray(this.selectedItems) && this.selectedItems.length !== 0)
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
    },

    rowRole() {
      return this.isClickableRow ? 'button' : null
    },
  },

  methods: {
    toggleSelect(item = {}) {
      if (this.selectable === 'none') return
      item.isSelected = !item.isSelected
      this.onSelectionChange(this.getSelectedItems())
    },

    getSelectedItems() {
      return this.items.filter(item => item.isSelected)
        .map((item) => item.content)
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
          limit: this.pagination ? this.limit : Infinity,
        })
      const getting = this.$tampan.useLoadingState(
        Promise.resolve(request)
      )
      getting.then((items) => {
        this.items = items
      })
    },

    rowClick(ev, item, index) {
      if (ev.ctrlKey || this.isSelecting) this.toggleSelect(item)
      if (this.onRowClick) this.onRowClick(item.content, index)
      if (typeof this.onSelectionChange !== 'function') return
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
}
</script>