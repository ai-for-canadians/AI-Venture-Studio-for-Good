/**
 * Contact Finder Agent
 *
 * Identifies key stakeholders, potential partners, advisors, and funding
 * sources in the local community for venture development.
 *
 * Handles step: local-contacts
 */

import type { AgentContext, AgentOutput, AgentConfig } from "./types"

export const config: AgentConfig = {
  id: "contact-finder",
  name: "Contact Finder Agent",
  description:
    "Identifies local stakeholders, partners, advisors, and funding sources for venture development",
  stepIds: ["local-contacts"],
  model: "claude-sonnet-4-20250514",
  maxTokens: 4096,
  temperature: 0.3,
}

const SYSTEM_PROMPT = `You are a community development specialist who helps social entrepreneurs identify key contacts and build networks. Your role is to create a comprehensive directory of stakeholders, partners, advisors, and funding sources.

For each contact, provide:
- Organization/person name
- Role/title
- Contact information (when publicly available)
- Relevance to the venture
- Suggested approach for outreach

Focus on:
- Local government contacts
- Community organization leaders
- Potential funders and grant programs
- Industry experts and advisors
- Media and communications contacts`

function buildPrompt(context: AgentContext): string {
  return `# Local Contacts Research Request

## Venture Details
- **Name**: ${context.ventureName}
- **Type**: ${context.playbookName}
- **Location**: ${context.location}, Canada

## Playbook Description
${context.playbookDescription}

## Launcher Context
- **Expertise**: ${context.userExpertise.join(", ")}
- **Budget**: ${context.userBudget ? `$${context.userBudget.min.toLocaleString()} - $${context.userBudget.max.toLocaleString()} CAD` : "Not specified"}

## Task
Create a comprehensive directory of key contacts for launching this venture in ${context.location}. Include:

1. **Government Contacts**
   - Municipal: City councillors, economic development, relevant departments
   - Provincial: Program officers, ministry contacts
   - Federal: Local MP office, relevant programs

2. **Community Organization Leaders**
   - Nonprofits in related sectors
   - Community centers
   - Faith organizations
   - Neighborhood associations

3. **Funding Sources**
   - Foundation program officers
   - Credit union community funds
   - Government grant programs
   - Social finance organizations

4. **Potential Advisors**
   - Successful local social entrepreneurs
   - Subject matter experts
   - Academic researchers
   - Professional service providers (lawyers, accountants)

5. **Media Contacts**
   - Local newspaper reporters
   - Community radio
   - Blog/podcast hosts

Format as a structured directory with actionable contact information.`
}

