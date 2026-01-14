/**
 * Example Application Configuration
 * 
 * This file contains general application settings.
 */

module.exports = {
  // Application settings
  app: {
    name: process.env.APP_NAME || 'MagicAI-Server',
    url: process.env.APP_URL || 'http://localhost:3000',
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development'
  },

  // API settings
  api: {
    prefix: '/api/v1',
    timeout: 30000, // 30 seconds
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    }
  },

  // File upload settings
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB
    allowedTypes: (process.env.ALLOWED_FILE_TYPES || 'pdf,doc,docx,xls,xlsx,txt,md').split(','),
    uploadDir: './uploads'
  },

  // JWT settings
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-change-this',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    algorithm: 'HS256'
  },

  // CORS settings
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
  },

  // Logging settings
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.NODE_ENV === 'production' ? 'json' : 'dev'
  },

  // OpenAI settings
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    organizationId: process.env.OPENAI_ORGANIZATION_ID,
    model: 'gpt-4',
    maxTokens: 2000
  }
};
