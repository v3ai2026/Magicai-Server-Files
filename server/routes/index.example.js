/**
 * Example Routes Definition
 * 
 * This file shows how to organize and define API routes.
 */

const express = require('express');
const router = express.Router();

// Import middleware
const { authenticate, requireAdmin } = require('../middleware/auth.example');

// Import controllers
const UserController = require('../controllers/UserController.example');

// Public routes (no authentication required)
router.post('/auth/register', (req, res) => {
  // Registration logic
  res.json({ message: 'Register endpoint' });
});

router.post('/auth/login', (req, res) => {
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

// File routes
router.post('/files/upload', authenticate, (req, res) => {
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

// AI routes
router.post('/ai/chat', authenticate, (req, res) => {
  // AI chat logic
  res.json({ message: 'AI chat endpoint' });
});

router.post('/ai/generate', authenticate, (req, res) => {
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
