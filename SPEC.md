# AI Venture Studio for Good - Product Specification

## Vision
A platform that enables anyone to launch proven social impact ventures in their local community, powered by AI agents that execute the key steps of business validation and launch. Contributors can directly fund specific execution steps, creating a crowdfunded path to local impact.

## Core Value Proposition
"Pick a proven playbook. Tell us your motivation. Let AI agents build it in your community."

---

## Target Users

### Primary: Venture Launcher
Someone who wants to deploy a proven social impact solution in their region.

**Profile:**
- Motivated by lived experience (e.g., grew up food insecure, wants to fix local food access)
- Has some capital or can attract contributors
- Varying levels of business expertise
- Located in Canada (v1) or US (v2)

**User Journey:**
1. Sign up, share motivations and background
2. Browse/get matched to playbooks based on motivations, budget, expertise
3. Select a playbook to deploy in their region
4. Pay to execute agent steps (or use membership credits)
5. Review artifacts, approve/iterate, move to next step
6. Attract contributors to fund additional steps
7. Launch and operate the venture

### Secondary: Contributor
Someone who wants to fund specific regional deployments of social impact ventures.

**Profile:**
- Wants to support local impact with targeted contributions
- Prefers transparency on exactly what their money does
- May be motivated by same categories as launchers

**User Journey:**
1. Browse active ventures by category/region
2. See specific steps that need funding
3. Contribute to a specific step (with name visible)
4. Receive updates on step completion and venture progress

---

## Playbook Catalog

### Categories
1. **Food Access** - Community groceries, food co-ops, urban farms, food rescue
2. **Education** - Tutoring programs, skills training, after-school programs
3. **Housing** - Affordable housing co-ops, community land trusts, housing repair
4. **Healthcare** - Community clinics, mental health access, preventive care
5. **Energy** - Community solar, efficiency programs, renewable co-ops

### Playbook Data Model
Each playbook contains:

| Field | Description | Example |
|-------|-------------|---------|
| `id` | Unique identifier | `food-community-grocery-coop` |
| `name` | Display name | "Community Grocery Co-op" |
| `category` | Category enum | `food_access` |
| `description` | Overview (2-3 paragraphs) | "A member-owned grocery store..." |
| `problem_addressed` | What problem this solves | "Food deserts lack affordable fresh food" |
| `expected_impact` | Measurable outcomes | "Reduces grocery costs 15-25%, increases fresh food access within 1km radius" |
| `startup_cost_range` | Typical capital needed | `{ min: 50000, max: 250000, currency: "CAD" }` |
| `timeline_months` | Typical time to launch | `{ min: 6, max: 18 }` |
| `required_expertise` | Skills needed | `["community organizing", "retail basics", "financial management"]` |
| `success_stories` | Case studies with outcomes | Array of `{ location, year, outcomes, link }` |
| `step_sequence` | Ordered agent steps | Array of step IDs |
| `tags` | Searchable tags | `["cooperative", "retail", "food security"]` |

---

## Agent Step System

### Step Data Model
Each step contains:

| Field | Description |
|-------|-------------|
| `id` | Unique identifier |
| `name` | Display name |
| `description` | What this step accomplishes |
| `estimated_cost` | Cost to execute (in credits or $) |
| `estimated_duration` | Time to complete |
| `inputs_required` | What the launcher must provide |
| `outputs_produced` | Artifacts generated |
| `agent_instructions` | Prompt/workflow for the LLM agent |

### Core Step Sequence (MVP)

#### Step 1: Market Assessment
- **Purpose:** Search local area for market gaps, opportunities, and demand signals
- **Inputs:** Location (city/region), playbook category
- **Outputs:** Market assessment report (local demographics, existing services, identified gaps, demand indicators)
- **Agent Actions:** Web search for local data, analyze census/demographic info, identify underserved areas

#### Step 2: Competitive Analysis
- **Purpose:** Identify who's already operating in this space locally
- **Inputs:** Location, playbook type
- **Outputs:** Competitive landscape report (existing players, their strengths/weaknesses, white space)
- **Agent Actions:** Search for local businesses/nonprofits, analyze their offerings, identify differentiation opportunities

#### Step 3: Key Local Contacts
- **Purpose:** Identify potential partners, suppliers, advisors, and stakeholders
- **Inputs:** Location, playbook type
- **Outputs:** Contact list with relevance notes (potential partners, local government contacts, community leaders, suppliers)
- **Agent Actions:** Search for relevant organizations, chambers of commerce, community groups, potential advisors

#### Step 4: Business Plan Draft
- **Purpose:** Generate a localized business plan using playbook template + local data
- **Inputs:** All previous step outputs, launcher profile, budget
- **Outputs:** Business plan document (executive summary, market analysis, operations plan, financial projections, launch timeline)
- **Agent Actions:** Synthesize previous research, apply playbook template, generate financial models

#### Step 5: Landing Page & Interest Capture
- **Purpose:** Create a web presence to validate demand and capture interested community members
- **Inputs:** Business plan, branding preferences
- **Outputs:** Deployed landing page with email capture, shareable link
- **Agent Actions:** Generate copy, design page, deploy to hosting, set up email collection

