export default function(instance) {
    return {
      get(payload) {
        return instance.get('data/employee', payload)
      }
    }
  }