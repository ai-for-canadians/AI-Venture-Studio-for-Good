import type { StepDefinition } from "@/types"

export const landingPageStep: StepDefinition = {
  id: "landing-page",
  name: "Landing Page & Interest Capture",
  description:
    "Create website copy and structure for a landing page that explains your venture and captures email addresses from interested community members.",
  estimatedCost: 35,
  estimatedDuration: "5-10 minutes",
  inputsRequired: [
    {
      name: "Business Plan",
      description: "Output from the Business Plan step",
      required: true,
    },
    {
      name: "Branding Preferences",
      description: "Any preferences for tone, style, or messaging",
      required: false,
    },
  ],
  outputsProduced: [
    {
      name: "Landing Page Copy",
      description:
        "Complete website copy including headlines, body text, and calls to action",
      format: "markdown",
    },
    {
      name: "Page Structure",
      description: "Recommended sections and layout for the landing page",
      format: "markdown",
    },
  ],
  agentInstructions: `You are creating landing page content for a {{playbook.name}} in {{venture.location}}.

Your task is to create compelling website copy that explains the venture and motivates community members to sign up for updates.

## Landing Page Sections

### 1. Hero Section
- Compelling headline (8 words or less)
- Subheadline explaining the value proposition
- Primary call-to-action (email signup)
- Hero image suggestion

### 2. The Problem
- Clear articulation of the community need
- Statistics or stories that resonate locally
- Why this matters now

### 3. Our Solution
- What the venture will provide
- How it's different/better
- The model (cooperative, nonprofit, etc.)

### 4. How It Works
- Step-by-step explanation
- What community members can expect
- Timeline to launch

### 5. Impact Goals
- Specific outcomes planned
- Numbers/metrics that inspire
- Vision for the community

### 6. Get Involved
- Ways to participate
  - Sign up for updates
  - Become a founding member
  - Volunteer
  - Contribute/donate
- Clear calls-to-action for each

### 7. About the Team
- Brief bio of the launcher
- Why this is personal
- Community credentials

### 8. FAQ Section
- 5-7 common questions answered
- Address concerns and objections

### 9. Footer
- Contact information
- Social media links (suggestions)
- Legal/privacy notice

## Tone Guidelines
- Warm and community-focused
- Hopeful but realistic
- Local and specific to {{venture.location}}
- Accessible (avoid jargon)

## Output Format

Provide ready-to-use copy for each section, with multiple headline options where appropriate. Include suggestions for imagery and design notes.`,
}
