import Router from "express";
import authController from "../controllers/authController.js";
import {check} from "express-validator";
import authMiddleware from "../midlewares/authMiddleware.js";
import roleMiddleware from "../midlewares/roleMiddleware.js";

const router = new Router();

router.post('/register', [
    check('username', "username shouldn't be empty").notEmpty(),
    check('password', "password must be more than 4 and less than 20 symbols").isLength({min: 4, max: 20})
], authController.register);
router.post('/login', authController.login);
router.get('/user', authMiddleware, authController.getUser);

export default router;

