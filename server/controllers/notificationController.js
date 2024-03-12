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
}

module.exports = new dataController();