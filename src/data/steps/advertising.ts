import type { StepDefinition } from "@/types"

export const advertisingStep: StepDefinition = {
  id: "advertising",
  name: "Local Advertising",
  description:
    "Create ad copy, creative recommendations, and campaign setup guides for targeted local advertising to build awareness and drive traffic.",
  estimatedCost: 35,
  estimatedDuration: "5-10 minutes",
  inputsRequired: [
    {
      name: "Target Audience",
      description: "Description of ideal community members to reach",
      required: true,
    },
    {
      name: "Budget",
      description: "Available advertising budget",
      required: true,
    },
    {
      name: "Landing Page URL",
      description: "Destination URL for ads",
      required: true,
    },
    {
      name: "Key Messages",
      description: "Core value proposition and calls to action",
      required: true,
    },
  ],
  outputsProduced: [
    {
      name: "Ad Copy Library",
      description: "Multiple ad variations for different platforms",
      format: "markdown",
    },
    {
      name: "Creative Recommendations",
      description: "Guidance on imagery, video, and design",
      format: "markdown",
    },
    {
      name: "Campaign Setup Guide",
      description: "Step-by-step instructions for launching ads",
      format: "markdown",
    },
  ],
  agentInstructions: `You are creating a local advertising strategy for a {{playbook.name}} in {{venture.location}}.

Your task is to create ad content and guidance that helps the launcher reach their community effectively.

## Ad Copy Library

### Facebook/Instagram Ads

#### Awareness Ads (3 variations)
For each:
- Primary Text (125 characters)
- Headline (40 characters)
- Description (30 characters)
- Call to Action button recommendation

#### Engagement Ads (3 variations)
- Longer form copy
- Story-driven approach
- Community focus

#### Conversion Ads (3 variations)
- Direct call to action
- Urgency messaging
- Benefit-focused

### Google Ads

#### Search Ads (5 variations)
For each:
- Headline 1 (30 characters)
- Headline 2 (30 characters)
- Headline 3 (30 characters)
- Description 1 (90 characters)
- Description 2 (90 characters)

#### Display Ads
- Headlines (multiple options)
- Descriptions (multiple options)

### Local Platforms

#### Nextdoor Post
- Organic post copy
- Sponsored post copy

#### Local News/Community Sites
- Banner ad copy
- Sponsored content headline/summary

## Creative Recommendations

### Imagery Guidelines
- Types of images that work best
- Stock photo recommendations
- DIY photo tips
- What to avoid

### Video Recommendations
- Short-form video script (15-30 seconds)
- Testimonial video outline
- Behind-the-scenes content ideas

### Design Tips
- Color recommendations
- Font suggestions
- Logo placement
- Mobile optimization

## Campaign Setup Guide

### Facebook/Meta Ads
- Step-by-step setup instructions
- Targeting recommendations for {{venture.location}}
  - Geographic radius
  - Demographics
  - Interests
  - Behaviors
- Budget allocation suggestions
- Bidding strategy

### Google Ads
- Campaign structure
- Keyword recommendations
- Location targeting
- Budget recommendations

### Tracking & Optimization
- Metrics to monitor
- A/B testing plan
- When to adjust
- Success benchmarks

## Budget Recommendations

Based on the provided budget, suggest:
- Platform allocation
- Daily/weekly spend
- Campaign duration
- Expected reach/results

## Local Advertising Opportunities

Specific to {{venture.location}}:
- Local publications/websites
- Community bulletin boards
- Local radio/podcast sponsorships
- Community event sponsorships
- Grassroots/guerrilla ideas

Make all content ready to copy-paste into ad platforms.`,
}
