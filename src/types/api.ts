
// Backend API için veri tipleri
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'observer' | 'demo';
  avatar?: string;
  isDemo?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Hive {
  id: number;
  name: string;
  location: string;
  coordinates: string;
  status: 'active' | 'warning' | 'offline';
  temperature: number;
  humidity: number;
  battery: number;
  lastUpdate: string;
  installDate: string;
  beeCount: number;
  userId?: string;
}

export interface Alert {
  id: number;
  hiveId: number;
  hiveName: string;
  message: string;
  type: 'warning' | 'error' | 'info';
  timestamp: string;
  isRead: boolean;
  userId?: string;
}

export interface SensorData {
  id: number;
  hiveId: number;
  temperature: number;
  humidity: number;
  battery: number;
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface DashboardStats {
  totalHives: number;
  activeHives: number;
  alertCount: number;
  offlineHives: number;
}
