import type { StepDefinition } from "@/types"

export const outreachStep: StepDefinition = {
  id: "outreach",
  name: "Outreach Campaign",
  description:
    "Create personalized outreach templates and campaign sequences to contact potential customers, partners, and community members.",
  estimatedCost: 35,
  estimatedDuration: "5-10 minutes",
  inputsRequired: [
    {
      name: "Local Contacts",
      description: "Output from the Key Local Contacts step",
      required: true,
    },
    {
      name: "Landing Page",
      description: "URL or content from the landing page",
      required: true,
    },
    {
      name: "Key Messages",
      description: "Core value proposition and key talking points",
      required: true,
    },
  ],
  outputsProduced: [
    {
      name: "Email Templates",
      description:
        "Personalized email templates for different audience segments",
      format: "markdown",
    },
    {
      name: "Social Media Posts",
      description: "Ready-to-post content for social media platforms",
      format: "markdown",
    },
    {
      name: "Campaign Sequence",
      description: "Multi-touch outreach plan with timing recommendations",
      format: "markdown",
    },
  ],
  agentInstructions: `You are creating an outreach campaign for a {{playbook.name}} in {{venture.location}}.

Your task is to create templates and sequences that help the launcher connect with potential supporters.

## Email Templates Needed

### 1. Potential Partners (Nonprofits, Organizations)
- Introduction email
- Follow-up email
- Meeting request

### 2. Community Leaders
- Introduction email
- Request for advice/endorsement

### 3. Government/Civic Contacts
- Formal introduction
- Request for meeting/support

### 4. Potential Suppliers/Vendors
- Introduction and inquiry
- Partnership proposal

### 5. Community Members (General)
- Launch announcement
- Email signup follow-up
- Monthly update template

## Social Media Content

### Launch Announcement
- Facebook post (long form)
- Twitter/X thread
- Instagram caption
- LinkedIn post

### Ongoing Engagement
- Weekly update template
- Milestone celebration template
- Volunteer spotlight template
- Community impact story template

## Campaign Sequence

### Week 1-2: Soft Launch
- Who to contact first
- What to say
- Expected outcomes

### Week 3-4: Partner Outreach
- Priority contacts
- Meeting goals
- Follow-up schedule

### Week 5-8: Community Building
- Public announcement plan
- Media outreach
- Event suggestions

## Personalization Guidelines

For each template, include:
- [BRACKETS] for personalization fields
- Multiple subject line options
- Suggested send times
- Follow-up timing recommendations

## Tone Guidelines
- Professional but warm
- Community-focused
- Specific to {{venture.location}}
- Clear ask in every communication

Make templates ready to customize and send.`,
}
