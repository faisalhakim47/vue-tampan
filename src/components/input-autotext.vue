<template>
  <div class="input input-autotext">
  
    <input ref="input" type="text" class="input-autotext__input" :placeholder="placeholder" v-model="valueHolder" @focus="() => { isInputFocus = isShowSuggestion = true }" @blur="isInputFocus = false" @input="input" @keydown="keydown">
  
    <div class="input-autotext__suggestion-container">
      <ul ref="suggestionList" v-if="showSuggestion" class="input-autotext__suggestion-list" @mouseover="isSuggestionFocus = true" @mouseleave="isSuggestionFocus = false" @mouseout="isSuggestionFocus = false">
  
        <li class="input-autotext__no-suggestion" v-if="!suggestionList.length">tidak ada saran.</li>
  
        <li v-else v-for="(suggestionItem, index) in suggestionList" class="input-autotext__suggestion-item" :style="{ backgroundColor: activeSuggestionIndex === index ? '#EEE' : '' }" @mouseenter="activeSuggestionIndex = index" @click="takeSuggestion" :key="suggestionItem.value">
          <span class="input-autotext__suggestion-text">{{ suggestionItem.text }}</span>
          <span class="input-autotext__suggestion-description" v-show="suggestionItem.description && activeSuggestionIndex === index">{{ suggestionItem.description }}</span>
        </li>
  
      </ul>
    </div>
  
  </div>
</template>

<script>
export default {
  props: {
    dataProvider: { type: [Array, Function], require: true },
    value: { type: String },
    placeholder: { type: String },
  },

  data() {
    return {
      activeSuggestionIndex: 0,
      suggestionList: [],
      valueHolder: '',
      isShowSuggestion: true,
      isInputFocus: false,
      isSuggestionFocus: false,
    }
  },

  computed: {
    showSuggestion() {
      return this.dataProvider && (this.isInputFocus || this.isSuggestionFocus) && this.isShowSuggestion
    },
  },

  methods: {
    input(event) {
      this.isShowSuggestion = true
      this.generateSuggestion()
      this.$emit('input', event.target.value)
    },

    keydown({ keyCode }) {
      switch (keyCode) {
        case 13:
          this.takeSuggestion()
          break
        case 38:
          if (this.activeSuggestionIndex !== 0) {
            this.activeSuggestionIndex -= 1
          }
          break
        case 40:
          if (this.activeSuggestionIndex !== this.suggestionList.length - 1) {
            this.activeSuggestionIndex += 1
          }
          break
      }
    },

    generateSuggestion() {
      if (Array.isArray(this.dataProvider)) {
        const valueRx = new RegExp(this.valueHolder, 'i')
        this.suggestionList = this.dataProvider
          .filter(({ search }) => {
            return valueRx.test(search)
          })
      } else {
        Promise.resolve(this.dataProvider({ query: this.valueHolder }))
          .then((suggestionList) => {
            this.suggestionList = suggestionList
          })
      }
    },

    takeSuggestion() {
      const { value } = this.suggestionList[this.activeSuggestionIndex]
      this.$emit('input', value)
      this.$nextTick().then(() => {
        this.isShowSuggestion = false
      })
    },
  },

  mounted() {
    this.$watch(() => {
      this.valueHolder = this.value
    })
    this.$watch(() => {
      const { suggestionList = null, input = null } = this.$refs
      if (suggestionList && input) {
        suggestionList.style.width = getComputedStyle(input).width
      }
    })
  },
}
</script>

<style>
.input-autotext__suggestion-container {
  position: relative;
  height: 0px;
  top: 4px;
}

.input-autotext__suggestion-list {
  box-sizing: border-box;
  list-style: none;
  padding-left: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
  background-color: #fff;
  border: 1px solid #BDBDBD;
  border-radius: 2px;
}

.input-autotext__suggestion-item {
  padding: 0px 4px;
}

.input-autotext__suggestion-text {
  line-height: 32px;
}

.input-autotext__no-suggestion {
  text-align: center;
  font-style: italic;
  background-color: #fff;
  color: #424242;
  line-height: 32px;
}
</style>
