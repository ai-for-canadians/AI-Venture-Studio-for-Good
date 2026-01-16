# Step Executor Skill

Executes AI agent steps for ventures, generating customized artifacts based on the playbook, location, and user context.

## When to Use

Use this skill when:
- User wants to run an AI agent step for their venture
- User asks to generate a market assessment, business plan, or other step artifact
- User wants to test step execution functionality

## Prerequisites

Before executing steps, ensure you have:
1. The venture details (playbook, location, user motivations)
2. The step definition from `src/data/steps/`
3. API access to Claude (Anthropic API key required)

## Step Execution Process

### 1. Load Context

Gather all relevant context for the step:

```typescript
interface StepContext {
  // Venture info
  ventureName: string
  playbookId: string
  playbookName: string
  location: string           // City, Province

  // User info
  userMotivations: string
  userExpertise: string[]
  userLivedExperience: string

  // Step info
  stepId: string
  stepName: string
  stepDescription: string
  agentInstructions: string
}
```

### 2. Build the Prompt

Each step has specific agent instructions in `src/data/steps/`. Combine these with context:

```
System: You are an AI agent helping launch a social impact venture in Canada.

Context:
- Venture: {ventureName} ({playbookName})
- Location: {location}
- User Motivations: {userMotivations}
- User Expertise: {userExpertise}

Step: {stepName}
{stepDescription}

Instructions:
{agentInstructions}

Generate the requested artifact, customized for the specific location and context.
All research should focus on Canadian organizations, regulations, and resources.
Include specific names, addresses, and contact information when available.
```

### 3. Execute with Claude API

```typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

async function executeStep(context: StepContext): Promise<string> {
  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: buildPrompt(context)
      }
    ]
  });

  return message.content[0].text;
}
```

### 4. Parse and Store Artifact

The output should be stored as a `StepArtifact`:

```typescript
interface StepArtifact {
  type: "markdown" | "json" | "html"
  title: string
  content: string
  generatedAt: Date
}
```

### 5. Step-Specific Guidelines

Each step has unique requirements:

| Step | Focus | Key Outputs |
|------|-------|-------------|
| market-assessment | Local demographics, need validation | Population stats, demand indicators |
| competitive-analysis | Existing organizations | Competitor profiles, gaps identified |
| local-contacts | Stakeholders, partners | Contact list with names/orgs/emails |
| business-plan | Financials, operations | Budget, timeline, staffing plan |
| landing-page | Marketing copy | Headlines, CTAs, feature descriptions |
| outreach | Communication templates | Email templates, social posts |
| volunteer-recruitment | Volunteer roles | Job descriptions, requirements |
| advertising | Paid marketing | Ad copy, targeting recommendations |

### 6. Quality Checks

Before returning the artifact:
- [ ] Content is specific to the location (not generic)
- [ ] Canadian context is maintained (healthcare, regulations, currency)
- [ ] Actual organizations/contacts are named when possible
- [ ] Format matches expected output type
- [ ] Length is appropriate (2000-4000 words for detailed steps)

## API Integration

The step executor requires these environment variables:

```env
ANTHROPIC_API_KEY=sk-ant-...
```

## Error Handling

Handle common errors:
- API rate limits: Implement exponential backoff
- Token limits: Chunk long contexts or summarize
- Invalid responses: Retry with clarified instructions

## Cost Tracking

Each step execution costs credits. Track usage:
- Typical step: 25 credits (~$0.25)
- Complex steps (business-plan): 50 credits (~$0.50)

Deduct credits from user account after successful execution.
