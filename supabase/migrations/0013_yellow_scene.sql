/*
  # Create initial admin user
  
  1. Changes
    - Creates the first admin user with email and password
    - Inserts admin record in admins table
  
  2. Security
    - Password will be hashed by Supabase Auth
    - Admin role assigned through admins table
*/

-- Create the admin user in auth.users
INSERT INTO auth.users (
  email,
  encrypted_password,
  email_confirmed_at,
  role
)
VALUES (
  'admin@sovstates.com',
  crypt('SovStates2024!', gen_salt('bf')),
  now(),
  'authenticated'
)
ON CONFLICT (email) DO NOTHING;

-- Insert admin record
INSERT INTO public.admins (
  username,
  user_id
)
SELECT 
  'admin',
  id
FROM auth.users
WHERE email = 'admin@sovstates.com'
ON CONFLICT (username) DO NOTHING;