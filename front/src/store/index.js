import {createStore} from 'vuex'
import user from './user'
import notificationTypes from './notificationTypes'
import recipients from './recipients'
import departments from './departments'
import positions from './positions'
import notifications from './notifications'

export default createStore({
  modules: { 
    user,
    notificationTypes,
    recipients,
    departments,
    positions,
    notifications
  }
})

