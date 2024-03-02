import instance from './instance'
import authModule from './auth'
import myInfoModule from './myInfo'

export default {
  auth: authModule(instance),
  myInfo: myInfoModule(instance)
}

