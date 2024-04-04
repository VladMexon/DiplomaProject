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
            console.log(notifications);
            res.json({notifications, buttons: null});
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
            console.log(notifications);
            res.json({notifications, buttons: null});
        }catch(e){
            next(e);
        }
    }
}

module.exports = new dataController();