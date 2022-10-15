export default {
  state: {
    learnedWordList: []
  },
  mutations: {
    addToLearnedWordList(state, payload) {
      state.learnedWordList = [...state.learnedWordList, ...payload]
      localStorage.setItem(
        'learnedWordList',
        JSON.stringify(state.learnedWordList)
      )
    },
    setLearnedWordList(state, payload) {
      state.learnedWordList = payload
    }
  },
  getters: {
    getLearnedWordList(state) {
      return state.learnedWordList
    }
  }
}
