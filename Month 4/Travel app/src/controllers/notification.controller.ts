import { Request, Response } from 'express';
import { NotificationService } from "../services/notification.service";
import { CreateNotificationRequest, UpdateNotificationRequest } from "../interfaces/notification.interface";
import { catchAsync } from '../utils/catchAsync.util';

const getNotificationsByUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { limit = 50, offset = 0, isRead } = req.query;
  
  const parsedLimit = parseInt(limit as string);
  const parsedOffset = parseInt(offset as string);
  const parsedIsRead = isRead === 'true' ? true : isRead === 'false' ? false : undefined;

  const notifications = await NotificationService.getNotificationsByUser(
    userId, 
    parsedLimit, 
    parsedOffset, 
    parsedIsRead
  );

  res.json({
    success: true,
    data: notifications
  });
});

const getNotificationById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const notification = await NotificationService.getNotificationById(id);

  if (!notification) {
    return res.status(404).json({
      success: false,
      message: 'Notification not found'
    });
  }

  res.json({
    success: true,
    data: notification
  });
});

const createNotification = catchAsync(async (req: Request, res: Response) => {
  const notificationData: CreateNotificationRequest = req.body;

  const notificationId = await NotificationService.createNotification(notificationData);

  res.status(201).json({
    success: true,
    data: { id: notificationId },
    message: 'Notification created successfully'
  });
});

const updateNotification = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData: UpdateNotificationRequest = req.body;
  const userId = req.body.user_id;

  const notification = await NotificationService.updateNotification(id, userId, updateData);

  if (!notification) {
    return res.status(404).json({
      success: false,
      message: 'Notification not found or unauthorized'
    });
  }

  res.json({
    success: true,
    data: notification,
    message: 'Notification updated successfully'
  });
});

const deleteNotification = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.body.user_id;

  const success = await NotificationService.deleteNotification(id, userId);

  if (!success) {
    return res.status(404).json({
      success: false,
      message: 'Notification not found or unauthorized'
    });
  }

  res.json({
    success: true,
    message: 'Notification deleted successfully'
  });
});

const markAsRead = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.body.user_id;

  const success = await NotificationService.markAsRead(id, userId);

  if (!success) {
    return res.status(404).json({
      success: false,
      message: 'Notification not found or unauthorized'
    });
  }

  res.json({
    success: true,
    message: 'Notification marked as read'
  });
});

const markAllAsRead = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const updatedCount = await NotificationService.markAllAsRead(userId);

  res.json({
    success: true,
    data: { updatedCount },
    message: `${updatedCount} notifications marked as read`
  });
});

const getUnreadCount = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const count = await NotificationService.getUnreadCount(userId);

  res.json({
    success: true,
    data: { count }
  });
});

const getNotificationsByType = catchAsync(async (req: Request, res: Response) => {
  const { userId, type } = req.params;
  const { limit = 20 } = req.query;

  const parsedLimit = parseInt(limit as string);
  const notifications = await NotificationService.getNotificationsByType(userId, type, parsedLimit);

  res.json({
    success: true,
    data: notifications
  });
});

const getRecentByType = catchAsync(async (req: Request, res: Response) => {
  const { userId, type } = req.params;
  const { hours = 24 } = req.query;

  const parsedHours = parseInt(hours as string);
  const notifications = await NotificationService.getRecentByType(userId, type, parsedHours);

  res.json({
    success: true,
    data: notifications
  });
});

const deleteMultiple = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Please provide an array of notification IDs'
    });
  }

  const deletedCount = await NotificationService.deleteMultiple(ids, userId);

  res.json({
    success: true,
    data: { deletedCount },
    message: `${deletedCount} notifications deleted successfully`
  });
});

const deleteOldNotifications = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { daysOld = 30 } = req.query;

  const parsedDaysOld = parseInt(daysOld as string);
  const deletedCount = await NotificationService.deleteOldNotifications(userId, parsedDaysOld);

  res.json({
    success: true,
    data: { deletedCount },
    message: `${deletedCount} old notifications deleted successfully`
  });
});

const getStatsByType = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const stats = await NotificationService.getStatsByType(userId);

  res.json({
    success: true,
    data: stats
  });
});

export const NotificationController = {
  getNotificationsByUser,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  getNotificationsByType,
  getRecentByType,
  deleteMultiple,
  deleteOldNotifications,
  getStatsByType,
};