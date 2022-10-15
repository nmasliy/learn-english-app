import { createStore } from 'vuex'
import homeModule from '@/store/homeModule'
import themeModule from '@/store/themeModule'
import learnModule from '@/store/learnModule'
import profileModule from '@/store/profileModule'

const store = createStore({
  modules: {
    themeModule,
    homeModule,
    learnModule,
    profileModule
  }
})

export default store
