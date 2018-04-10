const Vue = require('vue').default

export default Vue.extend({
  props: {
    src: { type: String },
    value: { type: Number },
  },

  data() {
    return {
      inputFocus: false,
      listFocus: false,
      isDone: false,
      status: 'closed',
      keyword: '',
      limit: 10,
      activeIndex: 0,
      suggestions: [],
    }
  },

  computed: {
    isSuggestionOpen() {
      return (this.inputFocus || this.listFocus) && !this.isDone
    },
  },

  methods: {
    loadSuggestions() {
      return new Promise((resolve) => {
        this.status = 'loading'
        const req = new XMLHttpRequest()
        req.open('GET', `${this.src}?keyword=%${this.keyword}%&limit=${this.limit}`)
        req.addEventListener('readystatechange', () => {
          if (req.readyState === 4) {
            if (req.status === 200) {
              this.suggestions = JSON.parse(req.responseText)
              this.activeIndex = 0
            }
            resolve()
            this.status = 'ready'
          }
        })
        req.send()
      })
    },

    loadItem() {
      return new Promise((resolve) => {
        const req = new XMLHttpRequest()
        req.open('GET', `${this.src}?value=${this.value}`)
        req.addEventListener('readystatechange', () => {
          if (req.readyState === 4) {
            if (req.status === 200) {
              const currentSuggestion = JSON.parse(req.responseText)
              if (currentSuggestion) this.keyword = currentSuggestion.title
            }
            resolve()
          }
        })
        req.send()
      })
    },

    done() {
      this.$refs.input.blur()
      this.isDone = true
      this.keyword = this.suggestions[this.activeIndex].title
      this.$emit('input', this.suggestions[this.activeIndex].value)
    },

    focus() {
      this.inputFocus = true
      this.isDone = false
    },

    keydown(event) {
      switch (event.keyCode) {
        case 13:
          event.preventDefault()
          this.done()
          break
        case 38:
          event.preventDefault()
          if (this.activeIndex !== 0) this.activeIndex--
          break
        case 40:
          event.preventDefault()
          if (this.activeIndex !== this.suggestions.length - 1) this.activeIndex++
          break
      }
    },

    input() {
      this.loadSuggestions()
    },
  },

  watch: {
    value() {
      this.keyword = ''
      this.loadItem()
    },
  },

  mounted() {
    this.loadItem()
    this.loadSuggestions()
  },

  template: `
  <div class="input-autotext">
    <input
      ref="input"
      type="text"
      v-model="keyword"
      @blur="inputFocus = false"
      @focus="focus"
      @input="input"
      @keydown="keydown"
    >
    <div style="position: relative; height: 0;">
      <ul
        v-show="isSuggestionOpen"
        class="suggestion-list"
        @mouseenter="listFocus = true"
        @mouseleave="listFocus = false">
        <li v-if="status === 'loading'"><em>memuat...</em></li>
        <li
          v-if="status === 'ready'"
          v-for="suggestion, index in suggestions"
          :key="suggestion.key"
          :class="index === activeIndex && 'is-active'"
          @mouseenter="activeIndex = index"
          @click="done"
        >{{ suggestion.title }}</li>
      </ul>
    </div>
  </div>
  `
})
