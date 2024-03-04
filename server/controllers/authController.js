const { errors } = require('pg-promise');
const authService = require('../services/authService');
const ApiError = require('../exeptions/apiError');
const { validationResult } = require('express-validator');

class authController{
    async register(req, res, next){ //тут все переделать(вообще никакние токены не нужны) https://www.youtube.com/watch?v=fN25fMQZ2v0 с 37 минуты(реализовать рассылку)
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка валидации', errors.array()));
            }
            const {login, password, id_employee} = req.body;
            const tokens = await authService.registration(login, password, id_employee); //tokens

            return res.json({tokens});
        }catch(e){
            next(e);
        }
    }
    async login(req, res, next){
        try{
            const {login, password} = req.body;
            const userData = await authService.login(login, password);
            res.cookie('refreshToken', userData.tokens.refreshToken, {maxAge: process.env.REFRESH_TOKEN_EXPIRES * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json({accessToken: userData.tokens.accessToken, userData: userData.employeeInfo});
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
            const userData = await authService.refresh(refreshToken);
            res.cookie('refreshToken', userData.tokens.refreshToken, {maxAge: process.env.REFRESH_TOKEN_EXPIRES * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json({accessToken: userData.tokens.accessToken, userData: userData.employeeInfo});
        }catch(e){
            next(e);
        }
    }
    async  user(req, res, next){
        try{
            const id_employee = req.user.id_employee;
            const user_info = await authService.getUserInfo(id_employee);
            res.json(user_info);
        }catch(e){
            next(e);
        }
    }
}

module.exports = new authController();