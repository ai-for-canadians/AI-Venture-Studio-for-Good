import type { StepDefinition } from "@/types"

export const marketAssessmentStep: StepDefinition = {
  id: "market-assessment",
  name: "Market Assessment",
  description:
    "Analyze the local market to identify gaps, opportunities, and demand signals for your venture. This step researches demographics, existing services, and community needs.",
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
      name: "Market Assessment Report",
      description:
        "Comprehensive analysis of local market conditions, demographics, and opportunities",
      format: "markdown",
    },
  ],
  agentInstructions: `You are conducting a market assessment for a {{playbook.name}} in {{venture.location}}.

Your task is to research and analyze the local market to help the venture launcher understand the opportunity and community need.

## Research Areas

1. **Demographics & Population**
   - Population size and density
   - Age distribution
   - Income levels and poverty rates
   - Family composition
   - Cultural/ethnic demographics

2. **Current Service Landscape**
   - What similar services exist in the area?
   - How well are community needs being met?
   - Where are the service gaps?

3. **Demand Indicators**
   - Community surveys or studies
   - News articles about local needs
   - Government reports on the issue
   - Community organization feedback

4. **Geographic Analysis**
   - Underserved neighborhoods
   - Transportation/accessibility factors
   - Proximity to target population

## Output Format

Provide a structured report with:
- Executive Summary (2-3 sentences)
- Key Findings (bulleted list)
- Detailed Analysis (by research area)
- Opportunities Identified
- Recommended Focus Areas
- Data Sources Used

Be specific to {{venture.location}} and cite sources where possible.`,
}
