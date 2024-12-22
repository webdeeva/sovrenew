/*
  # Create Newsletter Subscribers Table

  1. New Tables
    - `newsletter_subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `subscribed` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policy for public subscription
    - Add policy for admin access
*/

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admins can view subscribers"
  ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE user_id = auth.uid()
    )
  );