# AI Venture Studio for Good

Launch proven social impact ventures in your community, powered by AI agents.

## What is this?

A platform where anyone can:
1. **Browse proven playbooks** - Vetted business models for social impact (food access, education, healthcare, housing, energy)
2. **Launch in your region** - Pick a playbook and deploy it in your community
3. **Let AI do the work** - Pay to execute agent steps that validate and build your venture
4. **Get community support** - Contributors can fund specific steps on your venture

## Documentation

| File | Description |
|------|-------------|
| [SPEC.md](./SPEC.md) | Full product specification with data models |
| [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) | File/folder structure and schema |
| [BUILD_PLAN.md](./BUILD_PLAN.md) | Phased build plan with Claude Code prompts |

## Quick Start

```bash
# Create the project
npx create-next-app@latest ai-venture-studio-for-good --typescript --tailwind --app --src-dir
cd ai-venture-studio-for-good

# Install shadcn/ui
npx shadcn@latest init

# Install dependencies
npm install @anthropic-ai/sdk stripe next-auth drizzle-orm

# Copy these spec files into your project root
# Then start building with Claude Code using BUILD_PLAN.md
```

## Tech Stack

- **Frontend:** Next.js 14 + Tailwind + shadcn/ui
- **Backend:** Next.js API routes
- **Database:** PostgreSQL (Supabase/Neon)
- **Auth:** NextAuth.js
- **Payments:** Stripe
- **AI:** Anthropic Claude API

## MVP Features

- [ ] Playbook catalog with categories
- [ ] User registration with motivation capture
- [ ] Venture creation from playbooks
- [ ] 8 AI agent steps (market assessment → advertising)
- [ ] Pay-per-step execution
- [ ] Contributor funding for steps
- [ ] Public venture pages

## Business Model

- Users pay per agent step execution ($25-100/step)
- Platform takes 20% fee
- Optional membership tiers for credits
- Contributors fund specific regional deployments

---

Built by [AI for Canadians](https://aiforcanadians.ca)
