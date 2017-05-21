import { click, mergeEvents } from '../../tools/events'
import { isString } from '../../tools/typecheck'

export default {
  name: 'input-autotext',

  props: {
    value: { type: String },
    type: { type: String },
    placeholder: { type: String },
    suggestionProvider: { type: Function },
  },

  data() {
    return {
      showSuggesions: true,
      isFocusInput: false,
      isFocusList: false,
      isMouseoverList: false,
      activeItemIndex: 0,
      availableSuggestions: []
    }
  },

  computed: {
    isSuggestionsAvailabe() {
      return this.visibleSuggestions.length !== 0
    },

    isSuggestionsShown() {
      return this.showSuggesions && (
        this.isFocusInput
        || this.isFocusList
        || this.isMouseoverList
      )
    },

    visibleSuggestions() {
      return this.availableSuggestions.slice(0, 10)
    }
  },

  methods: {
    provideSuggestions(query = '') {
      let providing = this.suggestionProvider({ query })
      if (!(providing instanceof Promise)) {
        providing = Promise.resolve(providing)
      }
      providing.then((suggestions) => {
        if (!Array.isArray(suggestions)) return
        this.resetActiveItemIndex()
        this.availableSuggestions = suggestions
      })
    },

    input({ target }) {
      this.$emit('input', { value: target.value })
      this.provideSuggestions(target.value)
    },

    keydown({ keyCode, target }) {
      switch (keyCode) {
        case 13:
          this.selectItem()
          break

        case 38:
          if (this.activeItemIndex === 0) this.activeItemIndex = this.visibleSuggestions.length - 1
          else this.activeItemIndex -= 1
          break

        case 40:
          if (this.activeItemIndex === this.visibleSuggestions.length - 1) this.activeItemIndex = 0
          else this.activeItemIndex += 1
          break

        default:
          this.showSuggesions = true
      }
    },

    focusInput() {
      this.isFocusInput = true
      this.showSuggesions = true
      this.resetActiveItemIndex()
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

    clickItem(index) {
      this.activeItemIndex = index
      this.isMouseoverList = false
      this.selectItem()
    },

    resizeList() {
      if (this.$refs.suggestionList) {
        this.$refs.suggestionList.style.width = getComputedStyle(this.$refs.suggestionInput).width
      }
    },

    resetActiveItemIndex() {
      this.$nextTick().then(() => {
        this.activeItemIndex = 0
        if (this.$refs.suggestionList) {
          this.$refs.suggestionList.children.item(0).classList.add('active')
        }
      })
    },

    selectItem() {
      if (!this.isSuggestionsAvailabe) return
      const suggestion = this.visibleSuggestions[this.activeItemIndex]
      this.$refs.suggestionInput.focus()
      this.$emit('input', { value: suggestion.value })
      this.$nextTick().then(() => {
        this.showSuggesions = false
      })
    }
  },

  watch: {
    isSuggestionsShown(newVal) {
      if (newVal === true) {
        this.resizeList()
        this.provideSuggestions('')
      }
    },

    activeItemIndex(newIndex, oldIndex) {
      if (!this.$refs.suggestionList) return
      const elOldActive = this.$refs.suggestionList.children.item(oldIndex)
      const elNewActive = this.$refs.suggestionList.children.item(newIndex)
      if (elOldActive) elOldActive.classList.remove('active')
      if (elNewActive) elNewActive.classList.add('active')
    }
  },

  render(e) {
    return e('div', { staticClass: 'input-autotext' }, [
      e('input', {
        staticClass: 'input',
        attrs: { placeholder: this.placeholder || '' },
        domProps: { value: this.value || '' },
        on: {
          input: this.input,
          keydown: this.keydown,
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
                ? e('li', { staticClass: 'input-autotext-nosuggestion' }, 'Tidak ada saran.')
                : null,
              ...this.visibleSuggestions.map((suggestion, index) => {
                return e('li', {
                  staticClass: 'input-autotext-item',
                  on: mergeEvents([
                    click(() => this.clickItem(index)),
                    { mouseenter: () => this.mouseenterItem(index), }
                  ])
                }, [
                    typeof suggestion.picture === 'object'
                      ? e('img', {
                        staticClass: 'input-autotext-item-image',
                        attrs: {
                          src: suggestion.picture.url,
                          alt: suggestion.picture.title,
                        }
                      })
                      : null,
                    e('div', { staticClass: 'input-autotext-item-display' }, [
                      typeof suggestion.text === 'string'
                        ? e('div', { staticClass: 'input-autotext-item-text' }, [suggestion.text])
                        : null,
                      typeof suggestion.description === 'string'
                        ? e('div', { staticClass: 'input-autotext-item-description' }, [suggestion.description])
                        : null
                    ]),
                    e('div', { staticClass: 'input-autotext-item-info' }, [
                      typeof suggestion.info === 'string'
                        ? e('div', { staticClass: 'input-autotext-item-info' }, [suggestion.info])
                        : null
                    ]),
                  ])
              })
            ])
        ])
        : null
    ])
  }
}
