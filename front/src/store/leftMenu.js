export default {
  namespaced: true,
  state: {
    visible: false
  },
  getters: {
    isVisible(state) {
      return state.visible
    }
  },
  mutations: {
    SET_VISIBLE(state) {
      state.visible = !state.visible;
    }
  },
  actions:{

  }
}
