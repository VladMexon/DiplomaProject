export default function(instance) {
    return {
      login(payload) {
        return instance.post('auth/login', payload)
      },
      register(payload) {
        return instance.post('data/employee', payload)
      }
    }
  }
  