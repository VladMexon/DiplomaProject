export default function(instance) {
    return {
      login(payload) {
        return instance.post('auth/login', payload)
      },
      register(payload) {
        return instance.post('auth/register', payload)
      },
      logout(payload) {
        return instance.get('auth/logout', payload)
      }
    }
  }
  