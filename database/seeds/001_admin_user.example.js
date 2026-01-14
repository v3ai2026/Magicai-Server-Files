/**
 * Database Seed: Create Admin User
 * 
 * Run seeds with: npm run seed
 */

const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Delete existing entries
  await knex('users').del();
  
  // Hash password
  const passwordHash = await bcrypt.hash('admin123', 10);
  
  // Insert seed entries
  await knex('users').insert([
    {
      id: 1,
      email: 'admin@magicai.com',
      username: 'admin',
      password_hash: passwordHash,
      first_name: 'Admin',
      last_name: 'User',
      role: 'admin',
      is_active: true,
      email_verified: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      email: 'user@example.com',
      username: 'testuser',
      password_hash: await bcrypt.hash('user123', 10),
      first_name: 'Test',
      last_name: 'User',
      role: 'user',
      is_active: true,
      email_verified: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
};
