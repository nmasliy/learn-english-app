import { createStore } from 'vuex'
import homeModule from '@/store/homeModule'
import learnModule from '@/store/learnModule'

const store = createStore({
  modules: {
    homeModule,
    learnModule
  }
})

export default store
