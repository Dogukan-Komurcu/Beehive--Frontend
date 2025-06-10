// Backend API servisleri
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

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
    return this.request<any[]>('/api/hives');
  }

  async getHiveById(id: number) {
    return this.request<any>(`/api/hives/${id}`);
  }

  async createHive(hiveData: Omit<any, 'id'>) {
    return this.request<any>('/api/hives', {
      method: 'POST',
      body: JSON.stringify(hiveData),
    });
  }

  async updateHive(id: number, hiveData: Partial<any>) {
    return this.request<any>(`/api/hives/${id}`, {
      method: 'PUT',
      body: JSON.stringify(hiveData),
    });
  }

  async deleteHive(id: number) {
    return this.request<void>(`/api/hives/${id}`, {
      method: 'DELETE',
    });
  }

  async getMyHives() {
    return this.request<any[]>('/api/hives/my');
  }

  // Hive Alert endpoints (HiveAlertController)
  async getAlerts() {
    return this.request<any[]>('/api/hive-alerts');
  }

  async getMyAlerts() {
    return this.request<any[]>('/api/hive-alerts/my-alerts');
  }

  async markAlertAsRead(id: number) {
    return this.request<void>(`/api/hive-alerts/${id}/read`, {
      method: 'PUT',
    });
  }

  async deleteAlert(id: number) {
    const token = localStorage.getItem('authToken');
    const config: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };
    const response = await fetch(`${this.baseUrl}/api/hive-alerts/${id}`, config);
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: 'Network error' };
      }
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    // 204 No Content ise body yok, hata vermemesi için burada bitiriyoruz
    return;
  }

  async createAlert(alert: any) {
    return this.request<any>('/api/hive-alerts', {
      method: 'POST',
      body: JSON.stringify(alert),
    });
  }

  // Sensor data endpoints
  async getSensorData(hiveId: number, startDate?: string, endDate?: string) {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    return this.request<any[]>(`/api/hives/${hiveId}/sensor-data?${params.toString()}`);
  }

  // Add sensor data for a hive
  async addSensorData(hiveId: number, data: { temperature: number; humidity: number; battery: number; timestamp?: string }) {
    return this.request<any>(`/api/hives/${hiveId}/sensor-data`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Dashboard endpoints (Backend'e uygun)
  async getDashboardData() {
    return this.request<any>('/api/dashboard');
  }

  async getTotalUsers() {
    return this.request<number>('/api/dashboard/stats/total-users');
  }

  async getTotalHives() {
    return this.request<number>('/api/dashboard/stats/total-hives');
  }

  async getUsedHives() {
    return this.request<number>('/api/dashboard/stats/used-hives');
  }

  async getDailyHives(start: string, end: string) {
    return this.request<number>(`/api/dashboard/stats/daily-hives?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`);
  }

  async getDailyColonies(start: string, end: string) {
    return this.request<number>(`/api/dashboard/stats/daily-colonies?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`);
  }

  // Analytics endpoints (Backend'e uygun)
  async getTimeSeries(kovanId: number, range: string) {
    return this.request<any[]>(`/api/analytics/timeseries?kovanId=${kovanId}&range=${encodeURIComponent(range)}`);
  }

  async getSummary(kovanId: number, range: string) {
    return this.request<any>(`/api/analytics/summary?kovanId=${kovanId}&range=${encodeURIComponent(range)}`);
  }
}

export const apiService = new ApiService();
