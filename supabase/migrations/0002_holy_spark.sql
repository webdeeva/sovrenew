/*
  # Create newsletter subscribers table

  1. New Tables
    - `newsletter_subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `subscribed` (boolean)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `newsletter_subscribers` table
    - Add policy for public inserts
    - Add policy for admin reads
*/

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  TO authenticated
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