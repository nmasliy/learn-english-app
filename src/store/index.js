import { createStore } from 'vuex'
import cardsModule from '@/store/cardsModule'

const store = createStore({
  modules: {
    cardsModule
  }
})

export default store
