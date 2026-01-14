/**
 * Example User Model
 * 
 * This file demonstrates a typical database model structure.
 * Adapt this to your specific ORM (Sequelize, TypeORM, Mongoose, etc.)
 */

class User {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.username = data.username;
    this.passwordHash = data.passwordHash;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.role = data.role || 'user';
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  // Instance methods
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  isAdmin() {
    return this.role === 'admin';
  }

  // Static methods
  static tableName = 'users';

  static async findById(id) {
    // Database query logic here
    // Example: return await db.query('SELECT * FROM users WHERE id = ?', [id]);
  }

  static async findByEmail(email) {
    // Database query logic here
    // Example: return await db.query('SELECT * FROM users WHERE email = ?', [email]);
  }

  static async create(userData) {
    // Database insert logic here
    // Example: return await db.query('INSERT INTO users SET ?', [userData]);
  }

  static async update(id, userData) {
    // Database update logic here
    // Example: return await db.query('UPDATE users SET ? WHERE id = ?', [userData, id]);
  }

  static async delete(id) {
    // Database delete logic here
    // Example: return await db.query('DELETE FROM users WHERE id = ?', [id]);
  }
}

module.exports = User;
