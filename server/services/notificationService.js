const dbService = require('../services/dbService');

class notificatonService{
    async getAllNotificationTypes(){
        return await dbService.getAllNotificationTypes();
    }
    async getRecipients(){
        return await dbService.getAllEmployees();
    }
    async getPositions(){
        return await dbService.getPositions();
    }
    async getDepartments(){
        return await dbService.getDepartmrnts();
    }
    async newNotification(notificationHeader, notificationText, employeeId, isDelayed, sendDate, notificationType, isDrafted, recipients){
        const result = await dbService.newNotification(notificationHeader, notificationText, employeeId, isDelayed, sendDate, notificationType, isDrafted);
        recipients.forEach(async (recipient) => {
            await dbService.newRecipient(result.id_notification, recipient)
        });
        return result.id_notification;
    }
    async sendNotification(idNotification, idSender, idRecipient){
        return await dbService.newSendedNotification(idNotification, idSender, idRecipient);
    }
    async getNotifications(idRecipient, idLast, idType){
        if(idLast!=0){
            if(idType==0){
                return await dbService.getNotifications(idRecipient, idLast);
            }else{
                return await dbService.getNotificationsByType(idRecipient, idLast, idType);
            }
        }else{
            return await dbService.getLastNotifications(idRecipient);
        }
        
    }
    async getNewNotifications(idRecipient, idLast){
        return await dbService.getNewNotifications(idRecipient, idLast);
    }
}

module.exports = new notificatonService();