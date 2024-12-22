/*
  # Initial Schema Setup

  1. New Tables
    - `founding_citizens`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `email` (text, unique)
      - `phone` (text)
      - `city_state` (text)
      - `country` (text)
      - `occupation` (text)
      - `bio` (text)
      - `status` (enum: pending, approved, rejected)
      - `created_at` (timestamp)
    - `admins`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated admins to manage founding citizens
    - Add policies for users to submit applications
*/

-- Create status enum
CREATE TYPE application_status AS ENUM ('pending', 'approved', 'rejected');

-- Create founding_citizens table
CREATE TABLE IF NOT EXISTS founding_citizens (
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
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE founding_citizens ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Policies for founding_citizens
CREATE POLICY "Anyone can create applications"
  ON founding_citizens
  FOR INSERT
  TO authenticated
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
  USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can update applications"
  ON founding_citizens
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE user_id = auth.uid()
    )
  );

-- Policies for admins
CREATE POLICY "Admins can view admin list"
  ON admins
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins 
      WHERE user_id = auth.uid()
    )
  );