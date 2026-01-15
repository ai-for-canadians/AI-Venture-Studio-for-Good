# AI Venture Studio for Good - Build Plan

## Overview
This document outlines a phased approach to building the MVP. Each phase is designed to be completable in roughly 1-2 focused sessions with Claude Code.

---

## Phase 1: Foundation (Day 1-2)
**Goal:** Basic app structure with playbook browsing

### Tasks
1. **Project Setup**
   - Initialize Next.js 14 with App Router
   - Configure Tailwind CSS
   - Install and configure shadcn/ui
   - Set up project structure per PROJECT_STRUCTURE.md

2. **Playbook Data**
   - Create TypeScript types for Playbook, Step
   - Build 3 initial playbooks (1 per category to start):
     - Food Access: Community Grocery Co-op
     - Education: Tutoring Program
     - Healthcare: Community Clinic
   - Create step definitions for the 8 core steps

3. **Public Pages**
   - Landing page with value prop
   - Playbook browse page with category filter
   - Playbook detail page showing steps and info

### Deliverable
A browsable catalog of playbooks that explains what each does and shows the step sequence.

### Claude Code Prompts
```
1. "Initialize a Next.js 14 project with TypeScript, Tailwind, and shadcn/ui. Set up the folder structure from PROJECT_STRUCTURE.md"

2. "Create the TypeScript types for Playbook and Step based on SPEC.md"

3. "Create 3 sample playbooks with full data: Community Grocery Co-op, Tutoring Program, Community Clinic"

4. "Build the landing page with hero section explaining the platform"

5. "Build the playbook browse page with cards and category filtering"

6. "Build the playbook detail page showing all info and step sequence"
```

---

## Phase 2: User System (Day 2-3)
**Goal:** Users can register, share motivations, and see matched playbooks

### Tasks
1. **Database Setup**
   - Set up PostgreSQL (Supabase or Neon)
   - Create schema for users
   - Configure Drizzle or Prisma

2. **Authentication**
   - Set up NextAuth.js with email/password
   - Create login and register pages

3. **Onboarding Flow**
   - Motivation capture form
   - Impact interest selector (categories)
   - Budget and expertise inputs
   - Store in user profile

4. **Playbook Matching**
   - Simple matching algorithm based on motivations/interests
   - "Recommended for you" section on playbook browse

### Deliverable
Users can create accounts, share their motivations, and see playbooks matched to their interests.

### Claude Code Prompts
```
1. "Set up Supabase database and configure Drizzle ORM with the user schema from PROJECT_STRUCTURE.md"

2. "Set up NextAuth.js with email/password authentication"

3. "Build the onboarding flow with motivation form, impact interest selector, and budget/expertise inputs"

4. "Add playbook matching logic that prioritizes playbooks based on user's impact_interests"

5. "Update playbook browse page to show 'Recommended for You' section for logged-in users"
```

---

## Phase 3: Venture Creation (Day 3-4)
**Goal:** Users can create ventures and see their progress dashboard

### Tasks
1. **Database Extensions**
   - Add ventures table
   - Add venture_steps table

2. **Venture Creation Flow**
   - Select playbook → Name venture → Set location
   - Create venture record in database

3. **Dashboard**
   - List user's ventures
   - Venture detail page showing:
     - Progress through steps
     - Current step highlighted
     - Completed step artifacts

4. **Step Display**
   - Step cards showing status (locked, available, completed)
   - "Execute" button for available steps (non-functional yet)

### Deliverable
Users can create ventures from playbooks and see them in their dashboard with step progress.

### Claude Code Prompts
```
1. "Add ventures and venture_steps tables to the database schema"

2. "Build the venture creation flow: select playbook, name it, set location"

3. "Build the dashboard page showing user's ventures with progress indicators"

4. "Build the venture detail page showing all steps with their status"
```

---

## Phase 4: Agent Execution (Day 4-6)
**Goal:** Users can execute steps and receive AI-generated artifacts

### Tasks
1. **Agent Infrastructure**
   - Set up Anthropic Claude API client
   - Create base agent execution function
   - Handle streaming responses (optional for MVP)

2. **Implement First 3 Agents**
   - Market Assessment agent
   - Competitive Analysis agent
   - Key Local Contacts agent

3. **Step Execution UI**
   - Loading state during execution
   - Artifact display after completion
   - Store artifact in database

4. **Artifact Viewer**
   - Render markdown/HTML artifacts
   - Download option

### Deliverable
Users can execute the first 3 steps and see real AI-generated reports.

### Claude Code Prompts
```
1. "Set up Anthropic Claude API client in /lib/agents with error handling"

2. "Create the Market Assessment agent that searches for local market data and generates a report"

3. "Create the Competitive Analysis agent that identifies local competitors"

4. "Create the Key Local Contacts agent that finds relevant partners and stakeholders"

5. "Build the step execution UI with loading state and artifact display"

6. "Add artifact storage to the database and display on venture page"
```

