/**
 * Database Migration: Create Files Table
 * 
 * This migration creates a table to track uploaded files.
 */

exports.up = function(knex) {
  return knex.schema.createTable('files', function(table) {
    // Primary key
    table.increments('id').primary();
    
    // Foreign key to users table
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    
    // File information
    table.string('filename', 255).notNullable();
    table.string('original_filename', 255).notNullable();
    table.string('file_path', 500).notNullable();
    table.string('mime_type', 100).notNullable();
    table.bigInteger('file_size').notNullable();
    
    // File metadata
    table.string('description', 500).nullable();
    table.enum('file_type', ['document', 'image', 'other']).defaultTo('other');
    table.enum('status', ['processing', 'ready', 'error']).defaultTo('processing');
    
    // Timestamps
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    
    // Indexes
    table.index('user_id');
    table.index('file_type');
    table.index('status');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('files');
};
