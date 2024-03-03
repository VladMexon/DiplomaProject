import {Router} from "express";
import employeeController from "../controllers/employeeController.js";
import authMiddleware from "../midlewares/authMiddleware.js";
import roleMiddleware from "../midlewares/roleMiddleware.js";

const router = new Router();

router.get('/employees', authMiddleware, employeeController.getEmplyees);

export default router;

