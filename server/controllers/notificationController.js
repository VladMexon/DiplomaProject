const notificationService = require('../services/notificationService');
const ApiError = require('../exeptions/apiError');
const { validationResult } = require('express-validator');

class dataController {
    async getNotificationTypes(req, res, next){
        try{
            const payload = await notificationService.getAllNotificationTypes();
            res.json(payload);
        }catch(e){
            next(e);
        }
    }
    async getRecipients(req, res, next){
        try{
            const payload = await notificationService.getRecipients();
            res.json(payload);
        }catch(e){
            next(e);
        }
    }
    async getPositions(req, res, next){
        try{
            const payload = await notificationService.getPositions();
            res.json(payload);
        }catch(e){
            next(e);
        }
    }
    async getDepartments(req, res, next){
        try{
            const payload = await notificationService.getDepartments();
            res.json(payload);
        }catch(e){
            next(e);
        }
    }
    async sendNotification(req, res, next){
        try{
            const body = req.body;
            const idEmployee = req.user.id_employee;
            const result = await notificationService.newNotification(body.notificationHeader, body.notificationText, idEmployee, body.isDelayed, body.sendDate, body.notificationType, body.isDrafted, body.recipients);
            await body.recipients.forEach(async (recipient) => {
                await notificationService.sendNotification(result, idEmployee, recipient);
            });
            body.buttons.forEach(async (button) => {
                let result2 = await notificationService.newNotification(button.notificationHeader, button.notificationText, idEmployee, false, body.sendDate, button.notificationType, false, button.recipients);
                notificationService.newButton(button.buttonText, result, result2)
            });
            res.status(200).json('ok'); //немного странное решенеие которое решает проблему хранения информации о том отреагировал ли человек на уведомление (получатели привязаны к уведомлению(но это для черновиков) а также в таблице sended_notifications тоже есть связь отправитьель-получатель)
        }catch(e){
            next(e);
        }
    }
    async getNotifications(req, res, next){
        try{
            const idEmployee = req.user.id_employee;
            const lastId = req.body.lastId;
            const typeId = req.body.id_notification_type;
            const notifications = await notificationService.getPrevNotifications(idEmployee, lastId, typeId);
            const ids = notifications.map(notification => notification.id_notification);
            let buttons;
            if(ids.length > 0){
                buttons = await notificationService.getButtons(ids);
            }
            res.json({notifications, buttons});
        }catch(e){
            next(e);
        }
    }
    async getNewNotifications(req, res, next){
        try{
            const idEmployee = req.user.id_employee;
            const lastId = req.body.lastId;
            const typeId = req.body.id_notification_type;
            const notifications = await notificationService.getNewNotifications(idEmployee, lastId, typeId);
            const ids = notifications.map(notification => notification.id_notification);
            let buttons;
            if(ids.length > 0){
                buttons = await notificationService.getButtons(ids);
            }
            res.json({notifications, buttons});
        }catch(e){
            next(e);
        }
    }
    async getLastId(req, res, next){
        try{
            const idEmployee = req.user.id_employee;
            const responce = await notificationService.getLastId(idEmployee);
            res.json(responce.id_sended);
        }catch(e){
            next(e);
        }
    }
    async react(req, res, next){
        try{
            const idEmployee = req.user.id_employee;
            const id_sended = req.body.id_sended;
            const id_send_notification = req.body.id_send_notification;
            if(id_send_notification != null){
                await notificationService.react(idEmployee, id_sended, id_send_notification);
            }else{
                await notificationService.readed(id_sended);
            }
            res.json('ok');
        }catch(e){
            next(e);
        }
    }
    async getUnreactedCount(req, res, next){
        try{
            const idEmployee = req.user.id_employee;
            const result = await notificationService.getUnreactedCount(idEmployee);
            res.json(result);
        }catch(e){
            next(e);
        }
    }
}

module.exports = new dataController();