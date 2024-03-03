export default function(instance) {
    return {
      get(payload) {
        return instance.get('auth/user', payload)
      }
    }
  }