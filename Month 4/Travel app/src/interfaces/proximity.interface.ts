import { Location } from "./location.interface";
export interface ProximityAlert {
  id: string;
  user_id: string;
  target_user_id?: string;
  location_id: string;
  trigger_type: 'wishlist_location' | 'trip_participant' | 'featured_post' | 'attraction' | 'accommodation'| 'dining';
  distance_km: number;
  created_at: Date;
  updated_at: Date;
}

export interface ProximitySettings {
  id: string;
  user_id: string;
  proximity_radius_km: number;
  enable_wishlist_alerts: boolean;
  enable_trip_participant_alerts: boolean;
  enable_featured_post_alerts: boolean;
  enable_attraction_alerts: boolean;
  enable_accommodation_alerts: boolean;
  enable_dining_alerts: boolean;
}

export interface UserLocation {
  user_id: string;
  latitude: number;
  longitude: number;
  updated_at: Date;
}

export interface ProximityMatch {
  id: string;
  user_id: string;
  target_user_id?: string;
  location_id: string;
  location_name: string;
  distance_km: number;
  trigger_type: string;
  created_at: Date;
}

export interface CreateProximitySettingsRequest {
  proximity_radius_km?: number;
  enable_wishlist_alerts?: boolean;
  enable_trip_participant_alerts?: boolean;
  enable_featured_post_alerts?: boolean;
  enable_attraction_alerts?: boolean;
  enable_accommodation_alerts?: boolean;
  enable_dining_alerts?: boolean;
}

export interface UpdateLocationRequest {
  latitude: number;
  longitude: number;
}

export interface ProximityNotificationPayload {
  user_id: string;
  title: string;
  message: string;
  type: 'proximity_alert';
  metadata: {
    trigger_type: string;
    location_id: string;
    location_name: string;
    distance_km: number;
    target_user_id?: string;
  };
}

export interface GetProximityAlertsRequest {
  trigger_type?: 'wishlist_location' | 'trip_participant' | 'featured_post' | 'attraction' | 'accommodation'| 'dining';
  limit?: number;
  offset?: number;
}

export interface ProximityLogEntry {
  id: string;
  user_id: string;
  location_id: string;
  created_at: Date;
}

export interface NearbyItem {
  id: string;
  name: string;
  type: string;
  distance_km: number;
  location: {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
  };
  metadata?: any;
}

  export interface WishlistLocation {
    id: string;
    name: string;
    location: Location;
    distance_km: number;
  }