import { debounce } from '../tools/debounce.js'

const alphaColor = [
  'FFEBEE',
  'FCE4EC',
  'F3E5F5',
  'EDE7F6',
  'E8EAF6',
  'E3F2FD',
  'E1F5FE',
  'E0F7FA',
  'E0F2F1',
  'E8F5E9',
  'F1F8E9',
  'F9FBE7',
  'FFFDE7',
  'FFF8E1',
  'FFF3E0',
  'FBE9E7',
  'EFEBE9',
  'FAFAFA',
  'ECEFF1',
  'FFCDD2',
  'F8BBD0',
  'E1BEE7',
  'D1C4E9',
  'C5CAE9',
  'BBDEFB',
  'B3E5FC',
]

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
    activeKey: true,
  },

  data() {
    return {
      alphaColor,
      itemHeight: 48,
      listContainerHeight: 0,
      itemsLength: 0,
      limit: 0,
      skip: 0,
      items: [],
    }
  },

  computed: {
    itemGroupSize() {
      return Math.round(this.listContainerHeight / this.itemHeight)
    },

    listPadding() {
      return this.skip * this.itemHeight
    },
  },

  methods: {
    loadItemsLength() {
      const req = new XMLHttpRequest()
      req.open('GET', this.src + '?get=size', true)
      req.addEventListener('readystatechange', () => {
        if (req.status === 200 && req.readyState === 4) {
          this.itemsLength = JSON.parse(req.responseText).size
        }
      })
      req.send()
    },

    loadItems(skip = 0) {
      this.$tampan.addLoadingState()
      const req = new XMLHttpRequest()
      req.open('GET', this.src + `?get=data&skip=${skip}&limit=${this.limit}`, true)
      req.addEventListener('readystatechange', () => {
        if (req.readyState === 4) {
          if (req.status === 200) {
            const getFirstChar = (title) => {
              if (!title) return 'A'
              const matches = title.match(/[a-zA-Z]/)
              if (matches) return matches[0].toUpperCase()
              return title[0]
            }
            this.items = JSON.parse(req.responseText)
              .map((item) => {
                return {
                  key: item.key,
                  title: item.title,
                  description: item.description,
                  firstChar: getFirstChar(item.title),
                }
              })
            this.skip = skip
          }
          else {
            console.warn(req.responseText)
          }
        }
      })
      req.addEventListener('error', (error) => {
        console.warn(error)
      })
      req.addEventListener('loadend', this.$tampan.reduceLoadingState)
      req.send()
    },

    computeLayout() {
      this.listContainerHeight = parseInt(getComputedStyle(this.$refs.page_content).height, 10)
      this.limit = between(this.itemGroupSize * 10, 20, 100)
      this.$nextTick()
        .then(this.loadItemsLength)
        .then(this.loadItems)
        .then(this.$nextTick)
        .then(() => this.$refs.page_content.scrollTop = this.scrollPosition)
    },

    listScroll: debounce(function () {
      const offset = this.$refs.page_content.scrollTop - this.listContainerHeight
      const skip = Math.floor((offset < 0 ? 0 : offset) / this.itemHeight)
      const halfScreenSkip = Math.floor(this.limit / 2)
      const roundedSkip = between(skip - halfScreenSkip, 0, this.itemsLength - this.limit)
      if (this.skip === roundedSkip) return
      this.loadItems(roundedSkip)
    }, 200),
  },

  watch: {
    skip(skip) {
      this.$emit('scroll', (skip + this.itemGroupSize) * this.itemHeight)
    },
  },

  mounted() {
    this.computeLayout()
    this.$refs.page_content.addEventListener('scroll', this.listScroll)
    this.$tampan.$on('screen_resize', this.computeLayout)
  },

  beforeDestroy() {
    this.$refs.page_content.removeEventListener('scroll', this.listScroll)
    this.$tampan.$off('screen_resize', this.computeLayout)
  },

  template: `
    <div class="list-panel">
      <div class="list-panel-container">
        <div class="page">
          <div class="page-header">
            <slot name="header"></slot>
          </div>
          <div ref="page_content" class="page-content">
            <ul
              class="list-panel-list"
              :style="{
                height: itemHeight * itemsLength + 'px',
                boxSizing: 'border-box'
              }"
            >
              <li :style="{ height : listPadding + 'px' }"></li>
              <li
                v-for="item in items"
                :key="item.key"
                class="list-panel-item"
                :class="item.key === activeKey && 'active'"
                :style="{ height: itemHeight + 'px' }"
                @click="$emit('select', item)"
              >
                <div class="preview" :style="{ height: itemHeight + 'px', width: itemHeight + 'px' }">
                  <img v-if="item.image" :src="item.image" :alt="item.title">
                  <div
                    v-else
                    :style="{
                      backgroundColor: '#' + alphaColor[item.firstChar.charCodeAt() - 65],
                      height: '100%',
                      fontSize: '2rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }"
                  >{{ item.firstChar }}</div>
                </div>
                <div class="content">
                  <div class="title">{{ item.title }}</div>
                  <div class="description">{{ item.description }}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="list-panel-content">
        <slot name="content"></slot>
      </div>
    </div>
  `
}
