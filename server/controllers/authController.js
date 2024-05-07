const authService = require('../services/authService');
const ApiError = require('../exeptions/apiError');
const { validationResult } = require('express-validator');

class authController{
    async register(req, res, next){ //тут все переделать(вообще никакние токены не нужны) https://www.youtube.com/watch?v=fN25fMQZ2v0 с 37 минуты(реализовать рассылку)
        try{
            const result = await authService.registration(req.body);
            if(result){
                return res.json('ok');
            }else{
                return res.status(400).json('Этот email уже привязан к учетной записи');
            }
        }catch(e){
            next(e);
        }
    }
    async login(req, res, next){
        try{
            const {login, password} = req.body;
            const payload = await authService.login(login, password);
            res.cookie('refreshToken', payload.tokens.refreshToken, {maxAge: process.env.REFRESH_TOKEN_EXPIRES * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json({accessToken: payload.tokens.accessToken, userData: payload.userData, roles: payload.roles});
        }catch(e){
            next(e);
        }
    }
    async logout(req, res, next){
        try{
            const {refreshToken} = req.cookies;

            await authService.logout(refreshToken);
            res.clearCookie('refreshToken');

            return res.status(200).json('ok');
        }catch(e){
            next(e);
        }
    }
    async refresh(req, res, next){
        try{
            const {refreshToken} = req.cookies;
            const payload = await authService.refresh(refreshToken);
            res.cookie('refreshToken', payload.tokens.refreshToken, {maxAge: process.env.REFRESH_TOKEN_EXPIRES * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json({accessToken: payload.tokens.accessToken, userData: payload.employeeInfo, roles: payload.roles});
        }catch(e){
            next(e);
        }
    }
    async  user(req, res, next){ 
        try{
            const id_employee = res.locals.id_employee;
            const user_info = await authService.getUserInfo(id_employee);
            res.json(user_info);
        }catch(e){
            next(e);
        }
    }
    async getUsersData(req, res, next){
        try{
            const id_last = req.body.id_last;
            if(id_last != null){
                const response = await authService.getUsersData(id_last);
                res.json(response);
            }
            else{
                throw ApiError.BadRequest("Отсутствует id_last");
            }
        }catch(e){
            next(e);
        }
    }
    async updateRecipientsInfo(req, res, next){
        try{
            let data = req.body;
            console.log(data);
            if(data.length > 0){
                await authService.updateRecipientsInfo(data);
                res.json('ok');
            }
        }catch(e){
            next(e);
        }
    }
}

module.exports = new authController();