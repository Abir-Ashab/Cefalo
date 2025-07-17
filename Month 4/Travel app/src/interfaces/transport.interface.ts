export interface Transport {
  id: string;
  post_id: string;
  transport_type: string;
  provider: string;
  cost: number;
  notes?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateTransportRequest {
  transport_type: string;
  provider: string;
  cost: number;
  notes?: string;
}

export interface UpdateTransportRequest {
  transport_type?: string;
  provider?: string;
  cost?: number;
  notes?: string;
}