export type UserRole = 'client' | 'professional' | 'admin' | 'premium';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  emailVerified?: boolean;
  phoneNumber?: string;
  bio?: string;
  experienceYears?: number;
  credentials?: string[];
  professions?: string[];
  rating?: number;
  reviewCount?: number;
  is_premium?: boolean;
  premium_status?: 'none' | 'pending' | 'active' | 'cancelling';
  tax_status?: 'con_iva' | 'sin_iva';
  payment_proof_url?: string;
  last_payment_date?: number;
  is_blocked?: boolean;
  wallet_balance?: number;
  client_points?: number;
  extra_garantias?: number;
  cancel_at?: any;
  twoFactorEnabled?: boolean;
  basePrice?: number;
  price?: string;
  recharge_request?: {
    amount: number;
    screenshot: string;
    timestamp: number;
    status: 'PENDING_ADMIN_APPROVAL' | 'SUCCESSFUL' | 'REJECTED';
    rejection_reason?: string;
  };
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
}

export type JobStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';

export interface JobRequest {
  id: string;
  clientId: string;
  professionalId?: string;
  category: string;
  description: string;
  photoBefore?: string;
  photoAfter?: string;
  status: JobStatus;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  createdAt: number;
  updatedAt: number;
  price?: number;
}

export interface Message {
  id: string;
  jobId: string;
  senderId: string;
  text?: string;
  imageUrl?: string;
  createdAt: number;
}

export interface Review {
  id: string;
  jobId: string;
  fromId: string;
  toId: string;
  rating: number;
  comment: string;
  createdAt: number;
}
