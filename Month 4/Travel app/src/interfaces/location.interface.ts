export interface Location {
  id: string;
  name: string;
  country: string;
  region: string;
  latitude: number;
  longitude: number;
  timezone: string;
  created_at?: Date;
}

export interface CreateLocationRequest {
  name: string;
  country: string;
  region: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface UpdateLocationRequest {
  name?: string;
  country?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
}