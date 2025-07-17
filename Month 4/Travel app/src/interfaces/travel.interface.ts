export interface Transport {
  id: number;
  post_id: number;
  transport_type: string;
  provider: string;
  cost: number;
  notes?: string;
}

export interface Accommodation {
  id: number;
  post_id: number;
  accommodation_type: 'hotel' | 'hostel' | 'airbnb' | 'guesthouse';
  name: string;
  cost_per_night: number;
  rating: number;
  review?: string;
  notes?: string;
  amenities?: Record<string, any>;
  check_in_date: Date;
  check_out_date: Date;
}

export interface Dining {
  id: number;
  post_id: number;
  restaurant_name: string;
  cuisine_type: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  cost: number;
  rating: number;
  review?: string;
  dishes_tried?: string[];
  notes?: string;
  visit_date: Date;
}

export interface Attraction {
  id: number;
  post_id: number;
  attraction_name: string;
  attraction_type: 'museum' | 'monument' | 'park' | 'beach' | 'temple' | 'market' | 'viewpoint' | 'adventure';
  entry_cost: number;
  rating: number;
  review?: string;
  time_spent_hours: number;
  best_time_to_visit: 'morning' | 'afternoon' | 'evening' | 'night';
  recommended: boolean;
  tips?: string;
  notes?: string;
  visit_date: Date;
  created_at: Date;
}

export interface TripStatus {
  id: number;
  name: string;
  description?: string;
  created_at: Date;
}

export interface TravelPlan {
  id: number;
  creator_id: number;
  location_id: number;
  trip_name: string;
  start_date: Date;
  end_date: Date;
  total_budget: number;
  status_id: number;
  max_participants: number;
  created_at: Date;
  updated_at: Date;
  
  location?: Location;
  status?: TripStatus;
  participants?: TravelParticipant[];
  messages?: Message[];
}

export interface TravelParticipant {
  id: number;
  trip_plan_id: number;
  user_id: number;
  role: 'creator' | 'participant';
  status: 'invited' | 'joined' | 'declined';
  joined_at?: Date;
  created_at: Date;
}

export interface Message {
  id: number;
  trip_plan_id: number;
  sender_id: number;
  message: string;
  attachments?: Record<string, any>;
  created_at: Date;
}

export interface CreateTravelPlanRequest {
  trip_name: string;
  location_id: number;
  start_date: Date;
  end_date: Date;
  total_budget: number;
  max_participants: number;
}

export interface UpdateTravelPlanRequest {
  trip_name?: string;
  location_id?: number;
  start_date?: Date;
  end_date?: Date;
  total_budget?: number;
  max_participants?: number;
  status_id?: number;
}

export interface SendMessageRequest {
  message: string;
  attachments?: Record<string, any>;
}

// interfaces/user.interface.ts
export interface UserProfile {
  id: number;
  name: string;
  role: 'explorer' | 'traveler' | 'admin' | 'super_admin';
  email: string;
  status: 'active' | 'blocked';
  bio?: string;
  travel_preferences?: Record<string, any>;
  profile_picture?: string;
  created_at: Date;
  updated_at: Date;
  posts_count?: number;
  trips_count?: number;
  followers_count?: number;
  following_count?: number;
}

export interface UpdateUserProfileRequest {
  name?: string;
  bio?: string;
  travel_preferences?: Record<string, any>;
  profile_picture?: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export interface ServiceCache {
  id: number;
  location_id: number;
  service_type: 'hotel' | 'transport' | 'restaurant' | 'attractions';
  cached_data: Record<string, any>;
  cached_at: Date;
  expires_at: Date;
  cache_key: string;
}

export interface UserServiceBookmark {
  id: number;
  user_id: number;
  service_name: string;
  service_type: 'hotel' | 'restaurant' | 'transport';
  location_id: number;
  service_details: Record<string, any>;
  external_service_id?: string;
  is_visited: boolean;
  created_at: Date;
}

export interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  type: 'like' | 'save' | 'trip_invite' | 'match_found' | 'wishlist_share';
  metadata?: Record<string, any>;
  is_read: boolean;
  created_at: Date;
}

export interface NotificationFilters {
  type?: 'like' | 'save' | 'trip_invite' | 'match_found' | 'wishlist_share';
  is_read?: boolean;
  from_date?: Date;
  to_date?: Date;
}