#### Step 6: Outreach Campaign
- **Purpose:** Contact potential customers, partners, and community members to generate interest
- **Inputs:** Contact list, landing page, key messages
- **Outputs:** Outreach templates (email, social), campaign tracking, initial responses
- **Agent Actions:** Draft personalized outreach, prepare campaign sequences, track engagement

#### Step 7: Volunteer Recruitment
- **Purpose:** Find and organize community volunteers to support the venture
- **Inputs:** Volunteer needs, location, landing page
- **Outputs:** Volunteer recruitment materials, volunteer sign-up flow, initial volunteer list
- **Agent Actions:** Create volunteer descriptions, set up sign-up process, draft recruitment messaging

#### Step 8: Local Advertising
- **Purpose:** Run targeted ads to build awareness and drive traffic
- **Inputs:** Target audience, budget, landing page, key messages
- **Outputs:** Ad creative, campaign setup guide, performance tracking
- **Agent Actions:** Generate ad copy/creative, recommend targeting, provide setup instructions

### Future Steps (Post-MVP)
- Incorporation & legal setup assistance
- Funding application drafting (grants, loans)
- Supplier negotiation support
- Hiring/team building
- Launch event coordination
- Ongoing operations support

---

## Venture (Project) Data Model

A venture is a specific regional deployment of a playbook.

| Field | Description |
|-------|-------------|
| `id` | Unique identifier |
| `playbook_id` | Which playbook this deploys |
| `launcher_id` | Who's running this |
| `name` | Venture name |
| `location` | City/region |
| `status` | `draft`, `active`, `launched`, `paused` |
| `current_step` | Which step they're on |
| `completed_steps` | Array of completed step IDs with artifacts |
| `funding_received` | Total contributions |
| `contributors` | Array of `{ name, amount, step_funded, date }` |
| `created_at` | Timestamp |
| `updated_at` | Timestamp |

---

## User Data Model

### Launcher Profile

| Field | Description |
|-------|-------------|
| `id` | Unique identifier |
| `name` | Display name |
| `email` | Contact email |
| `location` | City/region |
| `motivations` | Free text on why they want to do this |
| `impact_interests` | Categories they care about |
| `lived_experience` | Relevant personal experience |
| `expertise` | Skills they bring |
| `budget_range` | Available capital |
| `time_commitment` | Hours/week available |
| `ventures` | Array of venture IDs |
| `credits` | Available execution credits |
| `membership_tier` | `free`, `starter`, `pro` |

### Contributor Profile

| Field | Description |
|-------|-------------|
| `id` | Unique identifier |
| `name` | Display name (shown on contributions) |
| `email` | Contact email |
| `contributions` | Array of `{ venture_id, step_id, amount, date }` |

---

## Payment & Credits System

### Pricing Model (MVP)
- **Pay-per-step:** Each step has a fixed cost (e.g., $25-$100 depending on complexity)
- **Platform fee:** 20% of step execution cost
- **Membership tiers:**
  - Free: Browse playbooks, create profile
  - Starter ($29/mo): 3 step credits/month
  - Pro ($99/mo): 12 step credits/month + priority support

### Contribution Model
- Contributors fund specific steps on specific ventures
- Minimum contribution: $10
- Contributors see their name on the venture page
- Future: equity/reward tracking (post-MVP)

---

## Technical Architecture (Recommended)

### Stack
- **Frontend:** Next.js 14 (App Router) + Tailwind CSS + shadcn/ui
- **Backend:** Next.js API routes + Server Actions
- **Database:** PostgreSQL (via Supabase or Neon)
- **Auth:** NextAuth.js or Clerk
- **Payments:** Stripe
- **AI/Agents:** Anthropic Claude API (for step execution)
- **Hosting:** Vercel

### Key Integrations
- **Claude API:** Powers all agent step execution
- **Web Search:** For market assessment, competitive analysis (via Claude's web search or Tavily)
- **Stripe:** Payment processing for steps and contributions
- **Email:** Resend or SendGrid for notifications

---

## MVP Scope

### In Scope (v1)
- [ ] User registration with motivation/profile capture
- [ ] Playbook catalog (5-10 pre-built playbooks across categories)
- [ ] Playbook detail view with step sequence
- [ ] Venture creation (select playbook + location)
- [ ] Step execution via Claude agent
- [ ] Artifact storage and display
- [ ] Pay-per-step via Stripe
- [ ] Contributor funding of specific steps
- [ ] Basic venture public page showing progress + contributors
- [ ] Dashboard for launcher to manage ventures

### Out of Scope (v1)
- Membership/subscription billing
- Equity tracking for contributors
- Advanced matching algorithm
- Mobile app
- Multi-language support
- Detailed analytics/impact tracking
- Community features (forums, messaging)

---

## Success Metrics

### Launch Metrics
- Ventures created
- Steps executed
- Contributions received
- Launchers onboarded

### Impact Metrics (Future)
- Ventures reaching "launched" status
- Revenue generated by launched ventures
- Jobs created
- People served by launched ventures
- Cost savings delivered to communities
