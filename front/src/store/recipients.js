import api from '../api/index.js'
export default {
    namespaced: true,
    state: {
      recipients: null
    },
    getters: {
      getRecipients(state) {
        return state.recipients
      }
    },
    mutations: {
      SET_RECIPIENTS(state, payload) {
        state.recipients = payload
      }
    },
    actions: {
      async loadRecipients({ commit }){
        try{
          const response = await api.notification.getRecipients();
          console.log(response);
          commit('SET_RECIPIENTS', response.data);
        }catch(e){
          console.log(e);
        }
      }
    }
}
  