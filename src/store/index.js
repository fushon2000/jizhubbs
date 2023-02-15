import Vue from 'vue'
import Vuex from 'vuex'
import dataDictionary from '@/store/modules/dataDictionary'
import user from "@/store/modules/user";
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    dataDictionary,
    user
  },
})

export default store
