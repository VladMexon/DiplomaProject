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
    async getPrevNotifications(idRecipient, idLast, idType){
        if(idType==0){
            return await dbService.getPrevNotificationsNoId(idRecipient, idLast);
        }else{
            return await dbService.getPrevNotifications(idRecipient, idLast, idType);
        }
    }
    async getNewNotifications(idRecipient, idLast, idType){
        if(idType==0){
            return await dbService.getNewNotificationsNoId(idRecipient, idLast);
        }else{
            return await dbService.getNewNotifications(idRecipient, idLast, idType);
        }
    }
    async getLastId(idEmployee){
        return await dbService.getLastId(idEmployee);
    }
}

module.exports = new notificatonService();