-- Drop existing policy
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON newsletter_subscribers;

-- Create new policy with public access
CREATE POLICY "Public can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;