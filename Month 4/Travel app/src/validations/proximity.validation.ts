import { z } from 'zod';
const triggerTypes = z.enum(['wishlist_location', 'trip_participant', 'featured_post', 'attraction', 'accommodation', 'dining']);

const createProximitySettingsValidation = z.object({
  body: z.object({
    user_id: z.string().uuid("Invalid user ID"),
    proximity_radius_km: z.number().min(0.1).max(100, "Radius must be between 0.1 and 100 km").optional(),
    enable_wishlist_alerts: z.boolean().optional(),
    enable_trip_participant_alerts: z.boolean().optional(),
    enable_featured_post_alerts: z.boolean().optional(),
    enable_attraction_alerts: z.boolean().optional(),
    enable_accommodation_alerts: z.boolean().optional(),
    enable_dining_alerts: z.boolean().optional(),
  }),
});

const updateLocationValidation2 = z.object({
  body: z.object({
    user_id: z.string().uuid("Invalid user ID"),
    latitude: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
    longitude: z.number().min(-180).max(180, "Longitude must be between -180 and 180"),
  }),
});

const getProximityAlertsValidation = z.object({
  query: z.object({
    trigger_type: triggerTypes.optional(),
    limit: z.number().int().positive().max(100).optional().default(10),
    offset: z.number().int().min(0).optional().default(0),
  }),
});

export const ProximityValidations = {
  createProximitySettingsValidation,
  updateLocationValidation: updateLocationValidation2,
  getProximityAlertsValidation,
};