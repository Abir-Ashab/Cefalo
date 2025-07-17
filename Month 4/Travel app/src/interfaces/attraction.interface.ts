export interface Attraction {
  id: string;
  post_id: string;
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
  updated_at?: Date;
}

export interface CreateAttractionRequest {
  attraction_name: string;
  attraction_type: 'museum' | 'monument' | 'park' | 'beach' | 'temple' | 'market' | 'viewpoint' | 'adventure';
  entry_cost: number;
  rating: number;
  review?: string;
  time_spent_hours: number;
  best_time_to_visit: 'morning' | 'afternoon' | 'evening' | 'night';
  recommended?: boolean;
  tips?: string;
  notes?: string;
  visit_date: string;
}

export interface UpdateAttractionRequest {
  attraction_name?: string;
  attraction_type?: 'museum' | 'monument' | 'park' | 'beach' | 'temple' | 'market' | 'viewpoint' | 'adventure';
  entry_cost?: number;
  rating?: number;
  review?: string;
  time_spent_hours?: number;
  best_time_to_visit?: 'morning' | 'afternoon' | 'evening' | 'night';
  recommended?: boolean;
  tips?: string;
  notes?: string;
  visit_date?: string;
}
