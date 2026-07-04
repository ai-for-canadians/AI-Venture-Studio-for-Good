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
-- Contributions Table (financial contributions)
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
-- Cooperative Ownership Model
-- ============================================================================

-- Venture Members: tracks who is part of each venture cooperative
CREATE TABLE IF NOT EXISTS venture_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id UUID NOT NULL REFERENCES ventures(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'member', -- founder, admin, member
  ownership_percentage DECIMAL(5,2) DEFAULT 0.00, -- 0.00 to 100.00
  status VARCHAR(50) DEFAULT 'pending', -- pending, active, left, removed
  invited_by UUID REFERENCES users(id),
  invited_at TIMESTAMP DEFAULT NOW(),
  joined_at TIMESTAMP,
  left_at TIMESTAMP,
  UNIQUE(venture_id, user_id)
);

-- Tasks: work items that earn ownership (sweat equity)
CREATE TABLE IF NOT EXISTS venture_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id UUID NOT NULL REFERENCES ventures(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  ownership_value DECIMAL(5,2) NOT NULL, -- ownership % earned on completion
  assigned_to UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'open', -- open, assigned, in_progress, completed, verified, cancelled
  priority VARCHAR(20) DEFAULT 'medium', -- low, medium, high, urgent
  due_date TIMESTAMP,
  completed_at TIMESTAMP,
  verified_by UUID REFERENCES users(id),
  verified_at TIMESTAMP,
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Ownership Ledger: immutable audit trail of all ownership changes
CREATE TABLE IF NOT EXISTS ownership_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id UUID NOT NULL REFERENCES ventures(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  change_amount DECIMAL(5,2) NOT NULL, -- positive or negative
  new_balance DECIMAL(5,2) NOT NULL, -- ownership after this change
  change_type VARCHAR(50) NOT NULL, -- task_completion, financial_contribution, adjustment, forfeit, transfer_in, transfer_out
  reference_type VARCHAR(50), -- task, contribution, proposal, manual
  reference_id UUID, -- ID of task, contribution, or proposal
  notes TEXT,
  created_by UUID REFERENCES users(id), -- who made/approved the change
  created_at TIMESTAMP DEFAULT NOW()
);

-- Proposals: governance decisions that need voting
CREATE TABLE IF NOT EXISTS proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id UUID NOT NULL REFERENCES ventures(id) ON DELETE CASCADE,
  proposer_id UUID NOT NULL REFERENCES users(id),
  proposal_type VARCHAR(50) NOT NULL, -- major, minor (major needs supermajority)
  category VARCHAR(50) NOT NULL, -- member_invite, member_remove, ownership_adjustment, budget, strategy, transfer_approval
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  metadata JSONB, -- stores context like invited user email, transfer details, etc.
  status VARCHAR(50) DEFAULT 'open', -- open, passed, failed, expired, cancelled
  voting_threshold DECIMAL(5,2), -- required percentage to pass (e.g., 66.67 for supermajority)
  votes_for DECIMAL(5,2) DEFAULT 0, -- weighted sum of yes votes
  votes_against DECIMAL(5,2) DEFAULT 0, -- weighted sum of no votes
  votes_abstain DECIMAL(5,2) DEFAULT 0,
  voting_ends_at TIMESTAMP,
  resolved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Votes: individual member votes on proposals
CREATE TABLE IF NOT EXISTS votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  voter_id UUID NOT NULL REFERENCES users(id),
  vote VARCHAR(10) NOT NULL, -- yes, no, abstain
  weight DECIMAL(5,2) NOT NULL, -- voter's ownership at time of vote
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(proposal_id, voter_id)
);

