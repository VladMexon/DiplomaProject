import {getCredentialsInfo, register, getAllEmployees} from '../utils/dbFunctions.js';
import bcrypt from 'bcryptjs';
import {validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';
import {SECRET_KEY} from '../config/index.js';

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, SECRET_KEY, {expiresIn: "24h"});
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
        const {username, password} = req.body;
        getCredentialsInfo(username).then((queryResult) => {
            if(!queryResult.data){
                return res.status(400).json({code: 1, message: "Password or username is not right"});
            }
            console.log(queryResult);
            const validPassword = bcrypt.compareSync(password, queryResult.data.password);
            if(!validPassword){
                return res.status(400).json({code: 1, message: 'Password or username is not right'});
            }
            const token = generateAccessToken(queryResult.data.id_employee, queryResult.data.roles);
            return res.json({token: token});
        })


    }
    getUser(req, res){
        getAllEmployees().then((data) => {
            res.json(data);
        });
    }
}

export default new authController();