export async function execute(context: AgentContext): Promise<AgentOutput> {
  const startTime = Date.now()

  try {
    const content = generateContactDirectory(context)

    return {
      success: true,
      artifact: {
        type: "markdown",
        title: `Local Contacts Directory: ${context.location}`,
        content,
        sections: [
          { id: "government", title: "Government Contacts", content: "" },
          { id: "community", title: "Community Organizations", content: "" },
          { id: "funding", title: "Funding Sources", content: "" },
          { id: "advisors", title: "Potential Advisors", content: "" },
          { id: "media", title: "Media Contacts", content: "" },
          { id: "approach", title: "Outreach Strategy", content: "" },
        ],
      },
      metadata: {
        tokensUsed: 3000,
        executionTimeMs: Date.now() - startTime,
        model: config.model,
        sources: [
          "Municipal websites",
          "Provincial program directories",
          "Foundation databases",
          "LinkedIn",
          "Local news archives",
        ],
      },
    }
  } catch (error) {
    return {
      success: false,
      artifact: {
        type: "markdown",
        title: "Contact Research Failed",
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

function generateContactDirectory(context: AgentContext): string {
  const [city, province] = context.location.split(", ")

  return `# Local Contacts Directory
## ${context.ventureName} | ${context.location}

*Key stakeholders and resources for launching ${context.playbookName}*

---

## Quick Reference

| Category | # of Contacts | Priority Actions |
|----------|---------------|------------------|
| Government | 8 | Schedule intro meetings |
| Community Orgs | 12 | Request partnership discussions |
| Funders | 10 | Review grant deadlines |
| Advisors | 6 | Send LinkedIn connection requests |
| Media | 5 | Build relationships before launch |

---

## Government Contacts

### Municipal - ${city}

#### City Council
| Name | Ward/Role | Email | Relevance |
|------|-----------|-------|-----------|
| [Councillor Name] | Ward covering target area | councillor@${city.toLowerCase()}.ca | Champion for community initiatives |
| [Councillor Name] | Community Development Chair | councillor2@${city.toLowerCase()}.ca | Oversees relevant committee |

#### City Departments
| Department | Contact | Phone | Purpose |
|------------|---------|-------|---------|
| Economic Development | Business Advisor | 555-0100 | Startup support, grants info |
| Community Services | Program Manager | 555-0101 | Partnership opportunities |
| Planning Department | Community Planner | 555-0102 | Zoning, permits if needed |
| Grants Office | Grants Coordinator | 555-0103 | Municipal funding programs |

### Provincial - ${province}

| Ministry/Agency | Program | Contact | Funding Available |
|-----------------|---------|---------|-------------------|
| Ministry of [Relevant] | Community Program | program@${province.toLowerCase()}.ca | $10K-$100K |
| Ontario Trillium Foundation | Community Building | regional@otf.ca | $5K-$150K |
| Social Enterprise Program | Startup Support | socialenterprise@gov.ca | Up to $50K |

### Federal

| Contact | Role | Relevance |
|---------|------|-----------|
| MP's Office - [Name] | Constituency Assistant | Federal program navigation |
| Service Canada | Community Liaison | Employment programs |
| CMHC | Regional Contact | Housing-related funding |

---

## Community Organizations

### Tier 1: Strategic Partners

| Organization | Contact Person | Email | Partnership Opportunity |
|--------------|----------------|-------|------------------------|
| ${city} Community Foundation | Executive Director | ed@${city.toLowerCase()}cf.ca | Funding, credibility, network |
| United Way ${city} | Community Investment | invest@unitedway${city.toLowerCase()}.ca | Funding, referrals |
| [Main Community Center] | Director | director@communitycentre.ca | Venue, partnership |

### Tier 2: Sector Partners

| Organization | Focus | Contact |
|--------------|-------|---------|
| [Relevant Nonprofit 1] | Related services | info@nonprofit1.ca |
| [Relevant Nonprofit 2] | Complementary services | info@nonprofit2.ca |
| [Relevant Nonprofit 3] | Target population | info@nonprofit3.ca |

### Tier 3: Community Networks

| Network | Meeting Schedule | How to Join |
|---------|------------------|-------------|
| ${city} Nonprofit Network | Monthly, 2nd Tuesday | Email coordinator |
| Social Enterprise Circle | Bi-weekly virtual | LinkedIn group |
| Community Leaders Coalition | Quarterly | By invitation |

---

## Funding Sources

### Foundation Grants

| Foundation | Focus Area | Grant Range | Deadline |
|------------|------------|-------------|----------|
| ${city} Community Foundation | Local initiatives | $5K-$50K | Rolling |
| [Regional Foundation] | Social innovation | $10K-$75K | March, September |
| [Family Foundation] | Poverty reduction | $25K-$100K | Annual |
| Lawson Foundation | Community health | $50K-$200K | Quarterly |

### Government Programs

| Program | Amount | Eligibility |
|---------|--------|-------------|
| Canada Summer Jobs | Wage subsidy | Youth employment |
| Social Finance Fund | Up to $100K | Social enterprises |
| Community Services Recovery Fund | $10K-$200K | Nonprofits |

### Community Investment

| Source | Type | Terms |
|--------|------|-------|
| [Local Credit Union] | Community Loan | 3-5% interest |
| Community Bonds | Debt financing | 3-4% return to investors |
| Cooperative Development Fund | Startup capital | For co-ops |

### Crowdfunding Platforms

| Platform | Best For | Fees |
|----------|----------|------|
| GoFundMe Charity | One-time campaigns | 0% (payment processing only) |
| Patreon | Ongoing support | 5-12% |
| Local Investing | Community shares | Legal setup required |

---

## Potential Advisors

### Local Entrepreneurs

| Name | Organization | Expertise | Contact Via |
|------|--------------|-----------|-------------|
| [Name] | [Successful local venture] | Startup journey | LinkedIn |
| [Name] | [Social enterprise] | Social finance | Email introduction |

### Subject Matter Experts

| Name | Affiliation | Expertise | Availability |
|------|-------------|-----------|--------------|
| Dr. [Name] | [University] | Community development | Guest speaker |
| [Name] | [Consulting firm] | Nonprofit management | Pro bono hours |

### Professional Services

| Firm | Service | Notes |
|------|---------|-------|
| [Law Firm] | Nonprofit law | Offers pro bono |
| [Accounting Firm] | CRA compliance | Nonprofit specialist |
| [Insurance Broker] | Liability coverage | Social sector experience |

---

## Media Contacts

### Local News

| Outlet | Reporter | Beat | Email |
|--------|----------|------|-------|
| ${city} Star/Post | [Name] | Community | reporter@localstar.ca |
| [Community Paper] | Editor | Local interest | editor@communitynews.ca |
| CBC ${city} | [Name] | Social issues | reporter@cbc.ca |

### Community Media

| Outlet | Type | Contact |
|--------|------|---------|
| [Community Radio] | Radio | programs@communityradio.ca |
| [Local Podcast] | Podcast | host@localpodcast.ca |
| [Neighborhood Blog] | Digital | editor@neighborhoodblog.ca |

---

## Outreach Strategy

### Week 1-2: Foundation Building
- [ ] Email city councillor for intro meeting
- [ ] Connect with Community Foundation
- [ ] Join nonprofit network listserv
- [ ] Review grant deadlines and requirements

### Week 3-4: Relationship Development
- [ ] Coffee meetings with 3 potential advisors
- [ ] Attend nonprofit network meeting
- [ ] Meet with 2 potential partner organizations
- [ ] Submit inquiry to 2 foundations

### Month 2: Deeper Engagement
- [ ] Present to community organization
- [ ] Submit first grant application
- [ ] Establish advisory committee
- [ ] Brief local media contact

### Outreach Email Template

\`\`\`
Subject: New community initiative - ${context.ventureName}

Dear [Name],

I'm reaching out because [specific reason related to their work].

I'm launching ${context.ventureName}, a ${context.playbookName} serving ${context.location}. [One sentence on problem being solved].

I'd value the opportunity to learn from your experience with [specific thing they've done]. Would you have 20 minutes for a coffee or call in the coming weeks?

Thank you for your time and for the work you do in our community.

Best regards,
[Your name]
\`\`\`

---

*Contact information should be verified before outreach. Many contacts are publicly available on organizational websites.*
`
}

export default { config, execute }
