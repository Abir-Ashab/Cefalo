export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

export enum ReportReason {
  SPAM = 'spam',
  INAPPROPRIATE = 'inappropriate',
  FALSE_INFO = 'false_info',
  OTHER = 'other'
}

export enum ReportStatus {
  PENDING = 'pending',
  RESOLVED = 'resolved'
}

export interface Location {
  id: string;
  name: string;
  country: string;
  region: string;
  latitude: number;
  longitude: number;
  timezone: string;
  created_at: Date;
}

export interface Post {
  id: string;
  user_id: string;
  location_id: string;
  title: string;
  description: string;
  total_cost: number;
  duration_days: number;
  effort_level: number;
  is_featured: boolean;
  status: PostStatus;
  likes_count: number;
  saves_count: number;
  shares_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface Media {
  id: string;
  post_id: string;
  image_url: string;
}

export interface PostLike {
  id: string;
  post_id: string;
  user_id: string;
  created_at: Date;
}

export interface PostSave {
  id: string;
  post_id: string;
  user_id: string;
  created_at: Date;
}

export interface PostShare {
  id: string;
  post_id: string;
  user_id: string;
  platform?: 'facebook' | 'twitter' | 'whatsapp' | 'copy_link';
  created_at: Date;
}

export interface Report {
  id: string;
  reporter_id: string;
  post_id: string;
  reason: ReportReason;
  description?: string;
  status: ReportStatus;
  created_at: Date;
}

export interface CreatePostRequest {
  title: string;
  description: string;
  location_id: string;
  total_cost: number;
  duration_days: number;
  effort_level: number;
  status?: PostStatus;
  media_urls?: string[];
}

export interface UpdatePostRequest {
  title?: string;
  description?: string;
  location_id?: number;
  total_cost?: number;
  duration_days?: number;
  effort_level?: number;
  status?: PostStatus;
  is_featured?: boolean;
}

export interface PostFilters {
  location_id?: string;
  country?: string;
  region?: string;
  min_cost?: number;
  max_cost?: number;
  min_duration?: number;
  max_duration?: number;
  effort_level?: number;
  is_featured?: boolean;
  user_id?: string;
  search?: string;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
  has_next: boolean;
}


export interface PostFilters {
  location?: string;
  tags?: string[];
  status?: PostStatus;
  is_featured?: boolean;
  page?: number;
  limit?: number;
}

export interface Like {
  id: string;
  user_id: string;
  post_id: string;
  created_at: Date;
}

export interface SavedPost {
  id: string;
  user_id: string;
  post_id: string;
  created_at: Date;
}