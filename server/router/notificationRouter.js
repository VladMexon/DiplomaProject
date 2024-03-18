const Router = require('express').Router;
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const notificationController = require('../controllers/notificationController');

const router = new Router();

router.get('/types', authMiddleware, notificationController.getNotificationTypes);
router.get('/recipients', authMiddleware, notificationController.getRecipients);
router.get('/positions', authMiddleware, notificationController.getPositions);
router.get('/departments', authMiddleware, notificationController.getDepartments);
router.post('/get', authMiddleware, notificationController.getNotifications);
router.post('/getNew', authMiddleware, notificationController.getNewNotifications);
router.post('/send', authMiddleware, notificationController.sendNotification);

module.exports = router;