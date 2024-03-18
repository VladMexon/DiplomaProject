export default function(instance) {
    return {
      getNotificationTypes() {
        return instance.get('/notification/types')
      },
      getRecipients() {
        return instance.get('/notification/recipients')
      },
      getDepartments() {
        return instance.get('/notification/departments')
      },
      getPositions() {
        return instance.get('/notification/positions')
      },
      sendNotification(payload) {
        return instance.post('/notification/send', payload)
      },
      getNotifications(payload) {
        return instance.post('/notification/get', payload)
      },
      getNewNotifications(payload) {
        return instance.post('/notification/getNew', payload)
      }
    }
  }