import { z } from 'zod';
const notificationTypes = z.enum(['like', 'save', 'trip_invite', 'match_found', 'wishlist_share', 'proximity_alert']);

const createNotificationValidation = z.object({
  body: z.object({
    user_id: z.string().min(1, "User ID is required"),
    title: z.string().min(1, "Title is required"),
    message: z.string().min(1, "Message is required"),
    type: notificationTypes,
    metadata: z.record(z.any()).optional(),
  }),
});

const updateNotificationValidation = z.object({
  body: z.object({
    user_id: z.string().min(1, "User ID is required").optional(),
    title: z.string().min(1, "Title is required").optional(),
    message: z.string().min(1, "Message is required").optional(),
    type: notificationTypes.optional(),
    metadata: z.record(z.any()).optional(),
    is_read: z.boolean().optional(),
  }),
});

export const NotificationValidations = {
  createNotificationValidation,
  updateNotificationValidation,
};