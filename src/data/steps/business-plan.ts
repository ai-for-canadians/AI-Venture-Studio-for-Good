import type { StepDefinition } from "@/types"

export const businessPlanStep: StepDefinition = {
  id: "business-plan",
  name: "Business Plan Draft",
  description:
    "Generate a localized business plan using the playbook template and research from previous steps. Includes executive summary, market analysis, operations plan, and financial projections.",
  estimatedCost: 50,
  estimatedDuration: "10-15 minutes",
  inputsRequired: [
    {
      name: "Market Assessment",
      description: "Output from the Market Assessment step",
      required: true,
    },
    {
      name: "Competitive Analysis",
      description: "Output from the Competitive Analysis step",
      required: true,
    },
    {
      name: "Local Contacts",
      description: "Output from the Key Local Contacts step",
      required: true,
    },
    {
      name: "Launcher Profile",
      description: "Information about the venture launcher's background and resources",
      required: true,
    },
    {
      name: "Budget",
      description: "Available startup capital",
      required: true,
    },
  ],
  outputsProduced: [
    {
      name: "Business Plan Document",
      description:
        "Complete business plan with executive summary, market analysis, operations plan, financial projections, and launch timeline",
      format: "markdown",
    },
  ],
  agentInstructions: `You are drafting a business plan for a {{playbook.name}} in {{venture.location}}.

Use the research from previous steps to create a comprehensive, actionable business plan.

## Business Plan Sections

### 1. Executive Summary
- Mission statement
- Value proposition
- Key differentiators
- Funding requirements and use
- Projected impact

### 2. Organization Description
- Legal structure (nonprofit, cooperative, social enterprise)
- Governance model
- Team and leadership

### 3. Market Analysis
- Target market and demographics (from Market Assessment)
- Community need and demand
- Competitive landscape (from Competitive Analysis)
- Market positioning

### 4. Services/Products
- Core offerings
- Pricing strategy (if applicable)
- Service delivery model

### 5. Marketing Strategy
- Target audience segments
- Key messages
- Marketing channels
- Community engagement approach

### 6. Operations Plan
- Location/facility requirements
- Equipment and supplies
- Key processes
- Partnerships and suppliers
- Staffing requirements
- Volunteer strategy

### 7. Financial Projections
- Startup costs breakdown
- Monthly operating expenses
- Revenue sources
- Break-even analysis
- 3-year financial projection
- Funding strategy

### 8. Implementation Timeline
- Key milestones
- Launch date target
- Phase-by-phase plan

### 9. Risk Assessment
- Key risks identified
- Mitigation strategies

### 10. Impact Metrics
- How success will be measured
- Key performance indicators
- Reporting plan

## Output Format

Provide a professional business plan document that could be shared with funders, partners, and community stakeholders. Use the specific data from previous steps to make it localized and actionable for {{venture.location}}.`,
}
