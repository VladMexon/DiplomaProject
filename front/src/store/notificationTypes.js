import api from '../api/index.js'
export default {
    namespaced: true,
    state: {
      notificationTypes: [],
      unreactedCount: null
    },
    getters: {
      getnotificationTypes(state) {
        return state.notificationTypes
      },
      getTypeNameById: (state) => (id) => {
        if(id != 0){
          if(state.notificationTypes.length != 0){
            //console.log(id);
            return state.notificationTypes.find(type => type.id_type == id).type_name;
          }else{
            return [];
          }
        }else{
          return 'Все';
        }
        
      },
      getUnreactedCountByType: (state) => (id) => {
        if(id != 0){
          if(state.unreactedCount.length != 0){
            return state.unreactedCount.find(type => type.id_type == id).count;
          }else{
            return 0;
          }
        }else{
          return state.unreactedCount.reduce((acc, curr) => acc + curr.count, 0);
        }
      }
    },
    mutations: {
      SET_NOTIFICATION_TYPES(state, payload) {
        state.notificationTypes = payload;
      },
      SET_UNREACTED_COUNT(state, payload){
        state.unreactedCount = payload;
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
      },
      async loadUnreactedCount({ commit }){
        try{
          const response = await api.notification.getUnreactedCount();
          console.log(response);
          commit('SET_UNREACTED_COUNT', response.data);
        }catch(e){
          console.log(e);
        }
      }
    }
  }
  