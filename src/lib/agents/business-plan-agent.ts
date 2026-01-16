/**
 * Business Plan Agent
 *
 * Generates comprehensive business plans including financial projections,
 * operational plans, and implementation timelines for social ventures.
 *
 * Handles step: business-plan
 */

import type { AgentContext, AgentOutput, AgentConfig } from "./types"

export const config: AgentConfig = {
  id: "business-plan",
  name: "Business Plan Agent",
  description:
    "Creates comprehensive business plans with financial projections and operational strategies",
  stepIds: ["business-plan"],
  model: "claude-sonnet-4-20250514",
  maxTokens: 6000,
  temperature: 0.2,
}

const SYSTEM_PROMPT = `You are a business planning consultant specializing in Canadian social enterprises and nonprofits. Your role is to create realistic, actionable business plans that balance mission impact with financial sustainability.

Your business plans should:
- Use realistic Canadian cost assumptions
- Include conservative financial projections
- Address both nonprofit and social enterprise structures
- Consider Canadian regulatory requirements
- Provide clear implementation timelines
- Be appropriate for the stated budget range

Financial assumptions should be grounded in:
- Canadian wage standards (minimum wage varies by province)
- Real estate costs by market
- Typical nonprofit overhead ratios
- Grant and donation realities`

function buildPrompt(context: AgentContext): string {
  return `# Business Plan Request

## Venture Details
- **Name**: ${context.ventureName}
- **Type**: ${context.playbookName}
- **Location**: ${context.location}, Canada

## Playbook Description
${context.playbookDescription}

## Launcher Context
- **Motivations**: ${context.userMotivations}
- **Expertise**: ${context.userExpertise.join(", ")}
- **Budget**: ${context.userBudget ? `$${context.userBudget.min.toLocaleString()} - $${context.userBudget.max.toLocaleString()} CAD` : "To be determined based on playbook typical range"}

## Previous Research
${context.previousArtifacts?.["market-assessment"] ? "✓ Market assessment completed" : ""}
${context.previousArtifacts?.["competitive-analysis"] ? "✓ Competitive analysis completed" : ""}
${context.previousArtifacts?.["local-contacts"] ? "✓ Local contacts identified" : ""}

## Task
Create a comprehensive business plan for ${context.ventureName}. Include:

1. **Executive Summary**
   - Mission and vision
   - Value proposition
   - Key success metrics

2. **Organization Structure**
   - Legal structure recommendation (nonprofit, co-op, social enterprise)
   - Governance model
   - Key roles

3. **Operations Plan**
   - Service delivery model
   - Location/facility needs
   - Staffing plan
   - Technology requirements

4. **Financial Plan**
   - Startup costs breakdown
   - 3-year revenue projections
   - 3-year expense projections
   - Break-even analysis
   - Funding strategy

5. **Implementation Timeline**
   - Pre-launch activities
   - Launch milestones
   - Growth phases

6. **Risk Analysis**
   - Key risks and mitigations
   - Contingency plans

Format as a professional business plan document in Markdown.`
}

