import api from '../api/index.js';
export default {
    namespaced: true,
    state: {
        users: [],
        updatedUsers: [],
        id_last: 0,
    },
    getters: {
        getUsers(state) {
            return state.users.sort((a, b) => {
                let intA = parseInt(a.id_employee);
                let intB = parseInt(b.id_employee);
                if (intA < intB) {
                    return 1;
                }
                if (intA > intB) {
                    return -1;
                }
                return 0;
            });
        },
        getLastId(state) {
            return state.id_last;
        },
        getUpdatedUsers(state) {
            return state.updatedUsers;
        },
    },
    mutations: {
        SET_USERS(state, payload) {
            state.users = payload;
            state.updatedUsers = [];
        },
        ADD_USERS(state, payload) {
            state.users.push(...payload);
        },
        SET_USER_UPDATED(state, payload) { //ahahahahahahaha
            let user = state.updatedUsers.find(item => item.id_employee == payload.id_employee);
            if(!user){
                state.updatedUsers.push(structuredClone(state.users.find(item => item.id_employee == payload.id_employee)));
                user = state.updatedUsers[state.updatedUsers.length - 1];
            }
            if(payload.changed == 'firstName'){
                user.first_name = payload.value;
            }
            if(payload.changed == 'secondName'){
                user.second_name = payload.value;
            }
            if(payload.changed == 'middleName'){
                user.middle_name = payload.value;
            }
            if(payload.changed == 'department'){
                user.id_department = payload.value;
            }
            if(payload.changed == 'position'){
                user.id_position = payload.value;
            }
            if(payload.changed == 'roles'){
                user.roles = payload.value.split(',').map(item => item.trim());
            }
            if(payload.changed == 'works'){
                if(payload.value == 'true' || payload.value == 'false'){
                    user.valid = payload.value;
                }
            }
        },
        SET_LAST_ID(state, payload) {
            state.id_last = payload;
        }
    },
    actions: {
        async getUsersData({ commit }) {
            try {
                const response = await api.auth.getUsersData({ id_last: 0 });
                commit('SET_USERS', response.data);
                commit('SET_LAST_ID', response.data[response.data.length - 1].id_employee);
            } catch (e) {
                console.log(e);
            }
        },
        async getPrevUsersData({ commit, getters }) {
            try {
                const response = await api.auth.getUsersData({ id_last: getters.getLastId });
                if (response.data.length > 0) {
                    commit('ADD_USERS', response.data);
                    commit('SET_LAST_ID', response.data[response.data.length - 1].id_employee);
                }
            } catch (e) {
                console.log(e);
            }
        },
        async sendNewUsersInfo({ getters }){
            try {
                const response = await api.auth.updateRecipientsInfo(getters.getUpdatedUsers);
                if (response.data == 'ok') {
                    return true;
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
}
