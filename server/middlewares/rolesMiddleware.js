const ApiError = require('../exeptions/apiError');

module.exports = function (req, res, next) {
    if(!req.uesrData.roles.contains(req.requiredRole)){
        return next(ApiError.AccessDenied());
    }else{
        next();
    }
}