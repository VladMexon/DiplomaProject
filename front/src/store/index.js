import {createStore} from 'vuex'
import user from './user'
import notificationTypes from './notificationTypes'
import employees from './employees'
import departments from './departments'
import positions from './positions'
import notifications from './notifications'
import sendedNotifications from './sendedNotifications'
import commentsStore from './commentsStore'
import leftMenu from './leftMenu'

export default createStore({
  modules: { 
    user,
    notificationTypes,
    employees,
    departments,
    positions,
    notifications,
    sendedNotifications,
    commentsStore,
    leftMenu
  }
})

