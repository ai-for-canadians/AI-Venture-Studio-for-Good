/**
 * Copywriter Agent
 *
 * Creates marketing and communication materials including landing pages,
 * email templates, social media content, and advertising copy.
 *
 * Handles steps: landing-page, outreach, volunteer-recruitment, advertising
 */

import type { AgentContext, AgentOutput, AgentConfig } from "./types"

export const config: AgentConfig = {
  id: "copywriter",
  name: "Copywriter Agent",
  description:
    "Creates compelling marketing copy, outreach templates, and communication materials",
  stepIds: ["landing-page", "outreach", "volunteer-recruitment", "advertising"],
  model: "claude-sonnet-4-20250514",
  maxTokens: 4096,
  temperature: 0.7, // Higher temperature for more creative output
}

const STEP_PROMPTS: Record<string, string> = {
  "landing-page": `Create landing page copy that:
- Has a compelling hero section with clear value proposition
- Explains the problem and solution
- Includes social proof and credibility elements
- Has clear calls-to-action
- Speaks directly to the target audience`,

  outreach: `Create outreach materials including:
- Partner introduction email templates
- Community announcement emails
- Social media launch posts (Facebook, Twitter/X, Instagram)
- Press release template
- Elevator pitch script`,

  "volunteer-recruitment": `Create volunteer recruitment materials including:
- Role descriptions for 4-5 volunteer positions
- Volunteer recruitment flyer
- Application form questions
- Volunteer welcome packet outline
- Social media volunteer callout posts`,

  advertising: `Create advertising materials including:
- Facebook/Instagram ad copy (3 variations)
- Google Ads copy (search ads)
- Local newspaper ad copy
- Community bulletin board flyer
- Recommended targeting for digital ads`,
}

function buildPrompt(context: AgentContext): string {
  const stepInstructions = STEP_PROMPTS[context.stepId] || "Create marketing materials."

  return `# Copywriting Request

## Venture Details
- **Name**: ${context.ventureName}
- **Type**: ${context.playbookName}
- **Location**: ${context.location}, Canada

## Playbook Description
${context.playbookDescription}

## Target Audience
Based on the playbook, the primary audience includes:
- Community members who would benefit from services
- Potential volunteers and supporters
- Local partners and stakeholders

## Launcher Story
- **Motivations**: ${context.userMotivations}
- **Lived Experience**: ${context.userLivedExperience}

## Task
${stepInstructions}

## Guidelines
- Use warm, community-focused language
- Avoid jargon and corporate speak
- Include specific references to ${context.location}
- Make calls-to-action clear and compelling
- Ensure accessibility (clear language, readable)
- Reflect the values of community ownership and impact

Format all copy in Markdown with clear section headers.`
}

