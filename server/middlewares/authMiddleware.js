const ApiError = require('../exeptions/apiError');
const tokenService = require('../services/tokenService');

module.exports = function(req, res, next){
    try{
        const authorizationHeader = req.headers.Authorization;
        if(!authorizationHeader){
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData){
            return next(ApiError.UnauthorizedError());
        }
        req.user = userData;
        console.log(userData);
        next();
    } catch(e) {
        return next(ApiError.UnauthorizedError());
    }
}