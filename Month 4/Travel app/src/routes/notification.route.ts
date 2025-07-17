import { Router } from 'express';
import { NotificationController } from "../controllers/notification.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { USER_Role } from "../interfaces/user.interface";
import { NotificationValidations } from "../validations/notification.validation";
import validateRequest from "../middlewares/validateRequest";

const router = Router();

const roles = [USER_Role.ADMIN, USER_Role.SUPER_ADMIN, USER_Role.EXPLORER, USER_Role.TRAVELER];

router.get('/user/:userId', authMiddleware(...roles), NotificationController.getNotificationsByUser);
router.get('/:id', authMiddleware(...roles), NotificationController.getNotificationById);
router.post(
    '/',
    validateRequest(NotificationValidations.createNotificationValidation),
    authMiddleware(...roles),
    NotificationController.createNotification
);
router.put(
    '/:id',
    validateRequest(NotificationValidations.updateNotificationValidation),
    authMiddleware(...roles),
    NotificationController.updateNotification
);
router.delete('/:id', authMiddleware(...roles), NotificationController.deleteNotification);
router.patch('/:id/read', authMiddleware(...roles), NotificationController.markAsRead);
router.patch('/user/:userId/read-all', authMiddleware(...roles), NotificationController.markAllAsRead);
router.get('/user/:userId/unread-count', authMiddleware(...roles), NotificationController.getUnreadCount);
router.get('/user/:userId/type/:type', authMiddleware(...roles), NotificationController.getNotificationsByType);
router.get('/user/:userId/recent/:type', authMiddleware(...roles), NotificationController.getRecentByType);
router.delete('/user/:userId/bulk', authMiddleware(...roles), NotificationController.deleteMultiple);
router.delete('/user/:userId/cleanup', authMiddleware(...roles), NotificationController.deleteOldNotifications);
router.get('/user/:userId/stats', authMiddleware(...roles), NotificationController.getStatsByType);

export { router as notificationRoutes };
