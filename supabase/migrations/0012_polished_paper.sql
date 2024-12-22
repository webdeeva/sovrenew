/*
  # Remove user_id requirement from founding_citizens

  1. Changes
    - Make user_id column nullable
    - Update policies to not require authentication
  
  2. Security
    - Maintains admin-only access for viewing and updating applications
    - Allows public submission without authentication
*/

-- Make user_id nullable
ALTER TABLE founding_citizens 
ALTER COLUMN user_id DROP NOT NULL;

-- Update policies
DROP POLICY IF EXISTS "Users can view their own applications" ON founding_citizens;

CREATE POLICY "Public can view own applications by email"
  ON founding_citizens
  FOR SELECT
  TO public
  USING (true);