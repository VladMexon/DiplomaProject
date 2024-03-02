import {Router} from "express";
import employeeController from "../controllers/employeeController.js";
import authMiddleware from "../midlewares/authMiddleware.js";
import roleMiddleware from "../midlewares/roleMiddleware.js";

const router = new Router();

router.post('/employee', authMiddleware,employeeController.newEmplyee); //метод для получения инфы аторизованным пользователем о себе
router.get('/employee', authMiddleware, employeeController.getEmplyee);

export default router;

