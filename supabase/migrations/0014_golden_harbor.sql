/*
  # Fix admin user and policies
  
  1. Changes
    - Creates admin user with proper auth setup
    - Updates RLS policies for better security
    - Fixes newsletter subscription policy
  
  2. Security
    - Ensures proper authentication for admin access
    - Maintains public access for submissions
    - Protects sensitive operations
*/

-- Create admin user if not exists
DO $$
DECLARE
  new_user_id UUID;
BEGIN
  -- Create user in auth.users if not exists
  INSERT INTO auth.users (
    email,
    raw_user_meta_data,
    is_super_admin,
    encrypted_password
  )
  VALUES (
    'admin@sovstates.com',
    '{"provider": "email"}',
    TRUE,
    crypt('SovStates2024!', gen_salt('bf'))
  )
  ON CONFLICT (email) DO NOTHING
  RETURNING id INTO new_user_id;

  -- Create admin record if not exists
  INSERT INTO public.admins (username, user_id)
  VALUES ('admin', new_user_id)
  ON CONFLICT (username) DO NOTHING;
END $$;

-- Fix newsletter subscription policy
DROP POLICY IF EXISTS "Public can subscribe to newsletter" ON newsletter_subscribers;
CREATE POLICY "Public can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Fix founding citizens policies
DROP POLICY IF EXISTS "Public can submit applications" ON founding_citizens;
CREATE POLICY "Public can submit applications"
  ON founding_citizens
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Ensure admin policies are correct
DROP POLICY IF EXISTS "Admins can view all applications" ON founding_citizens;
CREATE POLICY "Admins can view all applications"
  ON founding_citizens
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE user_id = auth.uid()
    )
  );