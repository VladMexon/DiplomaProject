import api from '../api/index.js'
export default {
  namespaced: true,
  state: {
    notifications: [],
    newNotifications: [],
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
    getNotificationsByTypeId: (state) => (id) => {
      if (id != 0) {
        return state.notifications.filter(notification => notification.id_notification_type == id).sort((a, b) => {
          let intA = parseInt(a.id_sended);
          let intB = parseInt(b.id_sended);
          if (intA < intB) {
            return -1;
          }
          if (intA > intB) {
            return 1;
          }
          return 0;
        });

      } else {
        return state.notifications.sort((a, b) => {
          let intA = parseInt(a.id_sended);
          let intB = parseInt(b.id_sended);
          if (intA < intB) {
            return -1;
          }
          if (intA > intB) {
            return 1;
          }
          return 0;
        });
      }
    },
    getNewNotifications(state) {
      return state.newNotifications;
    },
    getButtonsByNotifId: (state) => (id) => {
      return state.buttons.filter(button => button.id_notification == id);
    }
  },
  mutations: {
    ADD_NOTIFICATIONS(state, payload) {
      if (payload.notifications.length > 0) {
        state.notifications.push(...payload.notifications);
        if (payload.buttons) {
          state.buttons.push(...payload.buttons)
        }
      }
    },
    ADD_NEW_NOTIFICATIONS(state, payload) {
      if (payload.notifications.length > 0) {
        state.newNotifications.push(...payload.notifications);
      }
    },
    SET_NOTIFICATIONS(state, payload) {
      state.notifications = payload.notifications;
      state.buttons = payload.buttons
    },
    SET_FIRSTID(state, payload) {
      state.firstId = payload
    },
    SET_LASTID(state, payload) {
      state.lastId = payload
    },
    CLEAR_NOTIFICATIONS(state) {
      state.notifications = [];
      state.buttons = [];
      state.firstId = 0;
      state.lastId = 0;
    },
    SET_NOTIFICATION_REACTED(state, payload) {
      state.notifications.find((item) => item.id_sended == payload).is_reacted = true;
    },
    REMOVE_NOTIFICATION_NOTIFICATION(state, paylaod) {
      state.newNotifications = state.newNotifications.filter((item) => item.id_sended != paylaod);
    }
  },
  actions: {
    async initNotifications({ commit, getters }, id_notification_type) {
      if (getters.getLastId == 0) {
        try {
          const response = await api.notification.getLastId();
          commit('SET_LASTID', response.data);
        } catch (e) {
          console.log(e);
        }
      }
      try {
        const response = await api.notification.getNewNotifications({ lastId: 0, id_notification_type });
        commit('SET_NOTIFICATIONS', response.data);
        //commit('SET_LASTID', response.data.notifications[0].id_sended);
        if (response.data.notifications.length > 0)
          commit('SET_FIRSTID', response.data.notifications[response.data.notifications.length - 1].id_sended);
      } catch (e) {
        console.log(e);
      }
    },
    async loadPrevNotifications({ commit, getters }, id_notification_type) {
      try {
        const response = await api.notification.getNotifications({ lastId: getters.getFirstId, id_notification_type });
        if (response.data.notifications.length > 0) {
          commit('ADD_NOTIFICATIONS', response.data);
          commit('SET_FIRSTID', response.data.notifications[response.data.notifications.length - 1].id_sended);
          return true;
        }
        return false;
      } catch (e) {
        console.log(e);
      }

    },
    async loadNewNotifications({ commit, getters }, id_notification_type) {
      try {
        const response = await api.notification.getNewNotifications({ lastId: getters.getLastId, id_notification_type });
        if (response.data.notifications.length > 0) {
          commit('ADD_NOTIFICATIONS', response.data);
          //commit('SET_LASTID', response.data.notifications[0].id_sended);
          return true;
        }
        return false;
      } catch (e) {
        console.log(e);
      }
    },
    async loadNewNotificationsNoId({ commit, getters }, id_notification_type) {
      try {
        const response = await api.notification.getNewNotifications({ lastId: getters.getLastId, id_notification_type: 0 });
        if (response.data.notifications.length > 0) {
          if (id_notification_type != 0) {
            commit('ADD_NOTIFICATIONS', { buttons: response.data.buttons, notifications: response.data.notifications.filter((item) => item.id_notification_type == id_notification_type) });
          } else {
            commit('ADD_NOTIFICATIONS', { buttons: response.data.buttons, notifications: response.data.notifications });
          }
          commit('ADD_NEW_NOTIFICATIONS', response.data);
          commit('SET_LASTID', response.data.notifications[0].id_sended);
          return true;
        }
        return false;
      } catch (e) {
        console.log(e);
      }
    },
    async react({ commit }, paylaod) {
      try {
        await api.notification.react({ id_sended: paylaod.id_sended, id_send_notification: paylaod.id_send_notification });
        commit('SET_NOTIFICATION_REACTED', paylaod.id_sended);
      } catch (e) {
        console.log(e);
      }
    }
  }
}
