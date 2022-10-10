export default {
  state: {
    savedWordList: [],
    savedCurrentIndex: 0,
    savedIsTranslated: false
  },
  mutations: {
    increaseSavedIndex(state) {
      state.savedCurrentIndex++
    },
    setSavedIndex(state, payload) {
      state.savedCurrentIndex = payload
    },
    addWordToSavedList(state, payload) {
      state.savedWordList.push(payload)
    },
    setSavedWordList(state, payload) {
      state.savedWordList = payload
    },
    setSavedIsTranslated(state, payload) {
      state.isTranslated = payload
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
    }
  }
}
