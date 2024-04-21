const ApiError = require('../exeptions/apiError');

module.exports = function (req, res, next) {
    console.log(res.locals.user.roles);
    if(!res.locals.user.roles.includes(res.locals.requiredRole)){
        next(ApiError.AccessDenied());
    }else{
        next();
    }
}