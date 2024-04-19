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
    async newButton(buttonText, idNotification, idSendNotification){
        return await dbService.newButton(buttonText, idNotification, idSendNotification);
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
    async getButtons(ids){
        return await dbService.getButtons(ids);
    }
    async react(idEmployee, id_sended, id_send_notification){
        const recipients = await dbService.getRecipients(id_send_notification);
        recipients.forEach(async (item) => {
            await dbService.newSendedNotification(id_send_notification, idEmployee, item.id_employee);
        })
        await dbService.setReacted(id_sended);
        return
    }
    async readed(id_sended){
        await dbService.setReacted(id_sended);
        return
    }
    async getUnreactedCount(id_recipient){
        const ids = await dbService.getIdTypes();
        const result = [];
        for(let i=0; i<ids.length; i++){
            result.push({count: (await dbService.getUnreactedCount(id_recipient, ids[i].id_type)).count, id_type: ids[i].id_type});
        }
        return result;
    }
}

module.exports = new notificatonService();