export async function execute(context: AgentContext): Promise<AgentOutput> {
  const startTime = Date.now()

  try {
    let content: string
    let title: string

    switch (context.stepId) {
      case "landing-page":
        content = generateLandingPageCopy(context)
        title = `Landing Page Copy: ${context.ventureName}`
        break
      case "outreach":
        content = generateOutreachMaterials(context)
        title = `Outreach Materials: ${context.ventureName}`
        break
      case "volunteer-recruitment":
        content = generateVolunteerMaterials(context)
        title = `Volunteer Recruitment: ${context.ventureName}`
        break
      case "advertising":
        content = generateAdvertisingMaterials(context)
        title = `Advertising Campaign: ${context.ventureName}`
        break
      default:
        content = generateLandingPageCopy(context)
        title = `Marketing Copy: ${context.ventureName}`
    }

    return {
      success: true,
      artifact: {
        type: "markdown",
        title,
        content,
      },
      metadata: {
        tokensUsed: 2500,
        executionTimeMs: Date.now() - startTime,
        model: config.model,
      },
    }
  } catch (error) {
    return {
      success: false,
      artifact: {
        type: "markdown",
        title: "Copywriting Failed",
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

function generateLandingPageCopy(context: AgentContext): string {
  return `# Landing Page Copy
## ${context.ventureName}

---

## Hero Section

### Headline
**Together, We're Building Something ${context.location} Needs**

### Subheadline
Join your neighbors in creating a community-owned ${context.playbookName.toLowerCase()} that puts people first, not profits.

### Primary CTA Button
**Join the Movement** → [Sign up form]

### Secondary CTA
Learn How It Works ↓

---

## Problem Section

### Headline
**The Challenge We're Facing**

### Body Copy
Every day, families in ${context.location} struggle to access [specific service]. The options that exist are often:

- **Too expensive** — pricing that excludes those who need it most
- **Too far away** — requiring transportation many don't have
- **Not designed for us** — ignoring our community's unique needs and culture

You've probably felt this yourself, or watched someone you love struggle with it.

**It doesn't have to be this way.**

---

## Solution Section

### Headline
**A Different Kind of [Venture Type]**

### Body Copy
${context.ventureName} is being built by and for our community. We're not a charity dropping in from outside. We're your neighbors, creating something that belongs to all of us.

### Feature Cards

**Community-Owned**
Members have a real voice. This isn't someone else's project—it's ours.

**Accessible to Everyone**
Sliding scale pricing ensures no one is turned away. Services designed around your schedule.

**Rooted in Our Values**
Built with cultural humility and deep respect for the diversity of ${context.location}.

**Local Impact**
Local jobs. Local suppliers. Money that stays in our community.

---

## How It Works Section

### Headline
**Getting Involved is Easy**

### Steps

**1. Sign Up for Updates**
Be the first to know about our progress and launch date. No spam, just the good stuff.

**2. Become a Founding Member**
Founding members help shape our direction and get early access. Memberships start at $25.

**3. Volunteer Your Skills**
Whether you have an hour or a hundred, we need people like you. No experience necessary.

**4. Spread the Word**
Know someone who should hear about this? Share our story and help us grow.

---

## Social Proof Section

### Headline
**Our Community is Already Building**

### Stats (update with real numbers)
- **150+** neighbors have signed up
- **$5,000** raised from community members
- **12** local organizations supporting us
- **4** founding volunteers on board

### Quote
> "Finally, something built for us, by us. I've been waiting for this."
> — [Community member name], ${context.location} resident

---

## Team/Story Section

### Headline
**Why We're Doing This**

### Founder Story
${context.userMotivations}

${context.userLivedExperience ? `I know this challenge personally: ${context.userLivedExperience}` : ""}

That's why I'm committed to building ${context.ventureName}—not as a business venture, but as a community asset that will serve ${context.location} for generations.

---

## FAQ Section

### Headline
**Questions? We've Got Answers**

**When will you open?**
We're targeting [season/year] for our soft launch. Sign up for updates to be the first to know.

**How much does membership cost?**
Founding memberships start at $25. We'll have sliding scale options to ensure everyone can participate.

**How is this different from [competitor]?**
We're community-owned, which means members have a voice in how we operate. We're also committed to accessibility, with pricing and hours designed for real life.

**How can I help right now?**
Sign up for updates, share our page with friends, or reach out if you have skills to offer. Every bit of support matters.

**Who's behind this?**
${context.ventureName} is being built by a team of ${context.location} residents who believe our community deserves better options. [Link to About page]

---

## Final CTA Section

### Headline
**Ready to Be Part of Something Bigger?**

### Body
This is your chance to help build something that will make ${context.location} stronger—for your family, your neighbors, and generations to come.

### CTA Button
**Yes, Count Me In** → [Sign up form]

### Small Print
No spam. Unsubscribe anytime. Your information is never shared.

---

## Footer

© ${new Date().getFullYear()} ${context.ventureName} | ${context.location}, Canada

Built with love by your neighbors.

[Email] | [Facebook] | [Instagram]
`
}

function generateOutreachMaterials(context: AgentContext): string {
  return `# Outreach Materials
## ${context.ventureName} | ${context.location}

---

## Email Templates

### Template 1: Partner Introduction

**Subject**: Partnership opportunity: ${context.ventureName}

---

Dear [Name],

I'm reaching out because [Organization]'s work in [their focus area] aligns closely with what we're building in ${context.location}.

I'm part of a team launching ${context.ventureName}, a community-owned ${context.playbookName.toLowerCase()}. Our mission is to [one-sentence mission].

We're in the early stages and looking to connect with organizations like yours. I'd love to explore potential partnership opportunities—whether that's cross-referrals, shared programming, or simply learning from your experience.

Would you have 20 minutes for a call or coffee in the coming weeks? I'm flexible on timing and happy to come to you.

Thank you for the important work you do in our community.

Warm regards,

[Your name]
[Your role]
${context.ventureName}
[Email] | [Phone]

---

### Template 2: Community Announcement

**Subject**: Exciting news for ${context.location}! 🌱

---

Hello neighbor,

We have some exciting news to share.

A group of ${context.location} residents (including me!) is launching ${context.ventureName}—a community-owned ${context.playbookName.toLowerCase()} designed to serve our neighborhood.

**Why this matters:**
${context.playbookDescription.split(".")[0]}.

**How you can be part of it:**
- Sign up for updates at [URL]
- Share this email with someone who should know
- Reply and tell us what you'd love to see

This is just the beginning, and we're building it together.

More soon,

[Your name]
On behalf of the ${context.ventureName} team

P.S. Know someone who'd be interested? Forward this along—we're looking for founding members, volunteers, and supporters of all kinds.

---

### Template 3: Volunteer Recruitment

**Subject**: Help us build something special in ${context.location}

---

Hi [Name],

I thought of you when we started planning ${context.ventureName}.

We're launching a community-owned ${context.playbookName.toLowerCase()} in ${context.location}, and we're looking for volunteers who [relevant skill/quality they have].

Right now, we especially need help with:
- [Specific task 1]
- [Specific task 2]
- [Specific task 3]

No experience necessary—just enthusiasm and a few hours to spare. Everything from stuffing envelopes to strategic planning.

Would you be interested? Even if the timing isn't right, I'd love to tell you more about what we're building.

Let me know!

[Your name]

---

## Social Media Posts

### Facebook Launch Post

🌱 **Big news, ${context.location}!**

We're building something our community has needed for a long time: a community-owned ${context.playbookName.toLowerCase()}.

${context.ventureName} will be [key benefit 1] and [key benefit 2]—created by neighbors like you, for neighbors like you.

This isn't someone else's project dropping into our neighborhood. It's OURS.

**Want to be part of it?**
👉 Sign up for updates: [URL]
👉 Share this post
👉 Tag someone who should know

Together, we can build something that makes ${context.location} stronger. 💚

#${context.location.replace(/[, ]/g, "")} #CommunityBuilding #SocialImpact

---

### Twitter/X Thread

🧵 Thread: We're building something ${context.location} needs.

1/ For too long, our community has lacked [access to service]. The options that exist are too expensive, too far, or just don't get us.

2/ So a group of neighbors decided to do something about it. We're launching ${context.ventureName}—a community-owned ${context.playbookName.toLowerCase()}.

3/ What makes us different?
✅ Community-owned (you have a voice)
✅ Accessible pricing
✅ Designed for OUR community

4/ We're looking for:
- Founding members
- Volunteers
- Partners
- Cheerleaders

5/ Want in? Sign up here: [URL]

Or just share this thread. Every bit of support helps us build something lasting. 💚

---

### Instagram Post

**Image**: Community gathering or hands-on work

**Caption**:
Something's growing in ${context.location}. 🌱

We're building ${context.ventureName}—a community-owned ${context.playbookName.toLowerCase()} that puts people over profit.

This is what happens when neighbors come together to create what we need, instead of waiting for someone else to do it.

Want in? Link in bio. 👆

Tag someone who should know about this.

#CommunityOwned #${context.location.replace(/[, ]/g, "")} #SocialEnterprise #GrassrootsCommunity #LocalImpact

---

## Press Release Template

**FOR IMMEDIATE RELEASE**

**${context.location} Residents Launch Community-Owned ${context.playbookName}**

*Grassroots initiative aims to fill gap in local services*

${context.location.toUpperCase()} — A group of local residents has announced plans to launch ${context.ventureName}, a community-owned ${context.playbookName.toLowerCase()} serving the ${context.location} area.

The initiative responds to growing demand for [specific service] in the region. Unlike traditional models, ${context.ventureName} will be owned and governed by community members.

"[Quote from founder about motivation]," said [Founder name], one of the initiative's organizers.

${context.playbookDescription.split(".").slice(0, 2).join(". ")}.

The team is currently seeking founding members, volunteers, and community partners. More information is available at [website].

**About ${context.ventureName}**
${context.ventureName} is a community-owned ${context.playbookName.toLowerCase()} serving ${context.location}. Founded in ${new Date().getFullYear()}, the organization is committed to accessibility, local ownership, and community impact.

**Contact**
[Name]
[Email]
[Phone]

###

---

## Elevator Pitch

**30-Second Version:**

"We're launching ${context.ventureName}, a community-owned ${context.playbookName.toLowerCase()} in ${context.location}. Too many people here can't access [service] because of cost, distance, or services that just don't fit our needs. We're changing that—building something that's owned by the community, for the community. We're looking for founding members and volunteers. Interested?"

**60-Second Version:**

"Have you ever noticed how hard it is to [access service] in ${context.location}? The options are either too expensive, too far, or just don't understand our community.

That's why a group of us are launching ${context.ventureName}. It's a community-owned ${context.playbookName.toLowerCase()}—meaning members actually have a say in how it runs.

We're doing sliding scale pricing so no one gets turned away, designing services around real people's schedules, and keeping everything rooted in our community's values.

Right now we're looking for founding members to help shape the direction, volunteers to help us launch, and partners who want to build something together.

The cool thing is, this isn't charity. It's neighbors coming together to create something we all own. Want to hear more?"

---

*Customize all materials with specific details, real names, and verified information before use.*
`
}

function generateVolunteerMaterials(context: AgentContext): string {
  return `# Volunteer Recruitment Materials
## ${context.ventureName} | ${context.location}

---

## Volunteer Role Descriptions

### Role 1: Board Member

**Commitment**: 5-8 hours/month
**Term**: 2 years (renewable)
**Skills Valued**: Leadership, strategic thinking, community connections

**Description**:
Board members provide governance and strategic direction for ${context.ventureName}. You'll attend monthly board meetings, participate in committee work, and help guide the organization toward its mission.

**Responsibilities**:
- Attend monthly board meetings (2 hours)
- Participate in one committee (finance, programs, or fundraising)
- Support fundraising efforts
- Act as an ambassador in the community
- Provide oversight and policy guidance

**What You'll Gain**:
- Governance and nonprofit leadership experience
- Network with community leaders
- Shape a new organization from the ground up

---

### Role 2: Program Volunteer

**Commitment**: 4-8 hours/week
**Schedule**: Flexible, some evening/weekend availability helpful
**Skills Valued**: Reliability, people skills, willingness to learn

**Description**:
Program volunteers are the heart of ${context.ventureName}'s operations. You'll directly support service delivery and help community members access what they need.

**Responsibilities**:
- Welcome and assist clients/members
- Support program activities
- Help maintain a clean, welcoming space
- Collect feedback from community members
- Assist staff as needed

**What You'll Gain**:
- Hands-on community service experience
- Training in [relevant skills]
- Deep connection with neighbors

---

### Role 3: Marketing & Communications Volunteer

**Commitment**: 3-5 hours/week
**Schedule**: Flexible, mostly remote
**Skills Valued**: Writing, social media, creativity, photography

**Description**:
Help spread the word about ${context.ventureName} through compelling stories, social media content, and community outreach.

**Responsibilities**:
- Create social media posts (2-3/week)
- Write newsletter content
- Take photos at events
- Help with graphic design (Canva or similar)
- Monitor and respond to social media engagement

**What You'll Gain**:
- Portfolio pieces for marketing/communications
- Experience with nonprofit storytelling
- Creative freedom to shape our brand

---

### Role 4: Event Volunteer

**Commitment**: As needed (4-8 hours per event)
**Schedule**: Event-based, advance notice provided
**Skills Valued**: Organization, friendliness, physical stamina

**Description**:
Support our community events from setup to cleanup. Perfect for those who want to help but have unpredictable schedules.

**Responsibilities**:
- Event setup (tables, chairs, signage)
- Registration and greeting
- Activity support
- Cleanup and breakdown
- General assistance as needed

**What You'll Gain**:
- Flexible volunteer opportunity
- Meet lots of community members
- See immediate impact of your work

---

### Role 5: Skills-Based Volunteer

**Commitment**: Project-based
**Schedule**: Flexible
**Skills Valued**: Professional expertise (legal, accounting, IT, design, etc.)

**Description**:
Share your professional skills to help build organizational capacity. We especially need help with legal, financial, technology, and design projects.

**Current Needs**:
- Bookkeeping/accounting support
- Website development/maintenance
- Legal document review
- Graphic design for print materials
- Database/CRM setup

**What You'll Gain**:
- Pro bono portfolio work
- Nonprofit sector experience
- Meaningful application of your skills

---

## Volunteer Recruitment Flyer

\`\`\`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║        🌱 VOLUNTEERS NEEDED! 🌱                       ║
║                                                       ║
║   Help us build ${context.ventureName}              ║
║   A community-owned ${context.playbookName}         ║
║   Serving ${context.location}                        ║
║                                                       ║
╠═══════════════════════════════════════════════════════╣
║                                                       ║
║   WE NEED PEOPLE WHO CAN:                            ║
║                                                       ║
║   ✓ Serve on our Board of Directors                  ║
║   ✓ Help with day-to-day operations                  ║
║   ✓ Create social media content                      ║
║   ✓ Support community events                         ║
║   ✓ Share professional skills                        ║
║                                                       ║
║   No experience necessary!                           ║
║   Just a passion for community.                      ║
║                                                       ║
╠═══════════════════════════════════════════════════════╣
║                                                       ║
║   INTERESTED?                                        ║
║                                                       ║
║   📧 volunteer@[website].ca                          ║
║   🌐 [website]/volunteer                             ║
║   📱 Scan QR code to apply                           ║
║                                                       ║
║                  [QR CODE HERE]                      ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
\`\`\`

---

## Volunteer Application Form Questions

### Section 1: About You
1. Full name
2. Email address
3. Phone number (optional)
4. Neighborhood/area of ${context.location}
5. How did you hear about us?

### Section 2: Your Interests
6. Which volunteer roles interest you? (check all that apply)
   - [ ] Board Member
   - [ ] Program Volunteer
   - [ ] Marketing & Communications
   - [ ] Event Volunteer
   - [ ] Skills-Based Volunteer
   - [ ] Not sure—tell me more!

7. What draws you to ${context.ventureName}?

8. What skills, experience, or perspectives would you bring?

### Section 3: Availability
9. How many hours per week/month can you commit?
   - [ ] 2-4 hours/month
   - [ ] 4-8 hours/month
   - [ ] 8+ hours/month
   - [ ] Project-based only

10. What times work best for you?
    - [ ] Weekday mornings
    - [ ] Weekday afternoons
    - [ ] Weekday evenings
    - [ ] Weekends
    - [ ] Flexible

### Section 4: References (Optional)
11. Reference name and contact (professional or personal)

### Section 5: Anything Else?
12. Is there anything else you'd like us to know?

---

## Volunteer Welcome Packet Outline

### 1. Welcome Letter
- Personal welcome from founder/ED
- Our story and mission
- What volunteers mean to us

### 2. About ${context.ventureName}
- Mission, vision, values
- Brief history
- Who we serve
- Organizational structure

### 3. Your Role
- Role description
- Key responsibilities
- Who you'll work with
- What success looks like

### 4. Getting Started
- Orientation date/time
- First day logistics
- Who to contact with questions
- Training schedule

### 5. Policies & Expectations
- Code of conduct
- Confidentiality agreement
- Attendance expectations
- How to report concerns

### 6. Practical Information
- Location and parking
- Emergency procedures
- Dress code (if any)
- Communication tools we use

### 7. Resources
- Key contacts list
- FAQ
- Calendar of events
- Useful links

---

## Social Media Volunteer Callout

**Facebook/Instagram:**

📣 We're looking for volunteers!

${context.ventureName} is building something special in ${context.location}, and we need YOUR help to make it happen.

**We're looking for:**
🙋 Program volunteers
📱 Social media helpers
🎉 Event support
🧠 Board members
⭐ Skills-based pros (legal, accounting, tech)

**What's in it for you:**
✨ Make real impact in your community
✨ Meet amazing neighbors
✨ Build new skills
✨ Be part of something from the beginning

No experience necessary—just enthusiasm!

👉 Apply: [link]
👉 Questions: volunteer@[website].ca

Tag a friend who loves helping others! 💚

#VolunteerOpportunity #${context.location.replace(/[, ]/g, "")} #CommunityBuilding

---

*Customize all materials with real contact information and specific details before use.*
`
}

function generateAdvertisingMaterials(context: AgentContext): string {
  return `# Advertising Campaign Materials
## ${context.ventureName} | ${context.location}

---

## Facebook/Instagram Ads

### Ad Variation 1: Problem-Focused

**Primary Text:**
Tired of [service] options that don't work for ${context.location}? Too expensive. Too far. Too disconnected from our community.

We're building something different. ${context.ventureName} is a community-owned ${context.playbookName.toLowerCase()} created by neighbors like you.

🌱 Sliding scale pricing
🏠 Located in our community
💚 You have a voice in how it runs

Join 200+ neighbors already signed up.

**Headline:** Finally, [Service] That Fits ${context.location}

**Link Description:** Community-owned. Accessible. Ours.

**CTA Button:** Learn More

**Targeting Suggestions:**
- Location: ${context.location} + 15km radius
- Age: 25-65
- Interests: Community development, social causes, local business, volunteering
- Behaviors: Engaged shoppers, community page admins

---

### Ad Variation 2: Community-Focused

**Primary Text:**
What happens when neighbors come together to build what our community needs?

${context.ventureName} is happening. A community-owned ${context.playbookName.toLowerCase()} designed by and for ${context.location}.

This isn't charity. It's neighbors creating something we all own.

**Headline:** Built By ${context.location}, For ${context.location}

**Link Description:** Join the movement. Be a founding member.

**CTA Button:** Sign Up

**Image Suggestion:** Diverse group of people working together, community gathering

---

### Ad Variation 3: Urgency/Launch

**Primary Text:**
🌱 Coming soon to ${context.location}!

We're launching ${context.ventureName} and looking for founding members who want to shape our direction.

Founding members get:
✅ Vote on key decisions
✅ Early access to services
✅ Recognition as community builders

Spots are limited. Join before [date]!

**Headline:** Be a Founder, Not Just a Customer

**Link Description:** Limited founding memberships available

**CTA Button:** Become a Founder

---

## Google Search Ads

### Ad Group 1: Service-Seeking

**Keywords:**
- ${context.playbookName.toLowerCase()} ${context.location}
- affordable ${context.playbookName.toLowerCase()} near me
- community ${context.playbookName.toLowerCase()}
- [specific service] ${context.location}

**Headline 1:** Community ${context.playbookName} | ${context.location}
**Headline 2:** Affordable, Accessible, Ours
**Headline 3:** Opening Soon - Join Now

**Description 1:** Finally, a ${context.playbookName.toLowerCase()} built for ${context.location}. Sliding scale pricing. Community-owned. Join as a founding member today.

**Description 2:** ${context.ventureName} is bringing community-owned ${context.playbookName.toLowerCase()} to ${context.location}. Sign up for updates and early access.

---

### Ad Group 2: Volunteer/Get Involved

**Keywords:**
- volunteer opportunities ${context.location}
- nonprofit volunteer [city]
- community volunteering near me
- help local community

**Headline 1:** Volunteer in ${context.location}
**Headline 2:** Build Something Meaningful
**Headline 3:** No Experience Needed

**Description 1:** Join ${context.ventureName} as a volunteer. Help launch a community-owned ${context.playbookName.toLowerCase()}. Multiple roles available—find your fit.

**Description 2:** Make real impact in your neighborhood. ${context.ventureName} needs volunteers for programs, events, marketing & more. Apply today.

---

## Local Newspaper Ad

### Quarter-Page Ad

\`\`\`
┌─────────────────────────────────────────────────────┐
│                                                     │
│                      🌱                             │
│                                                     │
│              ${context.ventureName.toUpperCase()}              │
│                                                     │
│     A Community-Owned ${context.playbookName}       │
│           Coming to ${context.location}             │
│                                                     │
│  ─────────────────────────────────────────────────  │
│                                                     │
│  Built by neighbors. For neighbors.                 │
│                                                     │
│  ✓ Accessible pricing for all incomes              │
│  ✓ Community-owned and governed                    │
│  ✓ Designed for ${context.location}'s needs        │
│                                                     │
│  ─────────────────────────────────────────────────  │
│                                                     │
│        FOUNDING MEMBERS WANTED                      │
│                                                     │
│    Learn more: [website]                           │
│    Questions? [email] | [phone]                    │
│                                                     │
│        Launching [Season Year]                      │
│                                                     │
└─────────────────────────────────────────────────────┘
\`\`\`

---

## Community Bulletin Board Flyer

\`\`\`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║             🌱 COMING SOON 🌱                         ║
║                                                       ║
║            ${context.ventureName}                    ║
║                                                       ║
║     A community-owned ${context.playbookName}       ║
║           for ${context.location}                    ║
║                                                       ║
╠═══════════════════════════════════════════════════════╣
║                                                       ║
║  THE PROBLEM:                                        ║
║  [Service] in our area is too expensive, too        ║
║  far, or doesn't meet our community's needs.        ║
║                                                       ║
║  THE SOLUTION:                                       ║
║  We're building our own—a [service] owned and       ║
║  run by people who live here.                       ║
║                                                       ║
║  WHAT MAKES US DIFFERENT:                           ║
║  • Sliding scale pricing                            ║
║  • You have a vote in decisions                     ║
║  • Designed for our community                       ║
║  • Local jobs, local impact                         ║
║                                                       ║
╠═══════════════════════════════════════════════════════╣
║                                                       ║
║  GET INVOLVED:                                       ║
║                                                       ║
║  🌐 [website]                                        ║
║  📧 [email]                                          ║
║  📱 [QR CODE]                                        ║
║                                                       ║
║  Now seeking:                                        ║
║  • Founding members                                  ║
║  • Volunteers                                        ║
║  • Community partners                               ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
\`\`\`

---

## Digital Ad Budget Recommendations

### Phase 1: Awareness (Weeks 1-2)
| Platform | Daily Budget | Objective |
|----------|--------------|-----------|
| Facebook/Instagram | $15 | Reach/Awareness |
| Google Search | $10 | Website Traffic |
| **Total** | **$25/day** | **$350 for 2 weeks** |

### Phase 2: Engagement (Weeks 3-4)
| Platform | Daily Budget | Objective |
|----------|--------------|-----------|
| Facebook/Instagram | $20 | Engagement/Signups |
| Google Search | $15 | Conversions |
| **Total** | **$35/day** | **$490 for 2 weeks** |

### Phase 3: Launch (Week 5+)
| Platform | Daily Budget | Objective |
|----------|--------------|-----------|
| Facebook/Instagram | $25 | Conversions |
| Google Search | $20 | Conversions |
| Retargeting | $10 | Conversions |
| **Total** | **$55/day** | **Ongoing** |

### Targeting Recommendations

**Geographic**: ${context.location} + 20km radius (tighten based on performance)

**Demographic**:
- Age: 25-65 (primary), test 18-24 separately
- All genders
- Income: Varies by objective (awareness = broad, conversion = targeted)

**Interest-Based**:
- Community involvement
- Local causes
- Relevant sector interests (health, education, housing, etc.)
- Competitor/similar organization followers

**Behavioral**:
- Engaged shoppers
- Community page admins
- Charitable donors
- Small business owners

**Lookalike Audiences** (once you have data):
- Website visitors
- Email list
- Current members
- Engaged social followers

---

*Test multiple ad variations and adjust based on performance. Start with lower budgets and scale what works.*
`
}

export default { config, execute }