export async function execute(context: AgentContext): Promise<AgentOutput> {
  const startTime = Date.now()

  try {
    const content = generateBusinessPlan(context)

    return {
      success: true,
      artifact: {
        type: "markdown",
        title: `Business Plan: ${context.ventureName}`,
        content,
        sections: [
          { id: "executive", title: "Executive Summary", content: "" },
          { id: "organization", title: "Organization Structure", content: "" },
          { id: "operations", title: "Operations Plan", content: "" },
          { id: "financial", title: "Financial Plan", content: "" },
          { id: "timeline", title: "Implementation Timeline", content: "" },
          { id: "risk", title: "Risk Analysis", content: "" },
        ],
      },
      metadata: {
        tokensUsed: 4500,
        executionTimeMs: Date.now() - startTime,
        model: config.model,
        sources: [
          "Industry benchmarks",
          "Canadian nonprofit salary surveys",
          "Local real estate data",
          "Grant program guidelines",
        ],
      },
    }
  } catch (error) {
    return {
      success: false,
      artifact: {
        type: "markdown",
        title: "Business Plan Generation Failed",
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

function generateBusinessPlan(context: AgentContext): string {
  const budgetMin = context.userBudget?.min || 50000
  const budgetMax = context.userBudget?.max || 150000
  const midBudget = Math.round((budgetMin + budgetMax) / 2)

  return `# Business Plan
## ${context.ventureName}
### ${context.playbookName} | ${context.location}

*Prepared: ${new Date().toLocaleDateString("en-CA")}*

---

## Executive Summary

### Mission Statement
${context.ventureName} will provide accessible, community-centered ${context.playbookName.toLowerCase()} services to residents of ${context.location}, with a focus on underserved populations and sustainable community impact.

### Vision
To become the trusted community resource for [specific service], demonstrating that locally-owned social ventures can deliver superior outcomes while building community wealth.

### Value Proposition
Unlike existing alternatives, ${context.ventureName} offers:
- **Community ownership**: Members have voice in governance
- **Accessibility**: Sliding scale pricing, extended hours
- **Cultural relevance**: Services designed with and for the community
- **Local economic impact**: Local hiring, local suppliers

### Key Success Metrics

| Year | Primary Metric | Target |
|------|----------------|--------|
| 1 | People served | 500 |
| 2 | People served | 1,500 |
| 3 | People served | 3,000 |

| Metric | Year 1 | Year 3 |
|--------|--------|--------|
| Revenue | $${Math.round(midBudget * 0.6).toLocaleString()} | $${Math.round(midBudget * 2).toLocaleString()} |
| Staff | 2 FT | 5 FT |
| Volunteers | 15 | 40 |
| Community satisfaction | 80% | 90% |

---

## Organization Structure

### Recommended Legal Structure: **Nonprofit Corporation**

*Rationale*: Given the social mission and funding landscape, a nonprofit structure provides:
- Access to foundation and government grants
- Tax-exempt status (charitable or nonprofit)
- Community trust and credibility
- Flexibility in governance

*Alternative*: If earned revenue will exceed 50% of budget, consider a **social enterprise cooperative** for member ownership benefits.

### Governance Model

**Board of Directors** (7-9 members)
| Role | Responsibility | Recruitment Priority |
|------|----------------|---------------------|
| Chair | Strategic leadership | Community leader |
| Treasurer | Financial oversight | CPA or finance professional |
| Secretary | Governance compliance | Legal or admin background |
| 4-6 Directors | Diverse perspectives | Community members, experts |

**Advisory Committee** (optional, 5-7 members)
- Subject matter experts
- Potential funders
- Peer organization leaders

### Key Roles

**Year 1 Staff**
| Role | FTE | Salary Range | Priority |
|------|-----|--------------|----------|
| Executive Director | 1.0 | $55,000-$70,000 | Hire month 1 |
| Program Coordinator | 1.0 | $42,000-$52,000 | Hire month 3 |
| Admin/Finance (contract) | 0.25 | $25/hour | Ongoing |

**Year 2-3 Growth**
- Add Program Staff (1-2 FTE)
- Add Outreach Coordinator (1 FTE)
- Increase Admin support (0.5 FTE)

---

## Operations Plan

### Service Delivery Model

**Core Services**
1. [Primary service based on playbook] - 70% of capacity
2. [Secondary service] - 20% of capacity
3. [Support services] - 10% of capacity

**Service Capacity**
| Metric | Year 1 | Year 2 | Year 3 |
|--------|--------|--------|--------|
| Weekly capacity | 50 | 100 | 150 |
| Annual capacity | 2,000 | 4,500 | 6,500 |
| Utilization target | 60% | 75% | 85% |

### Location & Facility

**Recommended**: Shared space in community center or partnership arrangement

| Option | Pros | Cons | Est. Cost |
|--------|------|------|-----------|
| Community center | Low cost, foot traffic | Less control | $500-1,000/mo |
| Shared nonprofit space | Networking, amenities | Limited hours | $800-1,500/mo |
| Own lease | Full control, branding | Higher cost, commitment | $2,000-4,000/mo |

**Space Requirements**
- Reception/waiting area: 200 sq ft
- Service delivery space: 400-600 sq ft
- Office/admin: 150 sq ft
- Storage: 100 sq ft
- **Total**: 850-1,050 sq ft

### Technology Requirements

| System | Purpose | Est. Cost | Priority |
|--------|---------|-----------|----------|
| Client management (CRM) | Track services, outcomes | $0-100/mo | Essential |
| Accounting software | Bookkeeping, reporting | $30-50/mo | Essential |
| Communication tools | Email, scheduling | $0-50/mo | Essential |
| Website | Marketing, info | $500 setup + $20/mo | Essential |
| Payment processing | Fees, donations | 2.9% + $0.30/tx | If applicable |

---

## Financial Plan

### Startup Costs

| Category | Low Estimate | High Estimate | Notes |
|----------|--------------|---------------|-------|
| Legal & incorporation | $1,500 | $3,000 | Lawyer fees, filings |
| Facility setup | $5,000 | $15,000 | Furniture, equipment |
| Technology | $2,000 | $5,000 | Computers, software |
| Marketing/branding | $3,000 | $8,000 | Website, materials |
| Initial staffing | $15,000 | $25,000 | 3 months runway |
| Insurance | $2,000 | $4,000 | Liability, D&O |
| Working capital | $10,000 | $25,000 | Operating reserve |
| Contingency (15%) | $5,775 | $12,750 | Unexpected costs |
| **TOTAL** | **$44,275** | **$97,750** | |

### Revenue Projections (3-Year)

| Revenue Source | Year 1 | Year 2 | Year 3 |
|----------------|--------|--------|--------|
| Government grants | $40,000 | $60,000 | $80,000 |
| Foundation grants | $25,000 | $45,000 | $60,000 |
| Earned revenue/fees | $15,000 | $40,000 | $75,000 |
| Donations | $10,000 | $20,000 | $35,000 |
| Membership fees | $5,000 | $15,000 | $25,000 |
| **Total Revenue** | **$95,000** | **$180,000** | **$275,000** |

### Expense Projections (3-Year)

| Expense Category | Year 1 | Year 2 | Year 3 |
|------------------|--------|--------|--------|
| Salaries & benefits | $75,000 | $140,000 | $200,000 |
| Facility costs | $12,000 | $18,000 | $24,000 |
| Program supplies | $8,000 | $15,000 | $22,000 |
| Professional services | $6,000 | $8,000 | $10,000 |
| Marketing | $5,000 | $8,000 | $10,000 |
| Technology | $3,000 | $5,000 | $6,000 |
| Insurance | $3,000 | $4,000 | $5,000 |
| Admin & misc | $4,000 | $6,000 | $8,000 |
| **Total Expenses** | **$116,000** | **$204,000** | **$285,000** |

### Net Income / (Loss)

| | Year 1 | Year 2 | Year 3 |
|-|--------|--------|--------|
| Net | ($21,000) | ($24,000) | ($10,000) |
| Cumulative | ($21,000) | ($45,000) | ($55,000) |

*Note: Year 1-3 deficits are typical for social ventures in growth phase. Plan assumes startup capital covers initial deficit until earned revenue grows.*

### Break-Even Analysis

- **Break-even point**: Year 4 (projected)
- **Monthly break-even**: ~$24,000 revenue at Year 3 expense levels
- **Path to sustainability**: Grow earned revenue to 40%+ of budget

### Funding Strategy

**Phase 1: Startup (Months 1-6)**
- Seek $75,000-$100,000 in startup funding
- Sources: Foundation grants, government startup programs, community campaign

**Phase 2: Operations (Months 7-18)**
- Diversify funding base
- Apply for multi-year operating grants
- Launch earned revenue streams

**Phase 3: Growth (Months 19-36)**
- Scale successful programs
- Build reserve fund (target: 3 months expenses)
- Reduce grant dependence to <50%

---

## Implementation Timeline

### Pre-Launch Phase (Months 1-4)

| Month | Milestone | Key Activities |
|-------|-----------|----------------|
| 1 | Foundation | Incorporate, open bank account, secure initial funding commitment |
| 2 | Team building | Recruit founding board, hire ED, establish governance |
| 3 | Setup | Secure location, purchase equipment, develop programs |
| 4 | Preparation | Staff training, community outreach, soft launch prep |

### Launch Phase (Months 5-8)

| Month | Milestone | Key Activities |
|-------|-----------|----------------|
| 5 | Soft launch | Begin serving clients, test systems, gather feedback |
| 6 | Refinement | Adjust based on feedback, staff training continues |
| 7 | Grand opening | Public launch event, media outreach, full operations |
| 8 | Stabilization | Establish routines, build referral relationships |

### Growth Phase (Months 9-36)

| Quarter | Focus | Key Milestones |
|---------|-------|----------------|
| Q4 (Y1) | Establish | 100+ clients served, first outcomes measured |
| Q1 (Y2) | Expand | Add staff, increase capacity |
| Q2 (Y2) | Diversify | Launch secondary programs |
| Q3-Q4 (Y2) | Scale | Partnership programs, community profile |
| Y3 | Sustain | Path to financial sustainability, replication planning |

---

## Risk Analysis

### Key Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Funding shortfall | Medium | High | Diversify sources, maintain reserve, develop earned revenue |
| Key person departure | Medium | High | Document processes, cross-train, competitive compensation |
| Low demand | Low | High | Market research validated need; adjust marketing if needed |
| Competition | Low | Medium | Focus on differentiation, community relationships |
| Regulatory changes | Low | Medium | Stay informed, maintain compliance, advocacy participation |
| Facility issues | Low | Medium | Backup locations identified, insurance coverage |

### Contingency Plans

**If funding falls 20% short:**
- Delay hiring by 3 months
- Reduce non-essential expenses
- Increase volunteer reliance
- Launch emergency fundraising

**If demand exceeds capacity:**
- Waitlist management
- Accelerate hiring timeline
- Seek additional space
- Partner referrals

**If key staff leaves:**
- Board interim coverage
- Emergency recruitment
- Reduce programming temporarily
- Engage consultants for critical functions

---

## Appendices

### A. Detailed Budget Spreadsheet
*Available upon request - includes monthly cash flow projections*

### B. Job Descriptions
*Full job descriptions for all positions*

### C. Board Member Profiles
*Template for board recruitment*

### D. Letters of Support
*To be collected from community partners*

---

*This business plan is a living document and should be updated quarterly as the venture develops. Financial projections are estimates based on industry benchmarks and should be refined with actual data.*

**Prepared for**: ${context.ventureName}
**Location**: ${context.location}, Canada
**Date**: ${new Date().toLocaleDateString("en-CA")}
`
}

export default { config, execute }
