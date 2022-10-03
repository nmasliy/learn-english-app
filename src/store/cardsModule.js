import axios from 'axios'

export default {
  state: {
    wordList: [],
    activeWordList: [],
    savedWordList: [],
    activeWordIndex: 0
  },
  mutations: {
    setWordList(state, payload) {
      state.wordList = payload
    },
    setActiveWordList(state, payload) {
      state.activeWordList = payload
    },
    setSavedWordList(state, payload) {
      state.savedWordList = payload
    },
    saveWord(state, payload) {
      state.savedWordList.push({ ...payload })
    },
    setActiveWordIndex(state, payload) {
      state.activeWordIndex = payload
    },
    increaseIndex(state) {
      state.activeWordIndex++
    }
  },
  getters: {
    getWordList(state) {
      return state.wordList
    },
    getActiveWordList(state) {
      return state.activeWordList
    },
    getSavedWordList(state) {
      return state.savedWordList
    },
    getActiveWordIndex(state) {
      return state.activeWordIndex
    }
  },
  actions: {
    fetchWordList(context) {
      const URL = 'data/words.json'
      return axios
        .get(URL)
        .then((response) => {
          context.commit('setWordList', response.data.words)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    fetchWord(context, payload) {
      const API_KEY =
        'dict.1.1.20220901T125532Z.f63805697bba0d92.dcf91da32bda07d09e85eeb64adca4eb7e0a25cb'
      const URL = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${API_KEY}&lang=en-ru&text=${payload.wordText}`
      return axios.get(URL).then((response) => {
        return {
          translate: response.data.def[0].tr[0].text,
          transcription: response.data.def[0].ts
        }
      })
    }
  }
}
