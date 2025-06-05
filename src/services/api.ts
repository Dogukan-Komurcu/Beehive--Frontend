
// Backend API servisleri
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem('authToken');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async login(credentials: { email: string; password: string }) {
    return this.request<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: { name: string; email: string; password: string }) {
    return this.request<{ user: any; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async loginAsDemo() {
    return this.request<{ user: any; token: string }>('/auth/demo-login', {
      method: 'POST',
    });
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.request<{ token: string }>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }

  // User endpoints
  async getUsers() {
    return this.request<any[]>('/users');
  }

  async getUserById(id: string) {
    return this.request<any>(`/users/${id}`);
  }

  async updateUser(id: string, userData: Partial<any>) {
    return this.request<any>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: string) {
    return this.request<void>(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Hive endpoints
  async getHives() {
    return this.request<any[]>('/hives');
  }

  async getHiveById(id: number) {
    return this.request<any>(`/hives/${id}`);
  }

  async createHive(hiveData: Omit<any, 'id'>) {
    return this.request<any>('/hives', {
      method: 'POST',
      body: JSON.stringify(hiveData),
    });
  }

  async updateHive(id: number, hiveData: Partial<any>) {
    return this.request<any>(`/hives/${id}`, {
      method: 'PUT',
      body: JSON.stringify(hiveData),
    });
  }

  async deleteHive(id: number) {
    return this.request<void>(`/hives/${id}`, {
      method: 'DELETE',
    });
  }

  // Alert endpoints
  async getAlerts() {
    return this.request<any[]>('/alerts');
  }

  async markAlertAsRead(id: number) {
    return this.request<any>(`/alerts/${id}/read`, {
      method: 'PUT',
    });
  }

  async deleteAlert(id: number) {
    return this.request<void>(`/alerts/${id}`, {
      method: 'DELETE',
    });
  }

  // Sensor data endpoints
  async getSensorData(hiveId: number, startDate?: string, endDate?: string) {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    return this.request<any[]>(`/hives/${hiveId}/sensor-data?${params.toString()}`);
  }

  // Dashboard endpoints
  async getDashboardStats() {
    return this.request<any>('/dashboard/stats');
  }

  async getRecentHives(limit: number = 10) {
    return this.request<any[]>(`/dashboard/recent-hives?limit=${limit}`);
  }

  async getRecentAlerts(limit: number = 10) {
    return this.request<any[]>(`/dashboard/recent-alerts?limit=${limit}`);
  }

  // Analytics endpoints
  async getAnalyticsData(type: string, period: string) {
    return this.request<any>(`/analytics/${type}?period=${period}`);
  }

  // Reports endpoints
  async generateReport(type: string, filters: any) {
    return this.request<Blob>('/reports/generate', {
      method: 'POST',
      body: JSON.stringify({ type, filters }),
    });
  }
}

export const apiService = new ApiService();
