// Application configuration

export const APP_CONFIG = {
  name: 'CidadãoSupport',
  version: '1.0.0',
  description: 'Sistema de Chamados Municipal',
  
  // API Configuration
  api: {
    baseUrl: process.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
    timeout: 10000,
    retryAttempts: 3,
  },
  
  // File upload configuration
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    maxFiles: 5,
  },
  
  // Pagination
  pagination: {
    defaultPageSize: 20,
    pageSizeOptions: [10, 20, 50, 100],
  },
  
  // Notification settings
  notifications: {
    defaultDuration: 5000,
    position: 'top-right' as const,
  },
  
  // Theme settings
  theme: {
    default: 'light' as const,
    options: ['light', 'dark', 'auto'] as const,
  },
  
  // Security settings
  security: {
    sessionTimeout: 60 * 60 * 1000, // 1 hour in milliseconds
    passwordMinLength: 8,
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15 minutes
  },
  
  // SLA settings (in hours)
  sla: {
    low: 72,
    medium: 48,
    high: 24,
    urgent: 4,
  },
} as const;

export type AppConfig = typeof APP_CONFIG;