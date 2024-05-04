const Router = require('express').Router;
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const notificationController = require('../controllers/notificationController');

const router = new Router();

router.get('/types', authMiddleware, notificationController.getNotificationTypes);
router.get('/recipients', authMiddleware, notificationController.getRecipients);
router.get('/positions', authMiddleware, notificationController.getPositions);
router.get('/departments', authMiddleware, notificationController.getDepartments);
router.get('/lastId', authMiddleware, notificationController.getLastId);
router.post('/get', authMiddleware, notificationController.getNotifications);
router.post('/getNew', authMiddleware, notificationController.getNewNotifications);
router.post('/send', authMiddleware, notificationController.sendNotification);
router.post('/react', authMiddleware, notificationController.react);
router.get('/unreactedCount', authMiddleware, notificationController.getUnreactedCount);
router.post('/getSendedNotifications', authMiddleware, notificationController.getSendedNotifications);
router.post('/getComments', authMiddleware, notificationController.getComments);
router.post('/getCommentsCount', authMiddleware, notificationController.getCommentsCount);
router.post('/newComment', authMiddleware, notificationController.newComment);
router.post('/getNewComments', authMiddleware, notificationController.getNewComments);
router.post('/updateSended', authMiddleware, notificationController.getSendedNotificationsBySenderIds);

module.exports = router;

