/**
 * Example Routes Definition
 * 
 * This file shows how to organize and define API routes with proper security.
 * 
 * SECURITY: Rate limiting is implemented to prevent abuse and DoS attacks.
 * See server/middleware/rateLimiter.example.js for rate limiter implementations.
 */

const express = require('express');
const router = express.Router();

// Import middleware
const { authenticate, requireAdmin } = require('../middleware/auth.example');
const { 
  apiLimiter, 
  authLimiter, 
  uploadLimiter, 
  aiLimiter 
} = require('../middleware/rateLimiter.example');

// Import controllers
const UserController = require('../controllers/UserController.example');

// Apply general rate limiting to all routes
router.use(apiLimiter);

// Public routes (no authentication required, but rate limited)
router.post('/auth/register', authLimiter, (req, res) => {
  // Registration logic
  res.json({ message: 'Register endpoint' });
});

router.post('/auth/login', authLimiter, (req, res) => {
  // Login logic
  res.json({ message: 'Login endpoint' });
});

// Protected routes (authentication required)
router.get('/users/profile', authenticate, UserController.getProfile);
router.put('/users/profile', authenticate, UserController.updateProfile);

// Admin-only routes
router.get('/users', authenticate, requireAdmin, UserController.listUsers);
router.delete('/users/:id', authenticate, requireAdmin, (req, res) => {
  // Delete user logic
  res.json({ message: 'Delete user endpoint' });
});

// File routes (with upload rate limiting)
router.post('/files/upload', authenticate, uploadLimiter, (req, res) => {
  // File upload logic
  res.json({ message: 'File upload endpoint' });
});

router.get('/files', authenticate, (req, res) => {
  // List files logic
  res.json({ message: 'List files endpoint' });
});

router.get('/files/:id', authenticate, (req, res) => {
  // Get file logic
  res.json({ message: 'Get file endpoint' });
});

router.delete('/files/:id', authenticate, (req, res) => {
  // Delete file logic
  res.json({ message: 'Delete file endpoint' });
});

// AI routes (with AI-specific rate limiting)
router.post('/ai/chat', authenticate, aiLimiter, (req, res) => {
  // AI chat logic
  res.json({ message: 'AI chat endpoint' });
});

router.post('/ai/generate', authenticate, aiLimiter, (req, res) => {
  // AI generation logic
  res.json({ message: 'AI generate endpoint' });
});

router.get('/ai/history', authenticate, (req, res) => {
  // Get AI history logic
  res.json({ message: 'AI history endpoint' });
});

// Health check (no auth required)
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
