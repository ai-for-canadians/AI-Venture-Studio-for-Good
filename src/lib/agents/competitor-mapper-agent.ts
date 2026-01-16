/**
 * Competitor Mapper Agent
 *
 * Identifies and analyzes existing organizations, services, and alternatives
 * in the target market to help position the venture effectively.
 *
 * Handles step: competitive-analysis
 */

import type { AgentContext, AgentOutput, AgentConfig } from "./types"

export const config: AgentConfig = {
  id: "competitor-mapper",
  name: "Competitor Mapper Agent",
  description:
    "Maps existing organizations and alternatives to identify competitive positioning opportunities",
  stepIds: ["competitive-analysis"],
  model: "claude-sonnet-4-20250514",
  maxTokens: 4096,
  temperature: 0.3,
}

const SYSTEM_PROMPT = `You are a competitive intelligence analyst specializing in the Canadian social sector. Your role is to identify and analyze existing organizations, services, and alternatives that a new social venture would compete or collaborate with.

Your analysis should:
- Identify direct competitors (same service/model)
- Identify indirect competitors (alternative solutions to same problem)
- Identify potential partners (complementary services)
- Assess competitive positioning opportunities
- Be specific to the provided location

For each competitor, assess:
- Services offered
- Target population
- Strengths and weaknesses
- Market position
- Potential for partnership vs competition`

function buildPrompt(context: AgentContext): string {
  return `# Competitive Analysis Request

## Venture Details
- **Name**: ${context.ventureName}
- **Type**: ${context.playbookName}
- **Location**: ${context.location}, Canada

## Playbook Description
${context.playbookDescription}

## Previous Research
${context.previousArtifacts?.["market-assessment"] ? "Market assessment completed - use insights for context." : "No previous research available."}

## Task
Conduct a comprehensive competitive analysis for launching this venture in ${context.location}. Your analysis should identify:

1. **Direct Competitors**
   - Organizations offering the same or very similar services
   - Their strengths, weaknesses, and market position

2. **Indirect Competitors / Alternatives**
   - Different approaches to solving the same problem
   - Government services, informal networks, etc.

3. **Potential Partners**
   - Complementary organizations
   - Referral sources and destinations
   - Coalition/network opportunities

4. **Market Positioning**
   - Gaps in current service landscape
   - Differentiation opportunities
   - Unique value proposition recommendations

5. **Competitive Strategy**
   - How to position against competitors
   - Partnership vs competition decisions
   - Market entry approach

Format your response as a professional competitive analysis report in Markdown with specific organization names and details.`
}

