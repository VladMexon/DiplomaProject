const dbService = require('../services/dbService');
const bcrypt = require('bcrypt');
const tokenService = require('./tokenService');
//const uuid = require('uuid'); //Пойдет в топку скорее всего(использовалось для подверждения адреса электронной почты)
const ApiError = require('../exeptions/apiError');
const mailService = require('./mailService');
const passfather = require('passfather');

class authService {
    async registration(paylaod) {
        const login = paylaod.email;
        const userCredentials = await dbService.getCredentials(login);
        if (userCredentials) {
            //throw ApiError.BadRequest('Этот email уже привязан к учетной записи'); //aaaaaaaaaaaaaaaaaaaa
            return false;
        }
        const id_employee = (await dbService.newEmployee(paylaod)).id_employee;
        const password = passfather();
        const hashedPassword = await bcrypt.hash(password, 3);
        await dbService.registerEmployee(login, hashedPassword, id_employee, ['user'], paylaod.email);
        mailService.sendCred(paylaod.email, login, password);
        return true;
    }
    async login(login, password) {
        const userCredentials = await dbService.getCredentials(login);
        if (!userCredentials) {
            throw ApiError.BadRequest('Неверный логи или пароль');
        }
        const isPassEquals = await bcrypt.compare(password, userCredentials.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный логи или пароль');
        }
        const userData = await dbService.getEmployee(userCredentials.id_employee);
        const tokens = await tokenService.generateToken({ id_employee: userCredentials.id_employee, id_position: userData.id_position, roles: userCredentials.roles, time: Date.now() }); //ВАЖНО
        await tokenService.saveToken(tokens.refreshToken, userCredentials.id_employee);
        return {
            tokens,
            userData: userData,
            roles: userCredentials.roles
        }
    }

    async logout(refresh_token) {
        await dbService.deleteRefreshToken(refresh_token);
        return
    }

    async refresh(refresh_token) {
        if (!refresh_token) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refresh_token);//лишнее. можно конечно, но зачем? А вот для отслеживания аремени валидности
        if(!userData){
            throw ApiError.UnauthorizedError();
        }
        const tokenFromDb = await dbService.getRefreshToken(refresh_token);
        const userCredentials = await dbService.getCredentialsByIdEmployee(tokenFromDb.id_employee);
        if (!tokenFromDb || !userCredentials) {
            throw ApiError.UnauthorizedError();
        }
        const employeeInfo = await dbService.getEmployee(tokenFromDb.id_employee);
        const tokens = await tokenService.generateToken({ id_employee: tokenFromDb.id_employee, id_position: employeeInfo.id_position, roles: userCredentials.roles, time: Date.now() }); //ВАЖНО
        await dbService.deleteRefreshToken(refresh_token);
        await tokenService.saveToken(tokens.refreshToken, tokenFromDb.id_employee);
        return {
            tokens,
            employeeInfo,
            roles: userCredentials.roles
        }
    }
    async getUserInfo(id_employee) {
        const userInfo = dbService.getEmployee(id_employee);
        return userInfo;
    }
    async getUsersData(id_last){
        if(id_last != 0){
            return await dbService.getUsersData(id_last);
        }
        else{
            return await dbService.getUsersDataNoIdLast();
        }
    }
    async updateRecipientsInfo(recipients){
        recipients.forEach(async (recipient) => {
            await dbService.updateRecipient(recipient.first_name, recipient.second_name, recipient.middle_name, recipient.id_department, recipient.id_position, recipient.valid, recipient.id_employee, recipient.roles);
            await dbService.updateRoles(recipient.roles, recipient.id_employee);
        });
    }
}

module.exports = new authService();