import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/plugin/firebase'

Vue.use(Vuex)
export default {
  namespaced: true,
  state: {
    village: {},
  },
  mutations: {
    initVillage(state, village) {
      state.village = village
    },
    addVillage(state, village) {
      // state.village.push(village)
      console.log('state:', village)
      state.village[village.id] = village.Data
      console.log('state:', state, village)
    },
    updateVillage(state, village) {
      const index = state.village.findIndex(target => target.id === village.id)
      if (index !== -1) {
        state.village[index] = village
        // List内のオブジェクトの修正は変更検知してくれないため、新たにListのポインタを上書きすることで強制的にVueにデータの反映をさせている
        state.village = Object.assign([], state.data)
      }
    },
    deleteVillage(state, village) {
      const index = state.data.findIndex(target => target.id === village.id)
      if (index !== -1) {
        state.data.splice(index, 1)
      }
    },
  },
  actions: {
    initialized({ commit }) {
      commit('initVillage', {})
    },
    // subscribe({ commit, state }) {
    //   // callback function
    //   // this.watchAll = state.villageRepository.findAll((type, village) => {
    //   //   if (type === 'added') { commit(types.ADD, village) }
    //   //   else if (type === 'modified') { commit(types.UPDATE, village) }
    //   //   else if (type === 'removed') { commit(types.DELETE, village) }
    //   // });
    //
    // },
    getAllVillage({ commit }) {
      // initVillage
      // commit('initVillage', {})
      db.collection('village').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const docData = doc.data()
          // doc.data() is never undefined for query doc snapshots
          console.log('addVillage', docData, doc.id)
          commit('addVillage', { Data: docData, id: doc.id })
          console.log(doc.id, ' => ', docData)
        })
      })
    },
    // unsubscribe() {
    //   // firebase.CollectionReference.onSnapshot()はObserverのため、
    //   // 削除しないとメモリリークの可能性があるため、定期的に削除(unsubscribeする)
    //   // また、消さない場合は２重で同じデータが取得されてしまう可能性も
    //   if (this.watchAll) {
    //     this.watchAll()
    //     this.watchAll = null
    //   }
    // },
    addVillages({ state }, village) {
      state.villageRepository.add(village)
    },
    deleteVillages({ state }, village) {
      state.villageRepository.remove(village)
    },

  },
  getters: {
    getVillage: (state) => {
      console.log('gettest', state)
      return state.village
    },
  },
}
