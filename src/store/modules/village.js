import firestore from '@/plugin/firebase.js'

const villageRef = firestore.collecttion('village')

export default {
  namespaced: true,
  unsubscribe: null,
  state () {
    return {
      villages: []
    }
  },
  mutations: {
    init (state, payload) {
      state.villages = payload
    },
    add (state, payload) {
      state.villages.push(payload)
    },
    set (state, payload) {
      const index = state.villages.findIndex(memo => memo.id === payload.id)
      if (index !== -1) {
        state.villages[index] = payload
      }
    },
    remove (state, payload) {
      const index = state.villages.findIndex(memo => memo.id === payload.id)
      if (index !== -1) {
        state.villages.splice(index, 1)
      }
    }
  },
  getters: {
    getVillages (state) {
      return state.villages
    }
  },
  actions: {
    clear ({ commit }) {

    }
  }
}
