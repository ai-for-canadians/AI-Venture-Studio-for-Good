# AI Venture Studio for Good - Project Structure

## Directory Structure

```
ai-venture-studio-for-good/
├── README.md                     # Project overview and setup instructions
├── SPEC.md                       # Product specification (this doc)
├── BUILD_PLAN.md                 # Phased build plan
├── .env.example                  # Environment variables template
├── .env.local                    # Local environment variables (gitignored)
│
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home/landing page
│   │   ├── globals.css           # Global styles
│   │   │
│   │   ├── (auth)/               # Auth routes group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── onboarding/       # Motivation/profile capture
│   │   │       └── page.tsx
│   │   │
│   │   ├── (dashboard)/          # Protected dashboard routes
│   │   │   ├── layout.tsx        # Dashboard layout with nav
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx      # Main dashboard
│   │   │   ├── ventures/
│   │   │   │   ├── page.tsx      # List user's ventures
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx  # Create new venture
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx  # Venture detail/management
│   │   │   │       └── steps/
│   │   │   │           └── [stepId]/
│   │   │   │               └── page.tsx  # Step execution view
│   │   │   └── profile/
│   │   │       └── page.tsx      # Edit profile/motivations
│   │   │
│   │   ├── (public)/             # Public routes
│   │   │   ├── playbooks/
│   │   │   │   ├── page.tsx      # Browse all playbooks
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx  # Playbook detail
│   │   │   ├── ventures/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx  # Public venture page (for contributors)
│   │   │   └── contribute/
│   │   │       └── [ventureId]/
│   │   │           └── page.tsx  # Contribution flow
│   │   │
│   │   └── api/                  # API routes
│   │       ├── auth/
│   │       │   └── [...nextauth]/
│   │       │       └── route.ts
│   │       ├── playbooks/
│   │       │   └── route.ts      # GET playbooks
│   │       ├── ventures/
│   │       │   ├── route.ts      # GET/POST ventures
│   │       │   └── [id]/
│   │       │       ├── route.ts  # GET/PATCH venture
│   │       │       └── steps/
│   │       │           └── [stepId]/
│   │       │               └── execute/
│   │       │                   └── route.ts  # POST execute step
│   │       ├── contributions/
│   │       │   └── route.ts      # POST contribution
│   │       └── webhooks/
│   │           └── stripe/
│   │               └── route.ts  # Stripe webhooks
│   │
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── progress.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── nav.tsx
│   │   │
│   │   ├── playbooks/
│   │   │   ├── playbook-card.tsx
│   │   │   ├── playbook-grid.tsx
│   │   │   ├── playbook-detail.tsx
│   │   │   ├── category-filter.tsx
│   │   │   └── playbook-matcher.tsx  # Motivation-based matching
│   │   │
│   │   ├── ventures/
│   │   │   ├── venture-card.tsx
│   │   │   ├── venture-progress.tsx
│   │   │   ├── step-list.tsx
│   │   │   ├── step-card.tsx
│   │   │   ├── step-executor.tsx     # Triggers and displays agent execution
│   │   │   ├── artifact-viewer.tsx   # Displays step outputs
│   │   │   └── contributor-list.tsx
│   │   │
│   │   ├── contributions/
│   │   │   ├── contribute-form.tsx
│   │   │   └── contribution-card.tsx
│   │   │
│   │   ├── onboarding/
│   │   │   ├── motivation-form.tsx
│   │   │   ├── expertise-selector.tsx
│   │   │   └── budget-selector.tsx
│   │   │
│   │   └── shared/
│   │       ├── loading.tsx
│   │       ├── error.tsx
│   │       └── empty-state.tsx
│   │
│   ├── lib/
│   │   ├── db/
│   │   │   ├── index.ts          # Database client
│   │   │   ├── schema.ts         # Drizzle/Prisma schema
│   │   │   └── migrations/
│   │   │
│   │   ├── agents/
│   │   │   ├── index.ts          # Agent orchestration
│   │   │   ├── base-agent.ts     # Base agent class
│   │   │   ├── market-assessment.ts
│   │   │   ├── competitive-analysis.ts
│   │   │   ├── local-contacts.ts
│   │   │   ├── business-plan.ts
│   │   │   ├── landing-page.ts
│   │   │   ├── outreach.ts
│   │   │   ├── volunteer-recruitment.ts
│   │   │   └── advertising.ts
│   │   │
│   │   ├── stripe/
│   │   │   ├── client.ts         # Stripe client
│   │   │   └── actions.ts        # Payment actions
│   │   │
│   │   ├── auth/
│   │   │   ├── config.ts         # NextAuth config
│   │   │   └── utils.ts
│   │   │
│   │   └── utils/
│   │       ├── cn.ts             # Classname utility
│   │       └── format.ts         # Formatting helpers
│   │
│   ├── data/
│   │   ├── playbooks/            # Playbook definitions (can be JSON or TS)
│   │   │   ├── index.ts          # Export all playbooks
│   │   │   ├── food-access/
│   │   │   │   ├── community-grocery-coop.ts
│   │   │   │   ├── food-rescue-network.ts
│   │   │   │   └── urban-farm.ts
│   │   │   ├── education/
│   │   │   │   ├── tutoring-program.ts
│   │   │   │   └── skills-bootcamp.ts
│   │   │   ├── housing/
│   │   │   │   └── housing-coop.ts
│   │   │   ├── healthcare/
│   │   │   │   └── community-clinic.ts
│   │   │   └── energy/
│   │   │       └── community-solar.ts
│   │   │
│   │   └── steps/                # Step definitions
│   │       ├── index.ts
│   │       ├── market-assessment.ts
│   │       ├── competitive-analysis.ts
│   │       ├── local-contacts.ts
│   │       ├── business-plan.ts
│   │       ├── landing-page.ts
│   │       ├── outreach.ts
│   │       ├── volunteer-recruitment.ts
│   │       └── advertising.ts
│   │
│   └── types/
│       ├── playbook.ts           # Playbook type definitions
│       ├── venture.ts            # Venture type definitions
│       ├── step.ts               # Step type definitions
│       ├── user.ts               # User type definitions
│       └── contribution.ts       # Contribution type definitions
│
├── public/
│   ├── images/
│   │   └── categories/           # Category icons/images
│   └── favicon.ico
│
├── prisma/                       # If using Prisma
│   └── schema.prisma
│
├── drizzle/                      # If using Drizzle
│   └── schema.ts
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── components.json               # shadcn/ui config
```

