-- AI Venture Studio for Good - Database Schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/rjyvhzkxaddjjtnqzuvh/sql

-- ============================================================================
-- Users Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  email_verified TIMESTAMP,
  password VARCHAR(255),
  name VARCHAR(255),
  image VARCHAR(500),

  -- Profile fields from onboarding
  location VARCHAR(255),
  motivations TEXT,
  impact_interests TEXT[],
  lived_experience TEXT,
  expertise TEXT[],
  budget_range JSONB,
  time_commitment VARCHAR(50),

  -- Platform fields
  credits INTEGER DEFAULT 100,
  membership_tier VARCHAR(50) DEFAULT 'free',
  onboarding_completed BOOLEAN DEFAULT false,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- NextAuth.js Tables (for session management)
-- ============================================================================

CREATE TABLE IF NOT EXISTS accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  provider_account_id VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type VARCHAR(255),
  scope VARCHAR(255),
  id_token TEXT,
  session_state VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token VARCHAR(255) NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS verification_tokens (
  identifier VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  expires TIMESTAMP NOT NULL
);

-- ============================================================================
-- Ventures Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS ventures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  playbook_id VARCHAR(255) NOT NULL,
  launcher_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'draft',
  current_step VARCHAR(255),
  funding_received INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- Venture Steps Table (completed steps with artifacts)
-- ============================================================================

CREATE TABLE IF NOT EXISTS venture_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id UUID NOT NULL REFERENCES ventures(id) ON DELETE CASCADE,
  step_id VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  artifact JSONB,
  executed_at TIMESTAMP,
  cost INTEGER
);

-- ============================================================================
-- Contributions Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id UUID NOT NULL REFERENCES ventures(id) ON DELETE CASCADE,
  step_id VARCHAR(255),
  contributor_name VARCHAR(255) NOT NULL,
  contributor_email VARCHAR(255),
  amount INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'CAD',
  message TEXT,
  stripe_payment_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- Row Level Security (RLS) Policies
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ventures ENABLE ROW LEVEL SECURITY;
ALTER TABLE venture_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;

-- Users: Users can read and update their own profile
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid()::text = id::text OR auth.role() = 'service_role');

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Allow service role full access (for NextAuth)
CREATE POLICY "Service role has full access to users" ON users
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to accounts" ON accounts
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to sessions" ON sessions
  FOR ALL USING (auth.role() = 'service_role');

-- Ventures: Users can manage their own ventures
CREATE POLICY "Users can view own ventures" ON ventures
  FOR SELECT USING (launcher_id::text = auth.uid()::text OR auth.role() = 'service_role');

CREATE POLICY "Users can create ventures" ON ventures
  FOR INSERT WITH CHECK (launcher_id::text = auth.uid()::text OR auth.role() = 'service_role');

CREATE POLICY "Users can update own ventures" ON ventures
  FOR UPDATE USING (launcher_id::text = auth.uid()::text OR auth.role() = 'service_role');

CREATE POLICY "Service role has full access to ventures" ON ventures
  FOR ALL USING (auth.role() = 'service_role');

-- Venture Steps: Access through venture ownership
CREATE POLICY "Service role has full access to venture_steps" ON venture_steps
  FOR ALL USING (auth.role() = 'service_role');

-- Contributions: Public can create, owners can view
CREATE POLICY "Anyone can create contributions" ON contributions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role has full access to contributions" ON contributions
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- Indexes for Performance
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_ventures_launcher ON ventures(launcher_id);
CREATE INDEX IF NOT EXISTS idx_ventures_playbook ON ventures(playbook_id);
CREATE INDEX IF NOT EXISTS idx_venture_steps_venture ON venture_steps(venture_id);
CREATE INDEX IF NOT EXISTS idx_contributions_venture ON contributions(venture_id);
