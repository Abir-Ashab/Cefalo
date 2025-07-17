export interface Dining {
  id: string;
  post_id: string;
  restaurant_name: string;
  cuisine_type: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  cost: number;
  rating: number;
  review?: string;
  dishes_tried?: string[];
  notes?: string;
  visit_date: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateDiningRequest {
  restaurant_name: string;
  cuisine_type: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  cost: number;
  rating: number;
  review?: string;
  dishes_tried?: string[];
  notes?: string;
  visit_date: string;
}

export interface UpdateDiningRequest {
  restaurant_name?: string;
  cuisine_type?: string;
  meal_type?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  cost?: number;
  rating?: number;
  review?: string;
  dishes_tried?: string[];
  notes?: string;
  visit_date?: string;
}
