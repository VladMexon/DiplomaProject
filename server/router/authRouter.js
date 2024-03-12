const Router = require('express').Router;
const authController = require('../controllers/authController');
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');

const router = new Router();


router.post('/login', 
    body('login').isLength({min: 3, max: 50}),
    body('login').isLength({min: 3, max: 50}), 
    authController.login
)
router.post('/register', authController.register)
router.get('/logout', authController.logout)
router.get('/refresh', authController.refresh)
//router.get('/user', authMiddleware, authController.user)

module.exports = router;