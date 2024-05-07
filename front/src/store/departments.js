import api from '../api/index.js'
export default {
    namespaced: true,
    state: {
      departments: null
    },
    getters: {
      getDepartments(state) {
        return state.departments
      },
      getDepartmentName: (state) => (id_department) => {
        if(id_department){
          return state.departments.find(item => item.id_department == id_department).department_name;
        }
      }
    },
    mutations: {
      SET_DEPARTMENTS(state, payload) {
        state.departments = payload
      }
    },
    actions: {
      async loadDepartments({ commit }){
        try{
          const response = await api.notification.getDepartments();
          console.log(response);
          commit('SET_DEPARTMENTS', response.data);
        }catch(e){
          console.log(e);
        }
      }
    }
}