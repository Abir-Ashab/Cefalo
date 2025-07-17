export interface Wishlist {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  grouping_type: 'region' | 'theme' | 'budget' | 'season';
  is_public: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface WishlistItem {
  id: string;
  wishlist_id: string;
  location_id: string;
  notes?: string;
  estimated_budget?: number;
  priority_level: number;
  preferred_start_date?: Date;
  preferred_end_date?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface WishlistWithItems extends Wishlist {
  items: WishlistItemWithLocation[];
}

export interface WishlistItemWithLocation extends WishlistItem {
  location: {
    id: string;
    name: string;
    country: string;
    region: string;
    latitude: number;
    longitude: number;
    timezone: string;
    geom?: string;
  };
}


export interface CreateWishlistRequest {
  name: string;
  description?: string;
  grouping_type: 'region' | 'theme' | 'budget' | 'season';
  is_public?: boolean;
}

export interface UpdateWishlistRequest {
  name?: string | null;
  description?: string | null;
  grouping_type?: 'region' | 'theme' | 'budget' | 'season' | null;
  is_public?: boolean | null;
}

export interface CreateWishlistItemRequest {
  location_id?: string;
  location?: {
    name: string;
    country: string;
    region: string;
    latitude: number;
    longitude: number;
    timezone?: string;
  };
  notes?: string;
  estimated_budget?: number | null;
  priority_level: number | null;
  preferred_start_date?: string | null;
  preferred_end_date?: string | null;
}

export interface UpdateWishlistItemRequest {
  notes?: string | null;
  estimated_budget?: number | null;
  priority_level?: number | null;
  preferred_start_date?: string | null;
  preferred_end_date?: string | null;
}

export interface WishlistFilters {
  grouping_type?: 'region' | 'theme' | 'budget' | 'season' | null;
  is_public?: boolean | null;
  search?: string | null;
  limit?: number | null;
  offset?: number | null;
}

export interface WishlistShareResponse {
  share_url: string;
  wishlist: WishlistWithItems;
}

export interface WishlistResponse {
  success: boolean;
  data?: Wishlist | WishlistWithItems | Wishlist[] | WishlistShareResponse;
  message?: string;
  error?: string;
}