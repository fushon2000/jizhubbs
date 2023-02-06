import Vue from 'vue'
import Vuex from 'vuex'
import dataDictionary from './modules/dataDictionary'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    dataDictionary,
  },
})

export default store
