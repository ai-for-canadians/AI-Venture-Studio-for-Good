# Playbook Writer Skill

Creates new social impact playbooks by researching successful models and adapting them for Canadian communities.

## When to Use

Use this skill when:
- User wants to add a new playbook to the catalog
- User describes a social impact model that doesn't exist yet
- User wants to document a successful local initiative as a playbook

## Process

### 1. Research Phase

First, gather information about the social impact model:

```
Research checklist:
- [ ] Understand the core problem being addressed
- [ ] Identify 3-5 successful implementations (prefer Canadian examples)
- [ ] Document typical startup costs and timelines
- [ ] List required expertise and key partnerships
- [ ] Find relevant Canadian regulations/context
```

Use web search to find:
- Academic papers on the model's effectiveness
- News articles about successful implementations
- Organization websites of existing programs
- Canadian government programs that support this type of venture

### 2. Structure the Playbook

Every playbook must follow the `Playbook` type defined in `src/types/playbook.ts`:

```typescript
interface Playbook {
  id: string                    // Format: "category-kebab-case-name"
  name: string                  // Human-readable title
  category: Category            // One of: food_access, education, housing, healthcare, energy
  description: string           // 2-3 paragraph overview (use template literals)
  problemAddressed: string      // The specific problem this solves
  expectedImpact: string        // Quantified outcomes (X people served, Y% improvement)
  startupCostRange: {
    min: number
    max: number
    currency: "CAD"
  }
  timelineMonths: {
    min: number
    max: number
  }
  requiredExpertise: string[]   // 5-7 key skills needed
  successStories: SuccessStory[] // 2-4 Canadian examples
  stepSequence: string[]        // Use standard steps from src/data/steps/
  tags: string[]                // 5-8 searchable keywords
}
```

### 3. Writing Guidelines

**Description** (3 paragraphs):
1. What it is and how it works
2. Why it matters and who it helps
3. What makes it effective / unique value proposition

**Problem Addressed**:
- Be specific about Canadian context
- Include statistics if available
- Name the populations most affected

**Expected Impact**:
- Use ranges (e.g., "500-2,000 people served")
- Include multiple metrics (reach, outcomes, jobs created)
- Be realistic based on research

**Success Stories**:
- Prefer Canadian locations
- Include year of implementation
- Summarize key outcomes in one line

### 4. File Location

Save the playbook file at:
```
src/data/playbooks/{category}/{kebab-case-name}.ts
```

Then add the export to `src/data/playbooks/index.ts`.

### 5. Validation

Before finalizing, verify:
- [ ] All fields are populated
- [ ] Cost estimates are reasonable for Canadian context
- [ ] Timeline is realistic
- [ ] Success stories are verifiable
- [ ] Tags will help with search/matching
- [ ] Step sequence uses existing steps from `src/data/steps/`

## Example Output

```typescript
import type { Playbook } from "@/types"

export const communityFridge: Playbook = {
  id: "food-community-fridge",
  name: "Community Fridge Network",
  category: "food_access",
  description: `A network of publicly accessible refrigerators...`,
  problemAddressed: "Food insecurity affects 1 in 8 Canadians...",
  expectedImpact: "Rescues 500-2,000 kg of food monthly...",
  startupCostRange: { min: 5000, max: 15000, currency: "CAD" },
  timelineMonths: { min: 2, max: 4 },
  requiredExpertise: [...],
  successStories: [...],
  stepSequence: ["market-assessment", "local-contacts", ...],
  tags: ["food", "fridge", "food rescue", ...],
}
```

## Commands

After creating a playbook, run:
```bash
npm run build
```

To verify the playbook compiles and integrates correctly.
