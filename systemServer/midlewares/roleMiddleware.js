import jwt from 'jsonwebtoken';
import {SECRET_KEY} from '../config/index.js';

const roleMiddleware = (roles) => {
    return function(req, res, next){
        if(req.method === "OPTIONS"){
            next();
        }
        try {
            const token = req.headers.authorization.split(' ')[1];
            if(!token){
                return res.status(403).json({code: 0, message:"Unauthorized"});
            }
            const {roles: userRoles} = jwt.verify(token, SECRET_KEY);
            console.log(userRoles);
            let hasRole = false;
            userRoles.forEach(role => {
                if(roles.includes(role)){
                    hasRole = true;
                }
            });
            if(!hasRole){
                return res.status(403).json({code: 0, message:"Access denied"});
            }
            next();
        } catch(e) {
            console.log(e);
            return res.status(403).json({code: 0, message:"Unauthorized"});
        }
    }
}

export default roleMiddleware;