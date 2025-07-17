export interface Accommodation {
  id: string;
  post_id: string;
  accommodation_type: 'hotel' | 'hostel' | 'airbnb' | 'guesthouse';
  name: string;
  cost_per_night: number;
  rating: number;
  review?: string;
  notes?: string;
  amenities?: string[];
  check_in_date: Date;
  check_out_date: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateAccommodationRequest {
  accommodation_type: 'hotel' | 'hostel' | 'airbnb' | 'guesthouse';
  name: string;
  cost_per_night: number;
  rating: number;
  review?: string;
  notes?: string;
  amenities?: string[];
  check_in_date: string;
  check_out_date: string;
}

export interface UpdateAccommodationRequest {
  accommodation_type?: 'hotel' | 'hostel' | 'airbnb' | 'guesthouse';
  name?: string;
  cost_per_night?: number;
  rating?: number;
  review?: string;
  notes?: string;
  amenities?: string[];
  check_in_date?: string;
  check_out_date?: string;
}