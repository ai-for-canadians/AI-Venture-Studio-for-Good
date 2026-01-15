import type { StepDefinition } from "@/types"

export const volunteerRecruitmentStep: StepDefinition = {
  id: "volunteer-recruitment",
  name: "Volunteer Recruitment",
  description:
    "Create volunteer role descriptions, recruitment materials, and sign-up processes to build your community volunteer team.",
  estimatedCost: 30,
  estimatedDuration: "5-10 minutes",
  inputsRequired: [
    {
      name: "Business Plan",
      description: "Output from the Business Plan step with operations details",
      required: true,
    },
    {
      name: "Landing Page URL",
      description: "Link to the venture's landing page",
      required: true,
    },
    {
      name: "Volunteer Needs",
      description: "Types of volunteers needed and estimated hours",
      required: false,
    },
  ],
  outputsProduced: [
    {
      name: "Volunteer Role Descriptions",
      description: "Detailed descriptions of volunteer positions",
      format: "markdown",
    },
    {
      name: "Recruitment Materials",
      description: "Flyers, posts, and messaging for volunteer recruitment",
      format: "markdown",
    },
    {
      name: "Volunteer Onboarding Guide",
      description: "Welcome packet and training outline for new volunteers",
      format: "markdown",
    },
  ],
  agentInstructions: `You are creating volunteer recruitment materials for a {{playbook.name}} in {{venture.location}}.

Your task is to help the launcher build a strong volunteer team by creating compelling recruitment materials.

## Volunteer Role Descriptions

For each role, include:
- Role Title
- Time Commitment (hours/week or month)
- Responsibilities (bullet points)
- Skills/Qualifications Needed
- Benefits of Volunteering
- Training Provided

### Common Roles to Define
1. Board/Advisory Members
2. Operations Volunteers
3. Marketing/Outreach Volunteers
4. Administrative Support
5. Specialized Roles (specific to the playbook type)
6. Event Volunteers

## Recruitment Materials

### Volunteer Recruitment Flyer
- Headline
- Key selling points
- Role highlights
- How to sign up
- Contact information

### Social Media Posts
- Facebook post
- Instagram caption
- LinkedIn post
- Nextdoor post

### Email to Send to Networks
- Subject line options
- Body copy
- Clear call to action

### Partner Organization Ask
- Email to send to organizations that might share with their networks

## Volunteer Sign-Up Process

### Application Form Fields
- Basic information needed
- Availability questions
- Skills/interests questions
- Reference questions (if needed)

### Screening Process
- Steps to vet volunteers
- Interview questions
- Background check requirements (if applicable)

## Volunteer Onboarding Guide

### Welcome Packet Contents
- Organization overview
- Mission and values
- Volunteer policies
- Contact information
- Training schedule

### First Day/Week Checklist
- Orientation topics
- Key people to meet
- Initial training needs
- First tasks

### Ongoing Engagement
- Communication plan
- Recognition program ideas
- Feedback mechanisms
- Growth opportunities

## Local Recruitment Channels

Suggest specific places in {{venture.location}} to recruit:
- Universities/colleges
- Community centers
- Faith organizations
- Volunteer matching platforms
- Corporate volunteer programs

Make all materials ready to use with minimal customization.`,
}
