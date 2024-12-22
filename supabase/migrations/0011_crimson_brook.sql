/*
  # Update founding citizens policies

  1. Changes
    - Update application submission policy to allow public access
    - Ensure proper RLS for founding citizens table
  
  2. Security
    - Maintains admin-only access for viewing and updating applications
    - Allows public submission of applications
*/

-- Drop existing policy
DROP POLICY IF EXISTS "Public can create applications" ON founding_citizens;

-- Create new policy with public access
CREATE POLICY "Public can submit applications"
  ON founding_citizens
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE founding_citizens ENABLE ROW LEVEL SECURITY;