# AI Agents for Venture Studio

This directory contains the AI agents that power step execution for ventures.

## Architecture

```
src/lib/agents/
├── index.ts                    # Registry and orchestration
├── types.ts                    # Shared type definitions
├── market-research-agent.ts    # Market assessment step
├── competitor-mapper-agent.ts  # Competitive analysis step
├── contact-finder-agent.ts     # Local contacts step
├── business-plan-agent.ts      # Business plan step
└── copywriter-agent.ts         # Landing page, outreach, volunteer, advertising steps
```

## Agent Overview

| Agent | Steps Handled | Description |
|-------|---------------|-------------|
| Market Research | `market-assessment` | Analyzes local demographics, demand, and market conditions |
| Competitor Mapper | `competitive-analysis` | Identifies existing organizations and positioning opportunities |
| Contact Finder | `local-contacts` | Creates directory of stakeholders, partners, and funders |
| Business Plan | `business-plan` | Generates comprehensive business plans with financials |
| Copywriter | `landing-page`, `outreach`, `volunteer-recruitment`, `advertising` | Creates all marketing and communication materials |

## Usage

### Execute a Step

```typescript
import { executeStep } from "@/lib/agents"

const result = await executeStep({
  ventureId: "venture-123",
  ventureName: "Community Grocery Co-op",
  playbookId: "food-community-grocery-coop",
  playbookName: "Community Grocery Co-op",
  playbookDescription: "A member-owned grocery store...",
  location: "Toronto, ON",
  province: "ON",
  country: "Canada",
  userMotivations: "I want to improve food access in my neighborhood",
  userExpertise: ["retail", "community organizing"],
  userLivedExperience: "Grew up in a food desert",
  stepId: "market-assessment",
  stepName: "Market Assessment",
  stepDescription: "Analyze your local market...",
})

if (result.success) {
  console.log(result.artifact.content)
} else {
  console.error(result.error)
}
```

### Get Agent Info

```typescript
import { getAgentForStep, estimateStepCost, getAllAgents } from "@/lib/agents"

// Get agent for a specific step
const agent = getAgentForStep("market-assessment")
console.log(agent.name) // "Market Research Agent"

// Get cost estimate
const cost = estimateStepCost("business-plan")
console.log(cost) // 50 (credits)

// List all agents
const agents = getAllAgents()
agents.forEach(a => console.log(a.name))
```

## Agent Context

All agents receive the same context structure:

```typescript
interface AgentContext {
  // Venture info
  ventureId: string
  ventureName: string
  playbookId: string
  playbookName: string
  playbookDescription: string

  // Location
  location: string      // "City, Province"
  province: string      // "ON", "BC", etc.
  country: "Canada"

  // User info
  userMotivations: string
  userExpertise: string[]
  userLivedExperience: string
  userBudget?: { min: number; max: number; currency: "CAD" }

  // Step info
  stepId: string
  stepName: string
  stepDescription: string

  // Previous outputs for context continuity
  previousArtifacts?: Record<string, string>
}
```

## Agent Output

All agents return a standardized output:

```typescript
interface AgentOutput {
  success: boolean
  artifact: {
    type: "markdown" | "json" | "html"
    title: string
    content: string
    sections?: { id: string; title: string; content: string }[]
  }
  metadata: {
    tokensUsed: number
    executionTimeMs: number
    model: string
    sources?: string[]
  }
  error?: string
}
```

## Adding a New Agent

1. Create a new file: `src/lib/agents/my-new-agent.ts`
2. Implement the required exports:
   ```typescript
   export const config: AgentConfig = { ... }
   export async function execute(context: AgentContext): Promise<AgentOutput> { ... }
   ```
3. Register in `index.ts`:
   ```typescript
   import * as myNewAgent from "./my-new-agent"

   // Add to registry
   const agentRegistry = {
     ...
     "my-new": { config: myNewAgent.config, execute: myNewAgent.execute }
   }

   // Map steps to agent
   const stepToAgentMap = {
     ...
     "new-step-id": "my-new"
   }
   ```

## API Integration

Currently, agents generate demo content. To enable real AI execution:

1. Add Anthropic API key to environment:
   ```env
   ANTHROPIC_API_KEY=sk-ant-...
   ```

2. Update agent execute functions to call Claude API:
   ```typescript
   import Anthropic from '@anthropic-ai/sdk'

   const client = new Anthropic()

   const message = await client.messages.create({
     model: config.model,
     max_tokens: config.maxTokens,
     messages: [{ role: "user", content: prompt }]
   })
   ```

## Cost Structure

| Step | Credits | Approx. Cost |
|------|---------|--------------|
| market-assessment | 25 | $0.25 |
| competitive-analysis | 25 | $0.25 |
| local-contacts | 25 | $0.25 |
| business-plan | 50 | $0.50 |
| landing-page | 25 | $0.25 |
| outreach | 25 | $0.25 |
| volunteer-recruitment | 25 | $0.25 |
| advertising | 25 | $0.25 |

**Total for all 8 steps: 225 credits (~$2.25)**
