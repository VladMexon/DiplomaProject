import api from '../api/index.js'
export default {
    namespaced: true,
    state: {
        data: null,
        last_id: null
    },
    getters: {
        getData(state) {
            return state.data
        },
        getLastId(state) {
            return state.last_id;
        }
    },
    mutations: {
        SET_DATA(state, payload) {
            state.data = payload
        },
        ADD_DATA(state, payload) {
            state.data.push(...payload);
        },
        SET_LAST_ID(state, payload) {
            state.last_id = payload;
        }
    },
    actions: {
        async initData({ commit }) {
            try {
                const data = (await api.notification.getSendedNotifications(0)).data;
                if(data.length > 0){
                    const last_id = data[data.length - 1].id_notification;
                    commit(SET_DATA, data);
                    commit(SET_LAST_ID, last_id)
                }
            } catch (e) {
                console.log(e);
            }
        },
        async  getPrevData({ commit, getters }){
            try {
                const data = (await api.notification.getSendedNotifications(getters.getLastId)).data;
                if(data.length > 0){
                    const last_id = data[data.length - 1].id_notification;
                    commit(ADD_DATA, data);
                    commit(SET_LAST_ID, last_id)
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
}