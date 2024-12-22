/*
  # Fix RLS policies for admin access
  
  1. Changes
    - Fixes infinite recursion in admin policies
    - Simplifies admin access checks
    - Updates policies for founding citizens and newsletter tables
  
  2. Security
    - Maintains proper access control
    - Prevents policy recursion
*/

-- Drop existing policies that may cause recursion
DROP POLICY IF EXISTS "Admins can view all applications" ON founding_citizens;
DROP POLICY IF EXISTS "Admins can view subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can view admin list" ON admins;

-- Create a function to safely check admin status
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM admins 
    WHERE user_id = auth.uid()
  );
$$;

-- Create new policies using the safe admin check
CREATE POLICY "Admins can view all applications"
  ON founding_citizens
  FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can view subscribers"
  ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can view admin list"
  ON admins
  FOR SELECT
  TO authenticated
  USING (is_admin());

-- Update update policy for founding citizens
DROP POLICY IF EXISTS "Admins can update applications" ON founding_citizens;
CREATE POLICY "Admins can update applications"
  ON founding_citizens
  FOR UPDATE
  TO authenticated
  USING (is_admin());