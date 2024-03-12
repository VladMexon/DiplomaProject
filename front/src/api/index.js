import instance from './instance'
import authModule from './auth'
import notificationModule from './notification'

export default {
  auth: authModule(instance),
  notification: notificationModule(instance)
}

