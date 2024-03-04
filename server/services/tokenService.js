const jwt = require('jsonwebtoken');
const dbService = require('./dbService');


class TokenService{
    generateToken(payload){
        const jwtExpires = process.env.JWT_TOKEN_EXPIRES + 'm';
        const refreshExpires = process.env.REFRESH_TOKEN_EXPIRES  + 'd';
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn:  jwtExpires});
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, { expiresIn: refreshExpires}); 
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token){
        try{
            const userData = jwt.verify(token, process.env.JWT_SECRET_KEY);
            return userData;
        }catch(e){
            return null;
        }
    }

    validateRefreshToken(token){
        try{
            const userData = jwt.verify(token, process.env.REFRESH_SECRET_KEY);
            return userData;
        }catch(e){
            return null;
        }
    }
    
    async saveToken(refresh_token, id_employee){
        return dbService.setRefreshToken(refresh_token, id_employee).then(() => {
            return {result : 'ok'};
        }).catch(() => {
            return {result : 'not ok'};
        })
    }
}

module.exports = new TokenService();