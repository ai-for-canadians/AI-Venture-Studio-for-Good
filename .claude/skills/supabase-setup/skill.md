# Supabase Setup Skill

Scaffold and configure Supabase for AI Venture Studio projects.

## Usage

```
/supabase-setup [--project <name>] [--with-auth] [--with-storage]
```

## What This Skill Does

1. **Initialize Supabase Client**
   - Create `src/lib/db/supabase.ts` with client configuration
   - Set up server and client components

2. **Create Database Schema**
   - Users table with launcher profile fields
   - Ventures table with playbook and status
   - Venture_steps table with artifacts
   - Contributions table with payment tracking

3. **Configure Authentication**
   - Email/password auth
   - OAuth providers (Google, GitHub)
   - Session management
   - Protected route middleware

4. **Set Up Row Level Security (RLS)**
   - Users can only access their own data
   - Public read access for published ventures
   - Contributor access for funded steps

5. **Generate TypeScript Types**
   - Auto-generate types from database schema
   - Export types for use in components

## Schema Overview

```sql
-- Users (extends Supabase auth.users)
profiles (
  id uuid references auth.users,
  name text,
  location text,
  motivations text,
  impact_interests text[],
  lived_experience text,
  expertise text[],
  budget_range jsonb,
  credits integer default 0,
  membership_tier text default 'free'
)

-- Ventures
ventures (
  id uuid primary key,
  playbook_id text not null,
  launcher_id uuid references profiles,
  name text not null,
  location text not null,
  status text default 'draft',
  current_step text,
  funding_received integer default 0
)

-- Venture Steps
venture_steps (
  id uuid primary key,
  venture_id uuid references ventures,
  step_id text not null,
  status text default 'pending',
  artifact jsonb,
  executed_at timestamp,
  cost integer
)

-- Contributions
contributions (
  id uuid primary key,
  venture_id uuid references ventures,
  step_id text,
  contributor_name text not null,
  contributor_email text,
  amount integer not null,
  stripe_payment_id text
)
```

## Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```
