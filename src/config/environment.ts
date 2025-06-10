// Environment configuration for backend integration
export const config = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  APP_NAME: 'Akıllı Kovanı',
  APP_VERSION: '2.0',
  DEMO_SESSION_DURATION: 30 * 60 * 1000, // 30 minutes in milliseconds
  WEBSOCKET_URL: import.meta.env.VITE_WEBSOCKET_URL || 'ws://localhost:8080/ws',
  MAP_API_KEY: import.meta.env.VITE_MAP_API_KEY,
  REFRESH_TOKEN_THRESHOLD: 5 * 60 * 1000, // 5 minutes before expiry
  API_TIMEOUT: 30000, // 30 seconds
  
  // Backend endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      DEMO_LOGIN: '/auth/demo-login',
      REFRESH: '/auth/refresh',
      LOGOUT: '/auth/logout'
    },
    USERS: {
      LIST: '/users',
      GET: '/users/:id',
      CREATE: '/users',
      UPDATE: '/users/:id',
      DELETE: '/users/:id'
    },
    HIVES: {
      LIST: '/hives',
      GET: '/hives/:id',
      CREATE: '/hives',
      UPDATE: '/hives/:id',
      DELETE: '/hives/:id',
      SENSOR_DATA: '/hives/:id/sensor-data'
    },
    ALERTS: {
      LIST: '/alerts',
      GET: '/alerts/:id',
      MARK_READ: '/alerts/:id/read',
      DELETE: '/alerts/:id'
    },
    DASHBOARD: {
      STATS: '/dashboard/stats',
      RECENT_HIVES: '/dashboard/recent-hives',
      RECENT_ALERTS: '/dashboard/recent-alerts'
    },
    ANALYTICS: {
      DATA: '/analytics/:type'
    },
    REPORTS: {
      GENERATE: '/reports/generate'
    }
  }
};

// Validation functions
export const validateEnvironment = () => {
  const requiredVars = ['VITE_API_URL'];
  const missing = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing);
  }
  
  return missing.length === 0;
};
