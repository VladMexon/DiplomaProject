import api from '../api/index.js'
export default {
    namespaced: true,
    state: {
      notifications: [],
      buttons: [],
      firstId: 0,
      lastId: 0
    },
    getters: {
      getButtons(state) {
        return state.buttons
      },
      getFirstId(state) {
        return state.firstId
      },
      getLastId(state) {
        return state.lastId
      },
      getNotificationsByTypeId:(state) => (id)=>{
        if(id != 0){
          console.log('yes')
          return state.notifications.filter(notification => notification.id_notification_type == id).sort((a, b) =>{
            if(a.id_sended < b.id_sended){
              return -1;
            }
            if(a.id_sended > b.id_sended){
              return 1;
            }
            return 0;
          });
          
        }else{
          return state.notifications.sort((a, b) =>{
            if(a.id_sended < b.id_sended){
              return -1;
            }
            if(a.id_sended > b.id_sended){
              return 1;
            }
            return 0;
          });
        }
      }
    },
    mutations: {
      SET_NOTIFICATIONS(state, payload) {
        state.notifications.push(...payload.notifications.sort((a, b) =>{
          if(a.id_sended < b.id_sended){
            return 1;
          }
          if(a.id_sended > b.id_sended){
            return -1;
          }
          return 0;
        }));
        if(payload.buttons){
          state.buttons.push(...payload.buttons)
        }
      },
      SET_FIRSTID(state, payload){
        state.firstId = payload
      },
      SET_LASTID(state, payload){
        state.lastId = payload
      },
      CLEAR_NOTIFICATIONS(state){
        state.notifications = [];
        state.buttons = [];
        state.firstId = 0;
        state.lastId = 0;
      }
    },
    actions: {
      async initNotifications({ commit }){
        try{
          const response = await api.notification.getNotifications({lastId: 0, id_notification_type: 0});
          console.log(response);
          commit('SET_NOTIFICATIONS', response.data);
          commit('SET_LASTID', response.data.notifications[0].id_sended);
          commit('SET_FIRSTID', response.data.notifications[response.data.notifications.length - 1].id_sended);
        }catch(e){
          console.log(e);
        }
      },
      async loadPrevNotifications({ commit, getters }, id_notification_type){
        try{
          const response = await api.notification.getNotifications({lastId: getters.getFirstId, id_notification_type});
          console.log(response);
          if(response.data.notifications.length > 0){
            commit('SET_NOTIFICATIONS', response.data);
            commit('SET_FIRSTID', response.data.notifications[response.data.notifications.length - 1].id_sended);
            return true;
          }
          return false;
        }catch(e){
          console.log(e);
        }
      },
      async getNewNotifications({ commit, getters }){
        try{
          const response = await api.notification.getNewNotifications({lastId: getters.getLastId});
          console.log(response);
          if(response.data.notifications.length > 0){
            commit('SET_NOTIFICATIONS', response.data);
            commit('SET_LASTID', response.data.notifications[0].id_sended);
            return true;
          }
          return false;
        }catch(e){
          console.log(e);
        }
      },
      clear({commit}){
        commit('CLEAR_NOTIFICATIONS');
      }
    },
    
}