/*
  # Initial Schema Setup

  1. New Tables
    - founding_citizens: Stores founding citizen applications
    - admins: Stores admin users
    - newsletter_subscribers: Stores newsletter subscriptions

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated and public access
*/

-- Create application status enum
CREATE TYPE application_status AS ENUM ('pending', 'approved', 'rejected');

-- Create founding_citizens table
CREATE TABLE founding_citizens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text NOT NULL,
  city_state text NOT NULL,
  country text NOT NULL,
  occupation text NOT NULL,
  bio text NOT NULL,
  status application_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Create admins table
CREATE TABLE admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Create newsletter_subscribers table
CREATE TABLE newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  subscribed boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE founding_citizens ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policies for founding_citizens
CREATE POLICY "Public can create applications"
  ON founding_citizens
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view their own applications"
  ON founding_citizens
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all applications"
  ON founding_citizens
  FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid()));

CREATE POLICY "Admins can update applications"
  ON founding_citizens
  FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid()));

-- Policies for admins
CREATE POLICY "Admins can view admin list"
  ON admins
  FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid()));

-- Policies for newsletter_subscribers
CREATE POLICY "Public can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admins can view subscribers"
  ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid()));