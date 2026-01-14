/**
 * Example Rate Limiting Middleware
 * 
 * This middleware demonstrates how to implement rate limiting to protect
 * against abuse and denial-of-service attacks.
 */

const rateLimit = require('express-rate-limit');

/**
 * General API rate limiter
 * Limits all API requests to prevent abuse
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests from this IP, please try again later.'
    }
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

/**
 * Strict rate limiter for authentication endpoints
 * More restrictive to prevent brute force attacks
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message: {
    error: {
      code: 'AUTH_RATE_LIMIT_EXCEEDED',
      message: 'Too many authentication attempts, please try again later.'
    }
  },
  skipSuccessfulRequests: true, // Don't count successful requests
});

/**
 * File upload rate limiter
 * Limits file upload requests to prevent storage abuse
 */
const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 uploads per hour
  message: {
    error: {
      code: 'UPLOAD_RATE_LIMIT_EXCEEDED',
      message: 'Upload limit exceeded, please try again later.'
    }
  },
});

/**
 * AI endpoint rate limiter
 * Limits AI requests which can be resource-intensive
 */
const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // Limit each IP to 50 AI requests per hour
  message: {
    error: {
      code: 'AI_RATE_LIMIT_EXCEEDED',
      message: 'AI request limit exceeded, please try again later.'
    }
  },
});

/**
 * Dynamic rate limiter based on user tier
 * Example of more sophisticated rate limiting
 * 
 * Usage:
 * const getUserTier = async (userId) => {
 *   // Fetch user tier from database
 *   return 'premium'; // or 'free', 'basic', 'enterprise'
 * };
 * const dynamicLimiter = createDynamicLimiter(getUserTier);
 * router.use(dynamicLimiter);
 * 
 * @param {Function} getUserTier - Async function that takes userId and returns tier
 * @returns {Function} Rate limiter middleware
 */
const createDynamicLimiter = (getUserTier) => {
  if (typeof getUserTier !== 'function') {
    throw new Error('getUserTier must be a function that returns a user tier');
  }
  
  return rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: async (req) => {
      // Get user tier from request (set by auth middleware)
      const tier = req.user ? await getUserTier(req.user.id) : 'free';
      
      // Different limits for different tiers
      const limits = {
        free: 20,
        basic: 100,
        premium: 500,
        enterprise: 10000
      };
      
      return limits[tier] || limits.free;
    },
    keyGenerator: (req) => {
      // Use user ID if authenticated, otherwise IP
      return req.user ? `user_${req.user.id}` : req.ip;
    },
    message: {
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Rate limit exceeded for your account tier.'
      }
    }
  });
};

module.exports = {
  apiLimiter,
  authLimiter,
  uploadLimiter,
  aiLimiter,
  createDynamicLimiter
};
