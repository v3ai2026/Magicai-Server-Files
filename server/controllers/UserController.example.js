/**
 * Example User Controller
 * 
 * Controllers handle business logic and coordinate between routes and models.
 */

const User = require('../models/User.example');

class UserController {
  /**
   * Get user profile
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getProfile(req, res) {
    try {
      const userId = req.user.id; // Assuming user ID comes from auth middleware
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found'
          }
        });
      }

      // Remove sensitive data before sending response
      const { passwordHash, ...userProfile } = user;

      res.json({
        success: true,
        data: userProfile
      });
    } catch (error) {
      console.error('Error getting user profile:', error);
      res.status(500).json({
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An error occurred while retrieving user profile'
        }
      });
    }
  }

  /**
   * Update user profile
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const updates = req.body;

      // Validate updates
      const allowedUpdates = ['firstName', 'lastName', 'username'];
      const requestedUpdates = Object.keys(updates);
      const isValidOperation = requestedUpdates.every(update => 
        allowedUpdates.includes(update)
      );

      if (!isValidOperation) {
        return res.status(400).json({
          error: {
            code: 'INVALID_UPDATES',
            message: 'Invalid updates requested'
          }
        });
      }

      const updatedUser = await User.update(userId, updates);

      res.json({
        success: true,
        data: updatedUser,
        message: 'Profile updated successfully'
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An error occurred while updating profile'
        }
      });
    }
  }

  /**
   * List all users (admin only)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async listUsers(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      
      // This would be implemented with actual database queries
      const users = await User.findAll({
        limit: parseInt(limit),
        offset: (parseInt(page) - 1) * parseInt(limit)
      });

      res.json({
        success: true,
        data: users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit)
        }
      });
    } catch (error) {
      console.error('Error listing users:', error);
      res.status(500).json({
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An error occurred while listing users'
        }
      });
    }
  }
}

module.exports = new UserController();
