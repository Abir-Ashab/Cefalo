export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'like' | 'save' | 'trip_invite' | 'match_found' | 'wishlist_share' | 'proximity_alert';
  metadata?: Record<string, any>;
  is_read: boolean;
  created_at: Date;
}

export interface CreateNotificationRequest {
  user_id: string;
  title: string;
  message: string;
  type: 'like' | 'save' | 'trip_invite' | 'match_found' | 'wishlist_share' | 'proximity_alert';
  metadata?: Record<string, any>;
}

export interface UpdateNotificationRequest {
  title?: string;
  message?: string;
  type?: 'like' | 'save' | 'trip_invite' | 'match_found' | 'wishlist_share' | 'proximity_alert';
  metadata?: Record<string, any>;
  is_read?: boolean;
}

export interface NotificationStats {
  type: string;
  count: number;
  unread_count: number;
}

export interface ProximityNotificationPayload {
  user_id: string;
  title: string;
  message: string;
  type: 'proximity_alert';
  metadata: {
    trigger_type: 'wishlist_location' | 'trip_participant' | 'featured_post';
    location_id: string;
    location_name: string;
    distance_km: number;
    target_user_id?: string;
  };
}