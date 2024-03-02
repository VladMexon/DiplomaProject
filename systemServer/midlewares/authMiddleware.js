import jwt from 'jsonwebtoken';
import {SECRET_KEY} from '../config/index.js';


const authMiddleware = function(req, res, next){
    if(req.method === "OPTIONS"){
        next();
    }
    try {
        const token = req.cookies.Authorization.split(' ')[1];
        if(!token){
            return res.status(403).json({code: 0, message:"Unauthorized"});
        }
        const decodedData = jwt.verify(token, SECRET_KEY);
        req.user = decodedData;
        next();
    } catch(e) {
        console.log(e);
        return res.status(403).json({code: 0, message:"Unauthorized"});
    }
}

export default authMiddleware;