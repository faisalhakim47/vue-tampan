import { request } from '../tools/request.js'

/**
 * @param {number} num 
 * @param {number} min 
 * @param {number} max 
 */
function between(num, min, max) {
  if (num < min) return min
  if (num > max) return max
  return num
}

export default {
  props: {
    src: { type: String },
    scrollPosition: { type: Number, default: 0 },
    activeKey: { type: [Number, String] },
    rowHeight: { type: Number, default: 48 },
    numberOfColumn: { type: Number, default: 1 },
    numberOfGroup: { type: Number, default: 5 },
    loadDelay: { type: Number, default: 300 },
  },

  data() {
    return {
      listBlockHeight: 0,
      numberOfItem: 0,
      limit: 0,
      skip: null,
      items: [],
      loadingSkip: 0,
    }
  },

  computed: {
    groupSize() {
      const rowHeight = Math.round(this.listBlockHeight / this.rowHeight)
      return rowHeight * this.numberOfColumn
    },

    prevNumberOfGroup() {
      return Math.floor(this.numberOfGroup / 2)
    },

    listPadding() {
      return this.skip * this.rowHeight / this.numberOfColumn
    },
  },

  methods: {
    fetchNumberOfItem() {
      return request('GET', location.origin + this.src + '?get=size')
        .then((result) => {
          if (result.status === 200) {
            this.numberOfItem = result.data.size
          }
          else {
            console.warn(result)
          }
        })
        .catch((error) => {
          console.warn(error)
        })
    },

    fetchList(skip = 0) {
      if (this.skip === skip) {
        return Promise.resolve()
      }
      this.loadingSkip = skip
      const url = location.origin + this.src + `?get=data&skip=${skip}&limit=${this.limit}`
      return request('GET', url)
        .then((result) => {
          if (this.loadingSkip !== skip) return
          if (result.status === 200) {
            this.items = result.data
            this.skip = skip
          }
          else {
            console.warn(result)
          }
        })
        .catch((error) => {
          console.warn(error)
        })
    },

    refreshList() {
      const scrollTop = this.$refs.list_block.scrollTop
      const offset = scrollTop - (this.listBlockHeight * this.prevNumberOfGroup)
      const skip = Math.floor(between(offset, 0, offset) / this.rowHeight) * this.numberOfColumn
      return this.fetchList(skip)
    },

    computeLayout() {
      this.listBlockHeight = parseInt(getComputedStyle(this.$refs.list_block).height, 10)
      this.limit = this.groupSize * this.numberOfGroup
      this.$nextTick()
        .then(this.fetchNumberOfItem)
        .then(this.fetchList)
        .then(this.$nextTick)
        .then(() => this.$refs.list_block.scrollTop = this.scrollPosition)
    },
  },

  watch: {
    skip(skip) {
      this.$emit('scroll', (skip + this.groupSize) * this.rowHeight)
    },
  },

  mounted() {
    this.refreshListInterval = setInterval(this.refreshList, this.loadDelay)
    this.$tampan.$on('screen_resize', this.computeLayout)
    this.computeLayout()
  },

  beforeDestroy() {
    clearInterval(this.refreshListInterval)
    this.$tampan.$off('screen_resize', this.computeLayout)
  },

  template: `
  <section ref="list_block" class="list-block">
    <ul
      v-if="items.length !== 0"
      class="list-block-content"
      :style="{
        height: (rowHeight * (numberOfItem / numberOfColumn)) + 'px',
        paddingTop: listPadding + 'px',
      }"
    >
      <li
        v-for="item in items"
        :key="item.key || item.id"
        class="list-block-item"
        :class="item.key === activeKey && 'active'"
        :style="{
          height: rowHeight + 'px',
          width: 100 / numberOfColumn + '%',
        }"
        @click="$emit('select', item)"
      >
        <slot name="content" :data="item"></slot>
      </li>
    </ul>
    <slot v-else name="content-empty"></slot>
  </section>
  `
}
