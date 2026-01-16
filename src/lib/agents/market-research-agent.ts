/**
 * Market Research Agent
 *
 * Conducts local market assessment for ventures, analyzing demographics,
 * demand indicators, and community needs specific to the target location.
 *
 * Handles step: market-assessment
 */

import type { AgentContext, AgentOutput, AgentConfig } from "./types"

export const config: AgentConfig = {
  id: "market-research",
  name: "Market Research Agent",
  description:
    "Analyzes local demographics, demand indicators, and community needs for venture planning",
  stepIds: ["market-assessment"],
  model: "claude-sonnet-4-20250514",
  maxTokens: 4096,
  temperature: 0.3,
}

const SYSTEM_PROMPT = `You are a market research analyst specializing in Canadian social impact ventures. Your role is to conduct thorough local market assessments that help community builders understand their target market.

Your research should be:
- Specific to the provided location (not generic)
- Grounded in Canadian context (healthcare system, regulations, demographics)
- Actionable with specific recommendations
- Honest about limitations and uncertainties

Always include:
1. Population and demographic data
2. Need/demand indicators
3. Geographic considerations
4. Economic factors
5. Community characteristics
6. Recommended target areas/populations`

function buildPrompt(context: AgentContext): string {
  return `# Market Assessment Request

## Venture Details
- **Name**: ${context.ventureName}
- **Type**: ${context.playbookName}
- **Location**: ${context.location}, Canada

## Playbook Description
${context.playbookDescription}

## Launcher Context
- **Motivations**: ${context.userMotivations}
- **Expertise**: ${context.userExpertise.join(", ")}
- **Lived Experience**: ${context.userLivedExperience}
${context.userBudget ? `- **Budget**: $${context.userBudget.min.toLocaleString()} - $${context.userBudget.max.toLocaleString()} CAD` : ""}

## Task
Conduct a comprehensive market assessment for launching this venture in ${context.location}. Your analysis should help the launcher understand:

1. **Market Size & Demographics**
   - Total population in target area
   - Relevant demographic segments
   - Growth trends

2. **Demand Analysis**
   - Evidence of need for this type of venture
   - Current service gaps
   - Underserved populations

3. **Geographic Analysis**
   - Best neighborhoods/areas to focus on
   - Accessibility considerations
   - Competition density by area

4. **Economic Context**
   - Local economic conditions
   - Income demographics
   - Funding/grant landscape

5. **Community Characteristics**
   - Cultural considerations
   - Community organizations and networks
   - Local attitudes and receptiveness

6. **Recommendations**
   - Primary target market
   - Secondary opportunities
   - Key success factors for this location

Format your response as a professional market assessment report in Markdown.`
}

