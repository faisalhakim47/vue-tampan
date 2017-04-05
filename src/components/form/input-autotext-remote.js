import { isString } from '../../tools/typecheck'
import { throttle } from '../../tools/throttle'

export default {
  name: 'input-autotext-remote',

  props: {
    value: { type: String },
    type: { type: String },
    placeholder: { type: String },
    suggestionProvider: { type: Function },
  },

  data() {
    return {
      showSuggesions: false,
      isFocusInput: false,
      isFocusList: false,
      isMouseoverList: false,
      activeItemIndex: 0,
      provideSuggestions: throttle((text) => {
        this.suggestionProvider(text)
          .then((suggestions) => {
            this.availableSuggestions = suggestions
          })
      }, 750),
      availableSuggestions: []
    }
  },

  computed: {
    isSuggestionsAvailabe() {
      return this.visibleSuggestions.length !== 0
    },

    isSuggestionsShown() {
      if (this.showSuggesions) return true
      if (this.isSuggestionsAvailabe) return true
      if (this.isFocusInput) return true
      if (this.isFocusList) return true
      if (this.isMouseoverList) return true
      return false
    },

    visibleSuggestions() {
      return this.availableSuggestions.slice(0, 10)
    }
  },

  methods: {
    input(event) {
      const { value } = event
      this.$emit('input', { value })
      this.provideSuggestions(value)
    },

    focusInput() {
      this.isFocusInput = true
    },

    blurInput() {
      this.isFocusInput = false
    },

    focusList() {
      this.isFocusList = true
    },

    blurList() {
      this.isFocusList = false
    },

    mouseenterList() {
      this.isMouseoverList = true
    },

    mouseleaveList() {
      this.isMouseoverList = false
    },

    mouseenterItem(index) {
      this.activeItemIndex = index
    },

    resizeList() {
      if (this.$refs.suggestionList) {
        this.$refs.suggestionList.style.width = getComputedStyle(this.$refs.suggestionInput).width
      }
    }
  },

  watch: {
    isSuggestionsShown() {
      this.resizeList()
    },

    activeItemIndex(newVal, oldVal) {
      this.$refs.suggestionList.children.item(oldVal).classList.remove('active')
      this.$refs.suggestionList.children.item(newVal).classList.add('active')
    }
  },

  render(e) {
    return e('div', { staticClass: 'input-autotext input-autotext-remote' }, [
      e('input', {
        staticClass: 'input',
        attrs: { placeholder: this.placeholder || '' },
        domProps: { value: this.value },
        on: {
          input: ev => this.input({ value: ev.target.value }),
          blur: this.blurInput,
          focus: this.focusInput
        },
        ref: 'suggestionInput'
      }),
      this.isSuggestionsShown
        ? e('div', { staticClass: 'input-autotext-list-container' }, [
          e('ul', {
            staticClass: 'input-autotext-list',
            on: {
              mouseenter: this.mouseenterList,
              mouseleave: this.mouseleaveList,
              blur: this.blurList,
              focus: this.focusList
            },
            ref: 'suggestionList'
          }, [
              this.visibleSuggestions.length === 0
                ? e('li', { staticClass: 'input-autotext-nosuggestion' } , 'Tidak ada saran.')
                : null,
              ...this.visibleSuggestions.map((suggestion, index) => {
                return e('li', {
                  staticClass: 'input-autotext-item',
                  on: { mouseenter: () => this.mouseenterItem(index) }
                }, [
                    typeof suggestion.picture === 'object'
                      ? e('img', { staticClass: 'input-autotext-item-image' })
                      : null,
                    typeof suggestion.display === 'string'
                      ? e('div', { staticClass: 'input-autotext-item-display' }, suggestion.display)
                      : null
                  ])
              })
            ])
        ])
        : null
    ])
  }
}
