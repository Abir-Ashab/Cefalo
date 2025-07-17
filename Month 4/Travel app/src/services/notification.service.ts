import { notificationModel } from "../repositories/notification.repository";
import {
  Notification,
  CreateNotificationRequest,
  UpdateNotificationRequest,
  NotificationStats,
  ProximityNotificationPayload
} from "../interfaces/notification.interface";

const getNotificationsByUser = async (
  userId: string, 
  limit: number = 50, 
  offset: number = 0,
  isRead?: boolean
): Promise<Notification[]> => {
  return await notificationModel.findByUserId(userId, limit, offset, isRead);
};

const getNotificationById = async (notificationId: string): Promise<Notification | null> => {
  return await notificationModel.findById(notificationId);
};

const createNotification = async (notificationData: CreateNotificationRequest): Promise<string> => {
  const validTypes = ['like', 'save', 'trip_invite', 'match_found', 'wishlist_share', 'proximity_alert'];
  if (!validTypes.includes(notificationData.type)) {
    throw new Error('Invalid notification type');
  }

  if (!notificationData.user_id || !notificationData.title || !notificationData.message) {
    throw new Error('User ID, title, and message are required');
  }

  if (notificationData.type === 'proximity_alert' && notificationData.metadata) {
    const { location_id, trigger_type } = notificationData.metadata;
    if (location_id && trigger_type) {
      const duplicate = await notificationModel.findDuplicateProximityAlert(
        notificationData.user_id,
        location_id,
        trigger_type,
        24 
      );
      
      if (duplicate) {
        throw new Error('Duplicate proximity alert detected. Please wait before sending another alert for this location.');
      }
    }
  }

  return await notificationModel.create(notificationData);
};

const updateNotification = async (
  notificationId: string,
  userId: string,
  updateData: UpdateNotificationRequest
): Promise<Notification | null> => {

  const notification = await notificationModel.findById(notificationId);
  if (!notification || notification.user_id !== userId) {
    return null;
  }
  if (updateData.type) {
    const validTypes = ['like', 'save', 'trip_invite', 'match_found', 'wishlist_share', 'proximity_alert'];
    if (!validTypes.includes(updateData.type)) {
      throw new Error('Invalid notification type');
    }
  }

  await notificationModel.update(notificationId, userId, updateData);
  return await notificationModel.findById(notificationId);
};

const deleteNotification = async (notificationId: string, userId: string): Promise<boolean> => {
  return await notificationModel.delete(notificationId, userId);
};

const markAsRead = async (notificationId: string, userId: string): Promise<boolean> => {
  return await notificationModel.markAsRead(notificationId, userId);
};

const markAllAsRead = async (userId: string): Promise<number> => {
  return await notificationModel.markAllAsRead(userId);
};

const getUnreadCount = async (userId: string): Promise<number> => {
  return await notificationModel.getUnreadCount(userId);
};

const getNotificationsByType = async (
  userId: string, 
  type: string, 
  limit: number = 20
): Promise<Notification[]> => {
  const validTypes = ['like', 'save', 'trip_invite', 'match_found', 'wishlist_share', 'proximity_alert'];
  if (!validTypes.includes(type)) {
    throw new Error('Invalid notification type');
  }

  return await notificationModel.findByType(userId, type, limit);
};

const getRecentByType = async (
  userId: string, 
  type: string, 
  hours: number = 24
): Promise<Notification[]> => {
  const validTypes = ['like', 'save', 'trip_invite', 'match_found', 'wishlist_share', 'proximity_alert'];
  if (!validTypes.includes(type)) {
    throw new Error('Invalid notification type');
  }

  if (hours <= 0 || hours > 8760) { 
    throw new Error('Hours must be between 1 and 8760 (1 year)');
  }

  return await notificationModel.getRecentByType(userId, type, hours);
};

const deleteMultiple = async (ids: string[], userId: string): Promise<number> => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error('Please provide an array of notification IDs');
  }

  if (ids.length > 100) {
    throw new Error('Cannot delete more than 100 notifications at once');
  }

  return await notificationModel.deleteMultiple(ids, userId);
};

const deleteOldNotifications = async (userId: string, daysOld: number = 30): Promise<number> => {
  if (daysOld <= 0 || daysOld > 365) {
    throw new Error('Days must be between 1 and 365');
  }

  return await notificationModel.deleteOldNotifications(userId, daysOld);
};

const getStatsByType = async (userId: string): Promise<NotificationStats[]> => {
  return await notificationModel.getStatsByType(userId);
};

const createProximityNotification = async (payload: ProximityNotificationPayload): Promise<string> => {
  if (!payload.metadata?.location_id || !payload.metadata?.trigger_type) {
    throw new Error('Location ID and trigger type are required for proximity notifications');
  }

  if (!payload.metadata?.location_name || !payload.metadata?.distance_km) {
    throw new Error('Location name and distance are required for proximity notifications');
  }
  const duplicate = await notificationModel.findDuplicateProximityAlert(
    payload.user_id,
    payload.metadata.location_id,
    payload.metadata.trigger_type,
    24
  );

  if (duplicate) {
    throw new Error('Duplicate proximity alert detected. Please wait before sending another alert for this location.');
  }

  return await createNotification(payload);
};

const checkDuplicateProximityAlert = async (
  userId: string,
  locationId: string,
  triggerType: string,
  hoursBack: number = 24
): Promise<Notification | null> => {
  return await notificationModel.findDuplicateProximityAlert(userId, locationId, triggerType, hoursBack);
};

export const NotificationService = {
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
  createProximityNotification,
  checkDuplicateProximityAlert,
};