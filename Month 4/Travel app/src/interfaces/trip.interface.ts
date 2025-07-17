export interface TripStatus {
  id: string;
  name: 'planning' | 'confirmed' | 'ongoing' | 'completed' | 'cancelled';
  description?: string;
  created_at?: Date;
}

export interface TravelPlan {
  id: string;
  creator_id: string;
  location_id: string;
  trip_name: string;
  start_date: Date;
  end_date: Date;
  total_budget: number;
  status_id: string;
  max_participants: number;
  created_at?: Date;
  updated_at?: Date;
  creator_name?: string;
  location_name?: string;
  status_name?: string;
  participants_count?: number;
  user_role?: 'creator' | 'participant';
  user_status?: 'invited' | 'joined' | 'declined';
}

export interface TravelParticipant {
  id: string;
  trip_plan_id: string;
  user_id: string;
  role: 'creator' | 'participant';
  status: 'invited' | 'joined' | 'declined';
  joined_at?: Date;
  created_at?: Date;
  user_name?: string;
  user_email?: string;
  profile_picture?: string;
}

export interface Message {
  id: string;
  trip_plan_id: string;
  sender_id: string;
  message: string;
  attachments?: any[];
  created_at?: Date;
  sender_name?: string;
  sender_profile_picture?: string;
}

export interface CreateTripRequest {
  location_id: string;
  trip_name: string;
  start_date: string;
  end_date: string;
  total_budget: number;
  max_participants: number;
}

export interface UpdateTripRequest {
  trip_name?: string;
  start_date?: string;
  end_date?: string;
  total_budget?: number;
  max_participants?: number;
  status_id?: string;
}

export interface InviteParticipantsRequest {
  user_ids: string[];
}

export interface UpdateParticipantStatusRequest {
  status: 'joined' | 'declined';
}

export interface SendMessageRequest {
  message: string;
  attachments?: any[];
}

export interface TripListResponse {
  trips: TravelPlan[];
  total: number;
  page: number;
  limit: number;
}

export interface TripDetailsResponse extends TravelPlan {
  participants: TravelParticipant[];
  recent_messages?: Message[];
}

export interface InviteResponse {
  id: string;
  trip_name: string;
  creator_name: string;
  location_name: string;
  start_date: Date;
  end_date: Date;
  status: 'invited' | 'joined' | 'declined';
  created_at: Date;
}