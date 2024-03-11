import axios from 'axios'
import api from '../api/index.js'
export default {
    namespaced: true,
    state: {
      user: null,
      auth: false
    },
    getters: {
      getUser(state) {
        return state.user
      },
      getAuthState(state){
        return state.auth
      }
    },
    mutations: {
      SET_USER(state, payload) {
        state.user = payload
      },
      DELETE_USER(state) {
        state.user = null
      },
      SET_AUTH_STATE(state, payload) {
        state.auth = payload
      }
    },
    actions: {
      deleteUser({ commit }) {
        commit('DELETE_USER')
      },
      async login({ commit }, payload){
        try{
          const response = await api.auth.login(payload);
          console.log(response);
          localStorage.setItem('token', response.data.accessToken);
          commit('SET_USER', response.data.userData);
          commit('SET_AUTH_STATE', true);
        }catch(e){
          console.log(e);
        }
      },
      async logout({ commit }){
        try{
          await api.auth.logout();
          localStorage.removeItem('token');
          commit('DELETE_USER');
          commit('SET_AUTH_STATE', false);
        }catch(e){
          console.log(e.response?.data?.message);
        }
      },
      async checkAuth({ commit }, ){
        try{
          const response = await axios.get('http://localhost:3000/auth/refresh', {withCredentials: true});

          localStorage.setItem('token', response.data.accessToken);
          commit('SET_USER', response.data.userData);
          commit('SET_AUTH_STATE', true);
        }catch(e){
          console.log(e.response?.data?.message);
        }
      }
    }
  }
  