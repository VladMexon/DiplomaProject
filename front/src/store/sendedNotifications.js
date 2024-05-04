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
        },
        getUpdateIds(state){
            return state.data.map(notification => notification.id_notification);
        }
    },
    mutations: {
        SET_DATA(state, payload) {
            for(let i = 0; i < payload.length; i++){
                let newRecipientsDataPart = [];
                payload[i].recipients_data.split(',').forEach(rec_data => {
                    let temp = rec_data.split('=');
                    let temp2 = temp[1].split('|');
                    newRecipientsDataPart.push({employee: temp[0], state: temp2[0]==='true', react_time:temp2[1]});
                })
                payload[i].recipients_data = newRecipientsDataPart;
            }
            state.data = payload;
        },
        ADD_DATA(state, payload) {
            for(let i = 0; i < payload.length; i++){
                if(state.data.map(notification => notification.id_notification).includes(payload[i].id_notification)){
                    state.data = state.data.filter(notification => notification.id_notification !== payload[i].id_notification);
                }
                let newRecipientsDataPart = [];
                payload[i].recipients_data.split(',').forEach(rec_data => {
                    let temp = rec_data.split('=');
                    let temp2 = temp[1].split('|');
                    newRecipientsDataPart.push({employee: temp[0], state: temp2[0]==='true', react_time:temp2[1]});
                })
                payload[i].recipients_data = newRecipientsDataPart;
            }
            state.data.push(...payload);
        },
        SET_LAST_ID(state, payload) {
            state.last_id = payload;
        }
    },
    actions: {
        async initData({ commit }) {
            try {
                const data = (await api.notification.getSendedNotifications({id_notificaiton:0})).data;
                if(data.length > 0){
                    const last_id = data[data.length - 1].id_notification;
                    commit('SET_DATA', data);
                    commit('SET_LAST_ID', last_id)
                }
            } catch (e) {
                console.log(e);
            }
        },
        async  getPrevData({ commit, getters }){
            try {
                const data = (await api.notification.getSendedNotifications({id_notificaiton:getters.getLastId})).data;
                if(data.length > 0){
                    const last_id = data[data.length - 1].id_notification;
                    commit('ADD_DATA', data);
                    commit('SET_LAST_ID', last_id)
                    return true;
                }
                return false;
            } catch (e) {
                console.log(e);
            }
        },
        async getUpdateData({commit, getters}){
            try{
                const data = (await api.notification.getSendedNotificationsBySenderIds({ids: getters.getUpdateIds})).data;
                commit('ADD_DATA', data);
            }catch(e){
                console.log(e);
            }
        }
    }
}

