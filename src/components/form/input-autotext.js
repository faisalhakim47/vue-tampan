import { isString } from '../../tools/typecheck'
import InputText from './input-text'

export default {
  name: 'input-autotext',

  components: [
    InputText
  ],

  props: {
    value: { type: String },
    type: { type: String },
    placeholder: { type: String },
    suggestions: { type: Array, default: () => ([]) },
    suggestionProvider: { type: Function },
    displayMap: { type: Function, default: item => item },
    keywordMap: { type: Function, default: item => item },
    valueMap: { type: Function, default: item => item },
  },

  data() {
    return {
      showSuggesions: false,
      availableSuggestionsToShow: []
    }
  },

  computed: {
    isSuggestionsAvailabe() {
      return this.visibleSuggestions.length !== 0
    },

    isSuggestionsShown() {
      if (this.showSuggesions) return true
      if (this.isSuggestionsAvailabe) return true
    },

    isSuggestionsProviderAvailable() {
      return typeof this.suggestionProvider === 'function'
    },

    suggestionObjects() {
      return this.suggestions.map((suggestion) => {
        return {
          suggestion,
          keyword: this.keywordMap(suggestion),
          value: this.valueMap(suggestion)
        }
      })
    },

    visibleSuggestions() {
      return this.availableSuggestionsToShow.slice(0, 10)
    },

    suggestionKeywords() {
      const getKeyword = typeof this.keywordMap === 'string'
        ? suggestion => suggestion[this.keywordMap]
        : this.keywordMap
      return this.suggestions.map(getKeyword)
    },

    provideSuggestions() {
      if (this.isSuggestionsProviderAvailable) {
        return this.suggestionProvider
      }
      else {
        return text => Promise.resolve(this.searchSuggestions(text))
      }
    },
  },

  methods: {
    input({ value }) {
      this.$emit('input', { value })
      this.provideAutocomlete(value)
    },

    provideAutocomplete(text) {
      this.provideSuggestions(text)
        .then((suggestions) => {
          this.availableSuggestionsToShow = suggestions
        })
    },

    searchSuggestions(text) {
      const regx = new RegExp(text, 'i')
      return this.suggestionObjects.filter(({ keyword }) => {
        return regx.test(keyword)
      })
    }
  },

  render(e) {
    return e('div', { staticClass: 'input-autotext' }, [
      e('input-text', {
        on: { input: this.input }
      }),
      e('ul', { staticClass: 'input-autotext-list' }, this.visibleSuggestions.map((suggestion) => {
        return e('li', { staticClass: 'input-autotext-item' }, [
          typeof suggestion.picture === 'object'
            ? e('img', { staticClass: 'input-autotext-item' })
            : null
        ])
      }))
    ])
  }
}
