export default {
  state: {
    theme: 'cyan'
  },
  mutations: {
    setTheme(state, payload) {
      state.theme = payload
      localStorage.setItem('theme', payload)
    }
  },
  getters: {
    getTheme(state) {
      return state.theme
    }
  }
}
