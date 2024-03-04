import {getCredentialsInfo, register, getEmployee} from '../utils/dbFunctions.js';
import bcrypt from 'bcryptjs';
import {validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';
import {SECRET_KEY, TOKEN_EXPIRES} from '../config/index.js';

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, SECRET_KEY, {expiresIn: TOKEN_EXPIRES + 'h'});
}

class authController{
    register(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({code: 0, message: errors});
        }
        const {username, password, id_employee} = req.body;
        getCredentialsInfo(username).then((queryResult) => {
            if(queryResult.data){
                return res.status(400).json({code: 1, message: 'User already exists'});
            }
            else{
                var hashPassword = bcrypt.hashSync(password, 7);
                register(username, hashPassword, id_employee, ['user']).then((data) => {
                    if(data.code == 0){
                        return res.status(200).json({code: 0, message: 'Success'});
                    }
                    else{
                        return res.status(400).json(data);
                    }
                });
            }
        });
    }
    login(req, res){
        const {login, password} = req.body;
        getCredentialsInfo(login).then((queryResult) => {
            if(!queryResult.data){
                return res.status(400).json({code: 1, message: "Password or username is not right"});
            }
            const validPassword = bcrypt.compareSync(password, queryResult.data.password);
            if(!validPassword){
                return res.status(400).json({code: 1, message: 'Password or username is not right'});
            }
            const token = generateAccessToken(queryResult.data.id_employee, queryResult.data.roles);
            getEmployee(queryResult.data.id_employee).then((queryResult) =>{
                return res.status(200).cookie('Authorization', "Bearer " + token, {expires: new Date(Date.now() + TOKEN_EXPIRES * 60 * 60 * 1000)}).json(queryResult.data);
            });
             //установить secure и разобраться с cors policy и httpOnly(возсожно)
        })
    }
    getUser(req, res){
        let id = req.user.id;
        getEmployee(id).then((queryResult) => {
            if(queryResult.code == 0){
                res.status(200).send(queryResult.data);
            }
            else{
                res.status(500).send(queryResult);
            }
        });
    }
}

export default new authController();