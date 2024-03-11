const dbService = require('../services/dbService');
const bcrypt = require('bcrypt');
const tokenService = require('./tokenService');
//const uuid = require('uuid'); //Пойдет в топку скорее всего(использовалось для подверждения адреса электронной почты)
const ApiError = require('../exeptions/apiError');


class authService{
    async  registration(login, password, id_employee){
        const candidate = await dbService.getCredentials(login);
        if(candidate){
            throw new ApiError.BadRequest('Пользователь с таким именем уже существует');
        }
        const hashedPassword = await bcrypt.hash(password, 3);
        //const activationLink = uuid.v4();
        await dbService.registerEmployee(login, hashedPassword, id_employee);
        const tokens = tokenService.generateToken({idEmployee: id_employee, login: login});
        await dbService.setRefreshToken(tokens.refreshToken, id_employee)
        return {
            tokens    
        }
    }
    async login(login, password){
        const userCredentials = await dbService.getCredentials(login);
        if(!userCredentials){
            throw ApiError.BadRequest('Неверный логи или пароль');
        }
        const isPassEquals = await bcrypt.compare(password, userCredentials.password);
        if(!isPassEquals){
            throw ApiError.BadRequest('Неверный логи или пароль');
        }
        const userData = await dbService.getEmployee(userCredentials.id_employee);
        const tokens = await tokenService.generateToken({id_employee: userCredentials.id_employee, id_position: userData.id_position, time: Date.now()}); //ВАЖНО
        await tokenService.saveToken(tokens.refreshToken, userCredentials.id_employee);
        return {
            tokens,
            userData: userData
        }
    }

    async logout(refresh_token){
        await dbService.deleteRefreshToken(refresh_token);
        return
    }

    async refresh(refresh_token){
        if(!refresh_token){
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refresh_token); //id_employee, id_position
        const tokenFromDb = dbService.getRefreshToken(refresh_token);
        if(!userData || !tokenFromDb){
            throw ApiError.UnauthorizedError();
        }
        const employeeInfo = await dbService.getEmployee(userData.id_employee);
        const tokens = await tokenService.generateToken({id_employee: userData.id_employee, id_position: userData.id_position, time: Date.now()}); //ВАЖНО
        await tokenService.saveToken(tokens.refreshToken, userData.id_employee);
        return {
            tokens,
            employeeInfo
        }
    }
    async getUserInfo(id_employee){
        const userInfo = dbService.getEmployee(id_employee);
        return userInfo;
    }
}

module.exports = new authService();