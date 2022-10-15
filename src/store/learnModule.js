export default {
  state: {
    savedWordList: [],
    savedCurrentIndex: 0,
    savedIsTranslated: false,
    isLearnedAtLeastOnce: false
  },
  mutations: {
    increaseSavedIndex(state) {
      state.savedCurrentIndex++
      localStorage.setItem('savedCurrentIndex', state.savedCurrentIndex)
    },
    setSavedIndex(state, payload) {
      state.savedCurrentIndex = payload
      localStorage.setItem('savedCurrentIndex', payload)
    },
    addWordToSavedList(state, payload) {
      const isWordAlreadySaved = state.savedWordList.find(
        (item) => item.text === payload.text
      )
      if (!isWordAlreadySaved) {
        state.savedWordList.push(payload)
        localStorage.setItem(
          'savedWordList',
          JSON.stringify(state.savedWordList)
        )
      }
    },
    setSavedWordList(state, payload) {
      state.savedWordList = payload
      localStorage.setItem('savedWordList', JSON.stringify(payload))
    },
    setSavedIsTranslated(state, payload) {
      state.isTranslated = payload
    },
    setIsLearnedAtLeastOnce(state, payload) {
      state.isLearnedAtLeastOnce = payload
    }
  },
  getters: {
    getSavedWordList(state) {
      return state.savedWordList
    },
    getSavedCurrentIndex(state) {
      return state.savedCurrentIndex
    },
    getSavedIsTranslated(state) {
      return state.isTranslated
    },
    getIsLearnedAtLeastOnce(state) {
      return state.isLearnedAtLeastOnce
    }
  }
}
