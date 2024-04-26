const dbService = require('../services/dbService');
const bcrypt = require('bcrypt');
const tokenService = require('./tokenService');
//const uuid = require('uuid'); //Пойдет в топку скорее всего(использовалось для подверждения адреса электронной почты)
const ApiError = require('../exeptions/apiError');
const mailService = require('./mailService');
const passfather = require('passfather');

class authService{
    async  registration(paylaod){
        let login = paylaod.email;
        const userCredentials = await dbService.getCredentials(login);
        if(userCredentials){
            throw ApiError.BadRequest('Этот email уже привязан к учетной записи');
        }
        let id_employee = (await dbService.newEmployee(paylaod)).id_employee;
        let password = passfather();
        const hashedPassword = await bcrypt.hash(password, 3);
        await dbService.registerEmployee(login, hashedPassword, id_employee, ['user'], paylaod.email);
        mailService.sendCred(paylaod.email, login, password);
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
        const tokens = await tokenService.generateToken({id_employee: userCredentials.id_employee, id_position: userData.id_position, roles: userCredentials.roles, time: Date.now()}); //ВАЖНО
        await tokenService.saveToken(tokens.refreshToken, userCredentials.id_employee);
        return {
            tokens,
            userData: userData,
            roles: userCredentials.roles
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
        const userCredentials = await dbService.getCredentialsByIdEmployee(userData.id_employee);
        const tokenFromDb = dbService.getRefreshToken(refresh_token);
        if(!userData || !tokenFromDb){
            throw ApiError.UnauthorizedError();
        }
        const employeeInfo = await dbService.getEmployee(userData.id_employee);
        const tokens = await tokenService.generateToken({id_employee: userData.id_employee, id_position: userData.id_position, roles: userCredentials.roles, time: Date.now()}); //ВАЖНО
        await tokenService.saveToken(tokens.refreshToken, userData.id_employee);
        return {
            tokens,
            employeeInfo,
            roles: userCredentials.roles
        }
    }
    async getUserInfo(id_employee){
        const userInfo = dbService.getEmployee(id_employee);
        return userInfo;
    }
}

module.exports = new authService();