-- Member Invitations: pending invites before user accepts
CREATE TABLE IF NOT EXISTS member_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id UUID NOT NULL REFERENCES ventures(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  invited_by UUID NOT NULL REFERENCES users(id),
  role VARCHAR(50) DEFAULT 'member',
  initial_ownership DECIMAL(5,2) DEFAULT 0.00,
  token VARCHAR(255) NOT NULL UNIQUE, -- secure invite token
  status VARCHAR(50) DEFAULT 'pending', -- pending, accepted, expired, revoked
  message TEXT, -- personal message from inviter
  expires_at TIMESTAMP NOT NULL,
  accepted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Activity Feed: tracks actions for collaboration awareness
CREATE TABLE IF NOT EXISTS venture_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id UUID NOT NULL REFERENCES ventures(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id), -- null for system events
  activity_type VARCHAR(50) NOT NULL, -- member_joined, task_completed, vote_cast, step_executed, etc.
  title VARCHAR(255) NOT NULL,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Comments: discussions on tasks and steps
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venture_id UUID NOT NULL REFERENCES ventures(id) ON DELETE CASCADE,
  parent_type VARCHAR(50) NOT NULL, -- task, step, proposal
  parent_id UUID NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
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
-- RLS for Cooperative Ownership Tables
-- ============================================================================

-- Enable RLS on new tables
ALTER TABLE venture_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE venture_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE ownership_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE venture_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Venture Members: members can view their venture's members
CREATE POLICY "Members can view venture members" ON venture_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM venture_members vm
      WHERE vm.venture_id = venture_members.venture_id
      AND vm.user_id::text = auth.uid()::text
      AND vm.status = 'active'
    )
    OR auth.role() = 'service_role'
  );

CREATE POLICY "Service role has full access to venture_members" ON venture_members
  FOR ALL USING (auth.role() = 'service_role');

-- Tasks: members can view and manage their venture's tasks
CREATE POLICY "Members can view venture tasks" ON venture_tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM venture_members vm
      WHERE vm.venture_id = venture_tasks.venture_id
      AND vm.user_id::text = auth.uid()::text
      AND vm.status = 'active'
    )
    OR auth.role() = 'service_role'
  );

CREATE POLICY "Members can create tasks" ON venture_tasks
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM venture_members vm
      WHERE vm.venture_id = venture_tasks.venture_id
      AND vm.user_id::text = auth.uid()::text
      AND vm.status = 'active'
    )
    OR auth.role() = 'service_role'
  );

CREATE POLICY "Members can update tasks" ON venture_tasks
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM venture_members vm
      WHERE vm.venture_id = venture_tasks.venture_id
      AND vm.user_id::text = auth.uid()::text
      AND vm.status = 'active'
    )
    OR auth.role() = 'service_role'
  );

CREATE POLICY "Service role has full access to venture_tasks" ON venture_tasks
  FOR ALL USING (auth.role() = 'service_role');

-- Ownership Ledger: members can view their venture's ledger (read-only for users)
CREATE POLICY "Members can view ownership ledger" ON ownership_ledger
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM venture_members vm
      WHERE vm.venture_id = ownership_ledger.venture_id
      AND vm.user_id::text = auth.uid()::text
      AND vm.status = 'active'
    )
    OR auth.role() = 'service_role'
  );

CREATE POLICY "Service role has full access to ownership_ledger" ON ownership_ledger
  FOR ALL USING (auth.role() = 'service_role');

-- Proposals: members can view and vote on proposals
CREATE POLICY "Members can view proposals" ON proposals
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM venture_members vm
      WHERE vm.venture_id = proposals.venture_id
      AND vm.user_id::text = auth.uid()::text
      AND vm.status = 'active'
    )
    OR auth.role() = 'service_role'
  );

CREATE POLICY "Members can create proposals" ON proposals
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM venture_members vm
      WHERE vm.venture_id = proposals.venture_id
      AND vm.user_id::text = auth.uid()::text
      AND vm.status = 'active'
      AND vm.ownership_percentage >= 5.00  -- minimum 5% to create proposals
    )
    OR auth.role() = 'service_role'
  );

CREATE POLICY "Service role has full access to proposals" ON proposals
  FOR ALL USING (auth.role() = 'service_role');

-- Votes: members can view votes and cast their own
CREATE POLICY "Members can view votes" ON votes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM proposals p
      JOIN venture_members vm ON vm.venture_id = p.venture_id
      WHERE p.id = votes.proposal_id
      AND vm.user_id::text = auth.uid()::text
      AND vm.status = 'active'
    )
    OR auth.role() = 'service_role'
  );

