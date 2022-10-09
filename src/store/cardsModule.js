import axios from 'axios'

export default {
  state: {
    wordList: [],
    activeWordList: [],
    savedWordList: [],
    activeCurrentIndex: 0,
    savedCurrentIndex: 0
  },
  mutations: {
    setWordList(state, payload) {
      state.wordList = payload
    },
    setActiveWordList(state, payload) {
      state.activeWordList = payload
    },
    addWordToSavedList(state, payload) {
      state.savedWordList.push(payload)
    },
    increaseActiveIndex(state) {
      state.activeCurrentIndex++
    },
    increaseSavedIndex(state) {
      state.savedCurrentIndex++
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
    getSavedCurrentIndex(state) {
      return state.savedCurrentIndex
    },
    getActiveCurrentIndex(state) {
      return state.activeCurrentIndex
    }
  },
  actions: {
    fetchWordList(context) {
      const URL = 'data/words.json'
      return axios
        .get(URL)
        .then((response) => {
          context.commit('setWordList', response.data.words)
          return response.data.words
        })
        .catch((err) => {
          console.error(err)
        })
    },
    fetchWordsByCount(context, count) {
      const words = []

      return context.dispatch('fetchWordList').then((wordList) => {
        for (let i = 0; i < count; i++) {
          const randomIndex = Math.floor(Math.random() * wordList.length - 1)

          words.push(wordList[randomIndex])
        }
        return words
      })
    },
    fetchWordData(context, wordText) {
      const API_KEY =
        'dict.1.1.20220901T125532Z.f63805697bba0d92.dcf91da32bda07d09e85eeb64adca4eb7e0a25cb'
      const URL = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${API_KEY}&lang=en-ru&text=${wordText}`

      return axios
        .get(URL)
        .then((response) => {
          return {
            translate: response.data.def[0].tr[0].text || '',
            transcription: response.data.def[0].ts || ''
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
    fetchWordsData(context, wordsArr) {
      const API_KEY =
        'dict.1.1.20220901T125532Z.f63805697bba0d92.dcf91da32bda07d09e85eeb64adca4eb7e0a25cb'
      const wordsData = []

      const requests = wordsArr.map((wordText) => {
        const URL = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${API_KEY}&lang=en-ru&text=${wordText}`

        return axios
          .get(URL)
          .then((response) => {
            const wordData = {
              text: wordText,
              translate: response.data.def[0]?.tr[0]?.text || '',
              transcription: response.data.def[0]?.ts || ''
            }

            wordsData.push(wordData)
          })
          .catch((err) => {
            console.error(err)
          })
      })

      const data = Promise.all(requests).then(() => wordsData)

      return data
    }
  }
}
