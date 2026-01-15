import type { StepDefinition } from "@/types"

export const competitiveAnalysisStep: StepDefinition = {
  id: "competitive-analysis",
  name: "Competitive Analysis",
  description:
    "Identify existing organizations and businesses operating in your space locally. Understand their strengths, weaknesses, and find opportunities for differentiation.",
  estimatedCost: 25,
  estimatedDuration: "5-10 minutes",
  inputsRequired: [
    {
      name: "Location",
      description: "City, neighborhood, or region where the venture will operate",
      required: true,
    },
    {
      name: "Playbook Category",
      description: "The type of social impact venture being launched",
      required: true,
    },
  ],
  outputsProduced: [
    {
      name: "Competitive Landscape Report",
      description:
        "Analysis of local competitors, their offerings, and differentiation opportunities",
      format: "markdown",
    },
  ],
  agentInstructions: `You are conducting a competitive analysis for a {{playbook.name}} in {{venture.location}}.

Your task is to identify and analyze existing organizations that serve similar needs in the local area.

## Research Areas

1. **Direct Competitors**
   - Organizations offering the same or very similar services
   - Their locations, size, and reach
   - How long they've been operating

2. **Indirect Competitors**
   - Organizations serving the same population differently
   - Alternative solutions community members use
   - Government programs addressing similar needs

3. **Competitor Analysis (for each major competitor)**
   - Services offered
   - Pricing/fee structure
   - Target population
   - Strengths and reputation
   - Weaknesses or gaps
   - Reviews/community feedback

4. **White Space Analysis**
   - Unmet needs not addressed by existing players
   - Underserved populations or neighborhoods
   - Service improvements that could differentiate

## Output Format

Provide a structured report with:
- Executive Summary
- Competitor Profiles (2-5 main competitors)
  - Name, location, website
  - Services offered
  - Strengths/Weaknesses
- Competitive Positioning Map
- Differentiation Opportunities
- Recommended Positioning Strategy

Be specific to {{venture.location}} and include contact information where available.`,
}