CREATE POLICY "Members can cast votes" ON votes
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM proposals p
      JOIN venture_members vm ON vm.venture_id = p.venture_id
      WHERE p.id = votes.proposal_id
      AND vm.user_id::text = auth.uid()::text
      AND vm.status = 'active'
      AND vm.ownership_percentage >= 5.00  -- minimum 5% to vote
    )
    OR auth.role() = 'service_role'
  );

CREATE POLICY "Service role has full access to votes" ON votes
  FOR ALL USING (auth.role() = 'service_role');

-- Member Invitations: admins can manage, invitees can view their own
CREATE POLICY "Users can view their invitations" ON member_invitations
  FOR SELECT USING (
    email = (SELECT email FROM users WHERE id::text = auth.uid()::text)
    OR invited_by::text = auth.uid()::text
    OR auth.role() = 'service_role'
  );

CREATE POLICY "Service role has full access to member_invitations" ON member_invitations
  FOR ALL USING (auth.role() = 'service_role');

-- Activity Feed: members can view their venture's activity
CREATE POLICY "Members can view activity" ON venture_activity
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM venture_members vm
      WHERE vm.venture_id = venture_activity.venture_id
      AND vm.user_id::text = auth.uid()::text
      AND vm.status = 'active'
    )
    OR auth.role() = 'service_role'
  );

CREATE POLICY "Service role has full access to venture_activity" ON venture_activity
  FOR ALL USING (auth.role() = 'service_role');

-- Comments: members can view and create comments
CREATE POLICY "Members can view comments" ON comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM venture_members vm
      WHERE vm.venture_id = comments.venture_id
      AND vm.user_id::text = auth.uid()::text
      AND vm.status = 'active'
    )
    OR auth.role() = 'service_role'
  );

CREATE POLICY "Members can create comments" ON comments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM venture_members vm
      WHERE vm.venture_id = comments.venture_id
      AND vm.user_id::text = auth.uid()::text
      AND vm.status = 'active'
    )
    OR auth.role() = 'service_role'
  );

CREATE POLICY "Users can update own comments" ON comments
  FOR UPDATE USING (user_id::text = auth.uid()::text OR auth.role() = 'service_role');

CREATE POLICY "Service role has full access to comments" ON comments
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- Indexes for Performance
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_ventures_launcher ON ventures(launcher_id);
CREATE INDEX IF NOT EXISTS idx_ventures_playbook ON ventures(playbook_id);
CREATE INDEX IF NOT EXISTS idx_venture_steps_venture ON venture_steps(venture_id);
CREATE INDEX IF NOT EXISTS idx_contributions_venture ON contributions(venture_id);

-- Cooperative model indexes
CREATE INDEX IF NOT EXISTS idx_venture_members_venture ON venture_members(venture_id);
CREATE INDEX IF NOT EXISTS idx_venture_members_user ON venture_members(user_id);
CREATE INDEX IF NOT EXISTS idx_venture_members_status ON venture_members(status);
CREATE INDEX IF NOT EXISTS idx_venture_tasks_venture ON venture_tasks(venture_id);
CREATE INDEX IF NOT EXISTS idx_venture_tasks_assigned ON venture_tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_venture_tasks_status ON venture_tasks(status);
CREATE INDEX IF NOT EXISTS idx_ownership_ledger_venture ON ownership_ledger(venture_id);
CREATE INDEX IF NOT EXISTS idx_ownership_ledger_user ON ownership_ledger(user_id);
CREATE INDEX IF NOT EXISTS idx_proposals_venture ON proposals(venture_id);
CREATE INDEX IF NOT EXISTS idx_proposals_status ON proposals(status);
CREATE INDEX IF NOT EXISTS idx_votes_proposal ON votes(proposal_id);
CREATE INDEX IF NOT EXISTS idx_member_invitations_email ON member_invitations(email);
CREATE INDEX IF NOT EXISTS idx_member_invitations_token ON member_invitations(token);
CREATE INDEX IF NOT EXISTS idx_venture_activity_venture ON venture_activity(venture_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent ON comments(parent_type, parent_id);
