import api from '../api/index.js'
export default {
    namespaced: true,
    state: {
      positions: null
    },
    getters: {
      getPositions(state) {
        return state.positions
      }
    },
    mutations: {
      SET_POSITIONS(state, payload) {
        state.positions = payload
      }
    },
    actions: {
      async loadPositions({ commit }){
        try{
          const response = await api.notification.getPositions();
          console.log(response);
          commit('SET_POSITIONS', response.data);
        }catch(e){
          console.log(e);
        }
      }
    }
}