---

## Phase 5: Payments (Day 6-7)
**Goal:** Users pay to execute steps

### Tasks
1. **Stripe Setup**
   - Configure Stripe account
   - Set up API keys
   - Create products/prices for steps

2. **Payment Flow**
   - "Pay to Execute" button on step
   - Stripe Checkout integration
   - Webhook handling for payment confirmation

3. **Credit System (Simple)**
   - Track credits on user
   - Deduct credit on step execution
   - Option to buy credits

### Deliverable
Users must pay (or use credits) to execute steps.

### Claude Code Prompts
```
1. "Set up Stripe integration with client and webhook handling"

2. "Create the payment flow for step execution using Stripe Checkout"

3. "Add credits field to user and implement credit deduction on step execution"

4. "Build a simple 'Buy Credits' page with Stripe Checkout"
```

---

## Phase 6: Contributors (Day 7-8)
**Goal:** Contributors can fund specific steps on ventures

### Tasks
1. **Public Venture Page**
   - Show venture progress publicly
   - Display which steps need funding
   - Show contributor names

2. **Contribution Flow**
   - Select step to fund
   - Enter name and amount
   - Stripe payment
   - Record contribution

3. **Contributor Display**
   - List contributors on venture page
   - Show which step each funded

### Deliverable
Anyone can visit a venture's public page and fund a specific step.

### Claude Code Prompts
```
1. "Build the public venture page showing progress and funding needs"

2. "Create the contribution flow with name input and Stripe payment"

3. "Add contributions table and display contributors on venture page"

4. "Send notification to launcher when their venture receives a contribution"
```

---

## Phase 7: Remaining Agents (Day 8-10)
**Goal:** Complete all 8 core agent steps

### Tasks
1. **Business Plan Agent**
   - Synthesize previous step outputs
   - Generate structured business plan

2. **Landing Page Agent**
   - Generate copy and structure
   - (Future: actual deployment)

3. **Outreach Agent**
   - Generate email templates
   - Create outreach sequence

4. **Volunteer Recruitment Agent**
   - Create volunteer descriptions
   - Generate recruitment materials

5. **Advertising Agent**
   - Generate ad copy
   - Provide targeting recommendations

### Deliverable
All 8 steps are executable with real AI output.

### Claude Code Prompts
```
1. "Create the Business Plan agent that synthesizes all previous artifacts into a business plan"

2. "Create the Landing Page agent that generates website copy and structure"

3. "Create the Outreach agent that generates personalized email templates"

4. "Create the Volunteer Recruitment agent"

5. "Create the Advertising agent that generates ad copy and targeting recommendations"
```

---

## Phase 8: Polish (Day 10-12)
**Goal:** Production-ready MVP

### Tasks
1. **UI Polish**
   - Responsive design check
   - Loading states everywhere
   - Error handling and messages
   - Empty states

2. **More Playbooks**
   - Add 2-3 more playbooks per category
   - Total of 10-15 playbooks

3. **Email Notifications**
   - Welcome email
   - Step completion notification
   - Contribution received notification

4. **Analytics**
   - Basic event tracking
   - Venture progress tracking

5. **Deployment**
   - Deploy to Vercel
   - Configure production environment
   - Set up production Stripe

### Deliverable
Deployable MVP ready for initial users.

---

## Quick Start Commands

```bash
# Initial setup
npx create-next-app@latest ai-venture-studio-for-good --typescript --tailwind --app --src-dir

# Navigate to project
cd ai-venture-studio-for-good

# Install shadcn/ui
npx shadcn@latest init

# Install dependencies
npm install @anthropic-ai/sdk stripe next-auth drizzle-orm @neondatabase/serverless

# Add shadcn components
npx shadcn@latest add button card input badge progress tabs avatar
```

---

## Success Criteria for Demo

A successful demo shows:
1. ✅ Browse playbooks by category
2. ✅ Create account with motivations
3. ✅ See matched playbooks
4. ✅ Create a venture from a playbook
5. ✅ Pay to execute a step
6. ✅ See AI-generated artifact
7. ✅ Share venture link
8. ✅ Contributor funds a step
9. ✅ See contributor name on venture page

---

## Notes for Claude Code

When working with Claude Code, reference these files:
- `SPEC.md` - For product requirements and data models
- `PROJECT_STRUCTURE.md` - For file organization
- `BUILD_PLAN.md` - For current phase tasks

Example prompt structure:
```
"I'm building AI Venture Studio for Good. Reference SPEC.md and PROJECT_STRUCTURE.md.

Current phase: [Phase X]
Current task: [Specific task]

[Additional context or requirements]"
```
