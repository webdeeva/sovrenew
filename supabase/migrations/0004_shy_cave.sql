/*
  # Create Initial Admin User

  1. Changes
    - Creates initial admin user with email/password authentication
    - Adds admin record for the created user

  2. Security
    - Uses secure password hashing
    - Links admin record to auth.users table
*/

-- Create initial admin user
SELECT insert_admin_user(
  'admin@sovstates.com',
  'SovStates2024!',
  'admin'
);

-- Function will be automatically created by Supabase Auth
-- and will handle password hashing and user creation