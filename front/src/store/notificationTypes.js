import api from '../api/index.js'
export default {
    namespaced: true,
    state: {
      notificationTypes: null
    },
    getters: {
      getnotificationTypes(state) {
        return state.notificationTypes
      }
    },
    mutations: {
      SET_NOTIFICATION_TYPES(state, payload) {
        state.notificationTypes = payload
      }
    },
    actions: {
      async loadNotificationTypes({ commit }){
        try{
          const response = await api.notification.getNotificationTypes();
          console.log(response);
          commit('SET_NOTIFICATION_TYPES', response.data);
        }catch(e){
          console.log(e);
        }
      }
    }
  }
  