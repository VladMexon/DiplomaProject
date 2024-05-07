import axios from 'axios'
import api from '../api/index.js'
export default {
  namespaced: true,
  state: {
    user: {},
    auth: false,
    roles: []
  },
  getters: {
    getUser(state) {
      return state.user
    },
    getAuthState(state) {
      return state.auth
    },
    getRoles(state) {
      return state.roles
    }
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    DELETE_USER(state) {
      state.user = null;
    },
    SET_AUTH_STATE(state, payload) {
      state.auth = payload;
    },
    SET_ROLES(state, payload) {
      state.roles = payload;
    }
  },
  actions: {
    deleteUser({ commit }) {
      commit('DELETE_USER')
    },
    async login({ commit }, payload) {
      try {
        const response = await api.auth.login(payload);
        console.log(response);
        localStorage.setItem('token', response.data.accessToken);
        commit('SET_USER', response.data.userData);
        commit('SET_AUTH_STATE', true);
        commit('SET_ROLES', response.data.roles);
        return false;
      } catch (e) {
        console.log(e);
        return true;
      }
    },
    async logout({ commit }) {
      try {
        await api.auth.logout();
        localStorage.removeItem('token');
        commit('DELETE_USER');
        commit('SET_AUTH_STATE', false);
      } catch (e) {
        console.log(e.response?.data?.message);
      }
    },
    async checkAuth({ commit },) {
      try {
        const response = await axios.get('https://notificationsystemtest.crabdance.com:3000/auth/refresh', { withCredentials: true });

        localStorage.setItem('token', response.data.accessToken);
        commit('SET_USER', response.data.userData);
        commit('SET_AUTH_STATE', true);
        commit('SET_ROLES', response.data.roles);
      } catch (e) {
        console.log(e.response?.data?.message);
      }
    }
  }
}
