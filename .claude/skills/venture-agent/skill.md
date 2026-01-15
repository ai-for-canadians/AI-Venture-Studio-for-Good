# Venture Agent Skill

Execute AI agent steps for social impact ventures. This skill runs the 8 core agent steps using Claude API with web search capabilities.

## Usage

```
/venture-agent <step-id> --venture <venture-id> [--location <location>]
```

## Available Steps

1. `market-assessment` - Analyze local market gaps and opportunities
2. `competitive-analysis` - Identify local competitors and differentiation
3. `local-contacts` - Find partners, suppliers, and stakeholders
4. `business-plan` - Generate localized business plan
5. `landing-page` - Create website copy and structure
6. `outreach` - Generate email templates and campaign sequences
7. `volunteer-recruitment` - Create volunteer materials and processes
8. `advertising` - Generate ad copy and campaign setup guides

## Implementation

When this skill is invoked:

1. Load the venture details from the database (or demo data)
2. Load the playbook associated with the venture
3. Load the step definition with agent instructions
4. Construct the prompt with venture context (location, playbook type, previous step outputs)
5. Call Claude API with web search enabled for research steps
6. Parse and format the response as a structured artifact
7. Store the artifact in the venture_steps table
8. Return the formatted output to the user

## Agent Prompt Template

```
You are an AI agent helping launch a {{playbook.name}} in {{venture.location}}.

{{step.agentInstructions}}

Previous step outputs:
{{previousArtifacts}}

Launcher profile:
- Motivations: {{user.motivations}}
- Budget: {{user.budgetRange}}
- Expertise: {{user.expertise}}

Generate a comprehensive {{step.name}} that is specific to {{venture.location}}.
```

## Output Format

All agent outputs should be in Markdown format with:
- Clear section headings
- Bullet points for lists
- Tables where appropriate
- Specific, actionable recommendations
- Citations/sources where applicable
