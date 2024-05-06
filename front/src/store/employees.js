import api from '../api/index.js'
export default {
  namespaced: true,
  state: {
    employees: null
  },
  getters: {
    getEmployees(state) {
      return state.employees.filter(employee => employee.valid);
    },
    getEmployeeNameById: (state) => (id) => {
      let employee = state.employees.find(employee => employee.id_employee == id);
      if (employee) {
        if (employee.middle_name)
          return (employee.second_name + " " + employee.first_name + " " + employee.middle_name);
        else {
          return (employee.second_name + " " + employee.first_name);
        }
      }else{
        return ("John Doe"); //Этого не должно произойти
      }
    }
  },
  mutations: {
    SET_EMPLOYEES(state, payload) {
      state.employees = payload
    }
  },
  actions: {
    async loadEmployees({ commit }) {
      try {
        const response = await api.notification.getRecipients();
        console.log(response);
        commit('SET_EMPLOYEES', response.data);
      } catch (e) {
        console.log(e);
      }
    }
  }
}
