import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import db from '@/plugin/firebase.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    village: []
  },
  mutations: {
    ...firebaseMutations
  },
  actions: {
    setVillageRef: firebaseAction(({ bindFirebaseRef }, ref) => {
      bindFirebaseRef('village', ref)
    })
  },
  getters: {
    getVillages: (state) => {
        return state.village
    }
  },
  modules: {

  },
})