## Key Files Explained

### `/src/lib/agents/` - Agent System
This is where the AI magic happens. Each agent file handles a specific step:

```typescript
// Example: market-assessment.ts
export async function executeMarketAssessment(
  venture: Venture,
  playbook: Playbook
): Promise<StepArtifact> {
  // 1. Construct prompt with location + playbook context
  // 2. Call Claude API with web search enabled
  // 3. Parse and structure the response
  // 4. Return artifact (report)
}
```

### `/src/data/playbooks/` - Playbook Definitions
Static data defining each playbook:

```typescript
// Example: community-grocery-coop.ts
export const communityGroceryCoop: Playbook = {
  id: 'food-community-grocery-coop',
  name: 'Community Grocery Co-op',
  category: 'food_access',
  description: '...',
  expectedImpact: 'Reduces grocery costs 15-25%...',
  startupCostRange: { min: 50000, max: 250000 },
  // ...
};
```

### `/src/data/steps/` - Step Definitions
Reusable step templates with agent instructions:

```typescript
// Example: market-assessment.ts
export const marketAssessmentStep: StepDefinition = {
  id: 'market-assessment',
  name: 'Market Assessment',
  description: 'Analyze local market for gaps and opportunities',
  estimatedCost: 25,
  estimatedDuration: '5-10 minutes',
  agentInstructions: `
    You are analyzing the market for a {{playbook.name}} in {{venture.location}}.
    Search for and analyze:
    1. Local demographics and population data
    2. Existing services in this category
    3. Identified gaps and underserved areas
    4. Demand indicators and community need signals
    ...
  `,
};
```

## Database Schema (Simplified)

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR,
  location VARCHAR,
  motivations TEXT,
  impact_interests TEXT[], -- categories
  lived_experience TEXT,
  expertise TEXT[],
  budget_range JSONB,
  credits INTEGER DEFAULT 0,
  membership_tier VARCHAR DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Ventures
CREATE TABLE ventures (
  id UUID PRIMARY KEY,
  playbook_id VARCHAR NOT NULL,
  launcher_id UUID REFERENCES users(id),
  name VARCHAR NOT NULL,
  location VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'draft',
  current_step VARCHAR,
  funding_received INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Completed Steps (with artifacts)
CREATE TABLE venture_steps (
  id UUID PRIMARY KEY,
  venture_id UUID REFERENCES ventures(id),
  step_id VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'pending',
  artifact JSONB, -- The output of the step
  executed_at TIMESTAMP,
  cost INTEGER
);

-- Contributions
CREATE TABLE contributions (
  id UUID PRIMARY KEY,
  venture_id UUID REFERENCES ventures(id),
  step_id VARCHAR,
  contributor_name VARCHAR NOT NULL,
  contributor_email VARCHAR,
  amount INTEGER NOT NULL,
  stripe_payment_id VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Environment Variables

```bash
# .env.example

# Database
DATABASE_URL=postgresql://...

# Auth
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Optional: External search API
TAVILY_API_KEY=tvly-...
```
