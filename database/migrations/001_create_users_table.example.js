/**
 * Database Migration: Create Users Table
 * 
 * Run migrations with: npm run migrate
 * Rollback with: npm run migrate:rollback
 */

exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    // Primary key
    table.increments('id').primary();
    
    // User credentials
    table.string('email', 255).notNullable().unique();
    table.string('username', 100).notNullable().unique();
    table.string('password_hash', 255).notNullable();
    
    // User information
    table.string('first_name', 100);
    table.string('last_name', 100);
    table.enum('role', ['user', 'admin', 'moderator']).defaultTo('user');
    
    // Status
    table.boolean('is_active').defaultTo(true);
    table.boolean('email_verified').defaultTo(false);
    
    // Timestamps
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('last_login_at').nullable();
    
    // Indexes for performance
    table.index('email');
    table.index('username');
    table.index('role');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
