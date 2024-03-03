import api from '../api/index.js'
export default {
  install: (Vue) => {
    Vue.config.globalProperties.$api = api
  }
}


