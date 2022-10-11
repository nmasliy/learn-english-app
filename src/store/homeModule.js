import axios from 'axios'

export default {
  state: {
    wordList: [],
    activeWordList: [],
    activeCurrentIndex: 0,
    isTranslated: false
  },
  mutations: {
    setWordList(state, payload) {
      state.wordList = payload
    },
    setActiveWordList(state, payload) {
      state.activeWordList = payload
    },
    increaseActiveIndex(state) {
      state.activeCurrentIndex++
    },
    setActiveIsTranslated(state, payload) {
      state.isTranslated = payload
    }
  },
  getters: {
    getWordList(state) {
      return state.wordList
    },
    getActiveWordList(state) {
      return state.activeWordList
    },
    getActiveCurrentIndex(state) {
      return state.activeCurrentIndex
    },
    getActiveIsTranslated(state) {
      return state.isTranslated
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
            const translateWordFirst = response.data.def[0]?.tr[0]?.text
            const translateWordSecond = response.data.def[1]?.tr[0]?.text

            console.log(response.data.def[1]?.tr[0]?.text)
            const wordData = {
              text: wordText,
              translate: translateWordSecond
                ? translateWordFirst + ', ' + translateWordSecond
                : translateWordFirst || '',
              transcription: response.data.def[0]?.ts || wordText
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
