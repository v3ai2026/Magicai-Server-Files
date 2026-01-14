/**
 * Example Utility Functions
 * 
 * Common helper functions used throughout the application.
 */

const crypto = require('crypto');

/**
 * Generate a random string
 * @param {number} length - Length of the string
 * @returns {string} Random string
 */
const generateRandomString = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Sanitize filename
 * @param {string} filename - Original filename
 * @returns {string} Sanitized filename
 */
const sanitizeFilename = (filename) => {
  // Remove path separators and special characters
  return filename
    .replace(/[\/\\]/g, '')
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .toLowerCase();
};

/**
 * Format file size
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Generate unique filename
 * @param {string} originalName - Original filename
 * @returns {string} Unique filename
 */
const generateUniqueFilename = (originalName) => {
  const timestamp = Date.now();
  const random = generateRandomString(8);
  
  // Handle files with and without extensions
  const parts = originalName.split('.');
  const hasExtension = parts.length > 1 && parts[parts.length - 1].length > 0;
  const extension = hasExtension ? parts.pop() : '';
  const baseName = parts.join('.');
  const sanitizedBaseName = sanitizeFilename(baseName) || 'file';
  
  return hasExtension 
    ? `${sanitizedBaseName}-${timestamp}-${random}.${extension}`
    : `${sanitizedBaseName}-${timestamp}-${random}`;
};

/**
 * Paginate results
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @returns {Object} Pagination object
 */
const paginate = (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  return {
    limit: parseInt(limit),
    offset: parseInt(offset),
    page: parseInt(page)
  };
};

/**
 * Format date to ISO string
 * @param {Date} date - Date object
 * @returns {string} ISO formatted date
 */
const formatDate = (date) => {
  return new Date(date).toISOString();
};

/**
 * Delay execution
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} Promise that resolves after delay
 */
const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Remove undefined values from object
 * @param {Object} obj - Object to clean
 * @returns {Object} Cleaned object
 */
const removeUndefined = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  );
};

module.exports = {
  generateRandomString,
  isValidEmail,
  sanitizeFilename,
  formatFileSize,
  generateUniqueFilename,
  paginate,
  formatDate,
  delay,
  removeUndefined
};
