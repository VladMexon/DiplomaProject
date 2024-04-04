import api from '../api/index.js'
export default {
    namespaced: true,
    state: {
      employees: null
    },
    getters: {
      getEmployees(state) {
        return state.employees
      },
      getEmployeeNameById: (state) => (id) =>{
        let employee = state.employees.find(employee => employee.id_employee == id);
        return (employee.second_name + " " + employee.first_name + " " + employee.middle_name)
      }
    },
    mutations: {
      SET_EMPLOYEES(state, payload) {
        state.employees = payload
      }
    },
    actions: {
      async loadEmployees({ commit }){
        try{
          const response = await api.notification.getRecipients();
          console.log(response);
          commit('SET_EMPLOYEES', response.data);
        }catch(e){
          console.log(e);
        }
      }
    }
}
  