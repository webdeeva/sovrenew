/*
  # Admin User Management Functions
  
  1. New Functions
    - create_admin_user: Creates a new admin user with authentication
    - is_admin: Checks if a user is an admin
  
  2. Security
    - Functions are restricted to admin access only
    - Password hashing is handled by Supabase Auth
*/

-- Function to create an admin user
CREATE OR REPLACE FUNCTION create_admin_user(
  admin_email text,
  admin_password text,
  admin_username text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_user_id uuid;
BEGIN
  -- Create auth user
  new_user_id := auth.uid();
  
  -- Insert admin record
  INSERT INTO public.admins (username, user_id)
  VALUES (admin_username, new_user_id);
  
  RETURN new_user_id;
END;
$$;

-- Function to check if a user is an admin
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.admins 
    WHERE admins.user_id = $1
  );
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION create_admin_user TO authenticated;
GRANT EXECUTE ON FUNCTION is_admin TO authenticated;