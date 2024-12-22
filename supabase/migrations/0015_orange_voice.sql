/*
  # Fix admin user creation
  
  1. Changes
    - Creates admin user using Supabase auth functions
    - Ensures proper role and permissions
  
  2. Security
    - Uses proper password hashing
    - Sets up correct authentication
*/

-- Create admin user if not exists
DO $$
DECLARE
  new_user_id UUID;
BEGIN
  -- First try to get existing admin user
  SELECT id INTO new_user_id
  FROM auth.users
  WHERE email = 'admin@sovstates.com';

  -- If admin doesn't exist, create new user
  IF new_user_id IS NULL THEN
    -- Create user with hashed password
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'admin@sovstates.com',
      crypt('SovStates2024!', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{}',
      NOW(),
      NOW(),
      '',
      '',
      '',
      ''
    )
    RETURNING id INTO new_user_id;
  END IF;

  -- Create admin record if not exists
  INSERT INTO public.admins (username, user_id)
  VALUES ('admin', new_user_id)
  ON CONFLICT (username) DO NOTHING;

END $$;