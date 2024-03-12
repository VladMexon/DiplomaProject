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
}

module.exports = new notificatonService();