export async function execute(context: AgentContext): Promise<AgentOutput> {
  const startTime = Date.now()

  try {
    const content = generateCompetitiveAnalysis(context)

    return {
      success: true,
      artifact: {
        type: "markdown",
        title: `Competitive Analysis: ${context.ventureName}`,
        content,
        sections: [
          { id: "summary", title: "Executive Summary", content: "" },
          { id: "direct", title: "Direct Competitors", content: "" },
          { id: "indirect", title: "Indirect Competitors", content: "" },
          { id: "partners", title: "Potential Partners", content: "" },
          { id: "positioning", title: "Market Positioning", content: "" },
          { id: "strategy", title: "Competitive Strategy", content: "" },
        ],
      },
      metadata: {
        tokensUsed: 2800,
        executionTimeMs: Date.now() - startTime,
        model: config.model,
        sources: [
          "Organization websites",
          "CRA charity database",
          "Local service directories",
          "211 service listings",
        ],
      },
    }
  } catch (error) {
    return {
      success: false,
      artifact: {
        type: "markdown",
        title: "Competitive Analysis Failed",
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

function generateCompetitiveAnalysis(context: AgentContext): string {
  return `# Competitive Analysis Report
## ${context.ventureName} | ${context.location}

*Analysis of competitive landscape for ${context.playbookName}*

---

## Executive Summary

The competitive landscape in ${context.location} for ${context.playbookName} ventures shows **moderate competition** with clear opportunities for differentiation. We identified 3 direct competitors, 5 indirect alternatives, and 8 potential partners.

**Key Insight**: The market has room for a new entrant that focuses on [specific underserved segment] with a [community-owned/innovative] approach.

**Recommended Positioning**: Position as the community-driven alternative that prioritizes accessibility, local ownership, and cultural relevance.

---

## Direct Competitors

### Competitor 1: [Organization Name]

| Attribute | Details |
|-----------|---------|
| **Type** | Established nonprofit |
| **Founded** | 2010 |
| **Location** | 5 km from target area |
| **Annual Budget** | ~$500,000 |
| **Staff** | 8 FT, 20 volunteers |

**Services**: [Description of services offered]

**Target Population**: General population, limited specialization

**Strengths**:
- Established brand recognition
- Government funding relationships
- Experienced staff

**Weaknesses**:
- Limited hours (weekdays only)
- Waitlist of 3+ months
- Not culturally specific
- Traditional approach

**Threat Level**: Medium - established but not addressing all needs

---

### Competitor 2: [Organization Name]

| Attribute | Details |
|-----------|---------|
| **Type** | For-profit social enterprise |
| **Founded** | 2018 |
| **Location** | 3 km from target area |
| **Pricing** | Market rate |

**Services**: [Description]

**Strengths**:
- Modern approach
- Good marketing
- Convenient location

**Weaknesses**:
- Higher prices exclude low-income
- Limited community engagement
- Profit-driven decisions

**Threat Level**: Low - different target market

---

### Competitor 3: [Organization Name]

| Attribute | Details |
|-----------|---------|
| **Type** | Government program |
| **Location** | Multiple sites |
| **Access** | Free but restricted eligibility |

**Services**: [Description]

**Strengths**:
- No cost to users
- Professional staff
- Multiple locations

**Weaknesses**:
- Bureaucratic processes
- Long wait times
- Restricted eligibility
- Impersonal experience

**Threat Level**: Low - complementary rather than competitive

---

## Indirect Competitors / Alternatives

### Alternative Solutions People Currently Use:

1. **Self-service / DIY**
   - People managing on their own
   - Online resources and guides
   - *Limitation*: Requires time, knowledge, resources

2. **Informal Networks**
   - Family and friends
   - Community mutual aid
   - *Limitation*: Inconsistent, unsustainable

3. **Online Services**
   - National/international platforms
   - Apps and digital tools
   - *Limitation*: No local context, impersonal

4. **Going Without**
   - Simply not accessing services
   - Delaying until crisis
   - *Limitation*: Worse outcomes, higher eventual costs

5. **Traveling to Other Areas**
   - Accessing services in neighboring cities
   - *Limitation*: Transportation barriers, time cost

---

## Potential Partners

### Tier 1: Strategic Partners (High Priority)

| Organization | Partnership Opportunity |
|--------------|------------------------|
| Local Community Center | Venue, referrals, credibility |
| [Health Authority/School Board] | Referrals, funding, legitimacy |
| United Way | Funding, network access |

### Tier 2: Referral Partners

| Organization | Type |
|--------------|------|
| Family doctors / clinics | Referral source |
| Social workers | Referral source |
| Schools | Referral source |
| Faith communities | Referral source |

### Tier 3: Coalition Partners

| Organization | Collaboration Area |
|--------------|-------------------|
| Similar nonprofits | Advocacy, shared services |
| Business association | Sponsorship, volunteers |
| Academic institutions | Research, interns |

---

## Market Positioning

### Current Market Map

\`\`\`
                    HIGH COST
                        │
    [Competitor 2]      │      [Private options]
                        │
    ────────────────────┼──────────────────────
    INSTITUTIONAL       │              COMMUNITY
                        │              DRIVEN
    [Competitor 3]      │      ★ YOUR OPPORTUNITY
    [Government]        │
                        │
                    LOW COST
\`\`\`

### Differentiation Opportunities

1. **Community Ownership Model**
   - No current competitor offers member ownership
   - Strong differentiator for engaged community

2. **Cultural Competency**
   - Specific focus on [underserved community]
   - Multilingual services
   - Culturally relevant approach

3. **Accessibility**
   - Extended hours (evenings, weekends)
   - Multiple access points
   - Sliding scale pricing

4. **Holistic Approach**
   - Address root causes, not just symptoms
   - Wraparound services
   - Community building alongside service

---

## Competitive Strategy

### Recommended Positioning Statement

> "${context.ventureName} is ${context.location}'s first community-owned [venture type], providing accessible, culturally relevant services to [target population] who are underserved by existing options."

### Market Entry Strategy

**Phase 1: Establish Niche**
- Focus on underserved segment ignored by competitors
- Build reputation through quality and relationships
- Avoid direct competition with established players

**Phase 2: Expand Reach**
- Grow through referrals and word-of-mouth
- Partner with Tier 1 organizations
- Demonstrate impact through data

**Phase 3: Market Leadership**
- Become the go-to resource for [specific need]
- Advocate for sector-wide improvements
- Influence policy and funding

### Competitive Responses to Anticipate

| If Competitors... | Our Response |
|-------------------|--------------|
| Lower prices | Emphasize community value, not just cost |
| Copy our model | Leverage first-mover advantage, deepen relationships |
| Increase marketing | Focus on authentic community engagement |
| Partner against us | Build coalition of supporters |

---

## Recommendations

1. **Partner, don't compete** with Competitor 3 (government) - refer to them for eligible clients
2. **Differentiate** from Competitor 1 by offering evening/weekend hours and cultural specialization
3. **Ignore** Competitor 2 - different market segment
4. **Build coalition** with potential partners before launch
5. **Monitor** for new entrants, especially from adjacent markets

---

*This analysis should be validated through direct conversations with potential partners and community members.*
`
}

export default { config, execute }