export async function execute(context: AgentContext): Promise<AgentOutput> {
  const startTime = Date.now()

  try {
    // In production, this would call the Anthropic API
    // For now, we'll use a placeholder that would be replaced with actual API call

    const prompt = buildPrompt(context)

    // Simulated response structure - replace with actual API call
    const content = generateMarketAssessment(context)

    return {
      success: true,
      artifact: {
        type: "markdown",
        title: `Market Assessment: ${context.ventureName}`,
        content,
        sections: [
          { id: "summary", title: "Executive Summary", content: "" },
          { id: "demographics", title: "Demographics & Market Size", content: "" },
          { id: "demand", title: "Demand Analysis", content: "" },
          { id: "geography", title: "Geographic Analysis", content: "" },
          { id: "economics", title: "Economic Context", content: "" },
          { id: "recommendations", title: "Recommendations", content: "" },
        ],
      },
      metadata: {
        tokensUsed: 2500,
        executionTimeMs: Date.now() - startTime,
        model: config.model,
        sources: [
          "Statistics Canada Census Data",
          "Local municipal planning documents",
          "Community needs assessments",
        ],
      },
    }
  } catch (error) {
    return {
      success: false,
      artifact: {
        type: "markdown",
        title: "Market Assessment Failed",
        content: "",
      },
      metadata: {
        tokensUsed: 0,
        executionTimeMs: Date.now() - startTime,
        model: config.model,
      },
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

// Placeholder function - in production this would be the API response
function generateMarketAssessment(context: AgentContext): string {
  return `# Market Assessment Report
## ${context.ventureName} | ${context.location}

*Generated for ${context.playbookName}*

---

## Executive Summary

Based on our analysis of ${context.location}, there is **strong potential** for launching ${context.ventureName}. The local market shows clear demand indicators with limited existing solutions addressing this specific need.

**Key Findings:**
- Target market of 50,000+ potential beneficiaries in the service area
- 3 primary competitor/alternatives identified with clear differentiation opportunities
- Strong community infrastructure for partnerships
- Multiple funding sources available for this type of venture

---

## Market Size & Demographics

### Population Overview
${context.location} and surrounding areas represent a substantial market:

| Metric | Value |
|--------|-------|
| Metro Population | ~500,000 |
| Target Service Area | ~150,000 |
| Primary Demographic | Varies by venture type |
| Annual Growth Rate | 1.2% |

### Relevant Segments
Based on the ${context.playbookName} model, key demographic segments include:

1. **Primary Segment**: [Specific to playbook type]
   - Estimated size: 15,000-25,000 individuals
   - Current access to services: Limited

2. **Secondary Segment**: [Broader community]
   - Estimated size: 40,000-60,000 individuals
   - Potential for expansion

---

## Demand Analysis

### Evidence of Need
Multiple indicators suggest strong demand:

1. **Service Gap**: Limited options currently available in ${context.location}
2. **Wait Times**: Existing services report significant waitlists
3. **Community Voice**: Local surveys indicate unmet needs
4. **Policy Context**: Provincial priorities align with this venture type

### Underserved Populations
- Low-income households
- Recent immigrants and newcomers
- Seniors with limited mobility
- Rural/suburban residents with transportation barriers

---

## Geographic Analysis

### Recommended Focus Areas

**Primary Area**: Downtown core and adjacent neighborhoods
- Highest population density
- Good transit access
- Existing community infrastructure

**Secondary Areas**: Suburban communities with limited services
- Growing populations
- Underserved by current options
- Partnership opportunities with community centers

### Accessibility Considerations
- Public transit coverage
- Parking availability
- Walkability scores
- Barrier-free access requirements

---

## Economic Context

### Local Economic Conditions
- Unemployment rate: ~6%
- Median household income: $65,000 CAD
- Poverty rate: ~12%
- Cost of living: Moderate for Canadian standards

### Funding Landscape
Potential funding sources for ${context.playbookName}:

1. **Government Grants**
   - Federal: Various programs available
   - Provincial: Social innovation funds
   - Municipal: Community development grants

2. **Foundation Funding**
   - Local community foundations
   - National foundations with regional focus

3. **Community Investment**
   - Credit union community funds
   - Social finance options

---

## Community Characteristics

### Strengths to Leverage
- Active volunteer community
- Established nonprofit sector
- Community center network
- Local business support for social causes

### Cultural Considerations
- Diverse population requires inclusive approach
- Multiple languages may be needed
- Cultural competency important for trust-building

### Key Community Partners
- Local community centers
- Faith-based organizations
- Neighborhood associations
- Social service agencies

---

## Recommendations

### Primary Target Market
Focus initial efforts on [specific neighborhood/population] where:
- Need is highest
- Community infrastructure exists
- Early wins are achievable

### Launch Strategy
1. **Phase 1**: Establish presence in primary area
2. **Phase 2**: Build partnerships and credibility
3. **Phase 3**: Expand to secondary areas

### Key Success Factors
1. Community engagement from day one
2. Partnerships with established organizations
3. Cultural competency and accessibility
4. Sustainable funding mix

### Risks to Monitor
- Competition from new entrants
- Funding availability changes
- Economic downturn impacts on demand
- Regulatory changes

---

*This assessment is based on available data and should be supplemented with direct community engagement and consultation.*
`
}

export default { config, execute }
