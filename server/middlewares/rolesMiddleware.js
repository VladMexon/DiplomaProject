const ApiError = require('../exeptions/apiError');

module.exports = function (req, res, next) {
    //console.log(res.locals.user.roles);
    let access = false;
    res.locals.requiredRoles.forEach(requiredRole => {
        if(res.locals.user.roles.includes(requiredRole)){
            access = true;
        }
    });
    if(access){
        next();
    }else{
        next(ApiError.AccessDenied());
    }
    
}