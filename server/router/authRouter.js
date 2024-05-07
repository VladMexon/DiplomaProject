const Router = require('express').Router;
const authController = require('../controllers/authController');
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const rolesMiddleware = require('../middlewares/rolesMiddleware');

const router = new Router();


router.post('/login', 
    body('login').isLength({min: 3, max: 50}),
    body('login').isLength({min: 3, max: 50}), 
    authController.login
)
router.post('/register', authMiddleware, (req, res, next)=> {res.locals.requiredRoles = ["register", "admin"]; next()}, rolesMiddleware, authController.register)
router.get('/logout', authController.logout)
router.get('/refresh', authController.refresh)
router.post('/getUsersData', authMiddleware, (req, res, next)=> {res.locals.requiredRoles = ["register", "admin"]; next()}, rolesMiddleware, authController.getUsersData);
router.post('/updateRecipientsInfo', authMiddleware, (req, res, next)=> {res.locals.requiredRoles = ["register", "admin"]; next()}, rolesMiddleware, authController.updateRecipientsInfo);
//router.get('/user', authMiddleware, authController.user)

module.exports = router;