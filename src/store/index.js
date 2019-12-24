import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/plugin/firebase'
import village from './modules/village'

Vue.use(Vuex)
console.log('db:', db)
export default new Vuex.Store({
  modules: {
    village,
  },
})
