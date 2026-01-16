"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import type { LauncherProfile, Category, Venture, VentureStep } from "@/types"

interface DemoUser extends LauncherProfile {
  isDemo: true
}

interface DemoVenture extends Venture {
  playbookName: string
}

interface DemoContextType {
  user: DemoUser | null
  ventures: DemoVenture[]
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: Partial<DemoUser>) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<DemoUser>) => void
  completeOnboarding: (data: OnboardingData) => void
  createVenture: (playbookId: string, name: string, location: string) => DemoVenture
  getVenture: (id: string) => DemoVenture | undefined
  executeStep: (ventureId: string, stepId: string) => Promise<VentureStep>
}

interface OnboardingData {
  motivations: string
  impactInterests: Category[]
  livedExperience: string
  expertise: string[]
  budgetRange?: { min: number; max: number; currency: "CAD" | "USD" }
  location: string
}

const DemoContext = createContext<DemoContextType | null>(null)

const DEMO_USER_KEY = "demo_user"
const DEMO_VENTURES_KEY = "demo_ventures"

function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(() => {
    if (typeof window === "undefined") return null
    const stored = localStorage.getItem(DEMO_USER_KEY)
    return stored ? JSON.parse(stored) : null
  })

  const [ventures, setVentures] = useState<DemoVenture[]>(() => {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(DEMO_VENTURES_KEY)
    return stored ? JSON.parse(stored) : []
  })

  const persistUser = useCallback((u: DemoUser | null) => {
    setUser(u)
    if (u) {
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(u))
    } else {
      localStorage.removeItem(DEMO_USER_KEY)
    }
  }, [])

  const persistVentures = useCallback((v: DemoVenture[]) => {
    setVentures(v)
    localStorage.setItem(DEMO_VENTURES_KEY, JSON.stringify(v))
  }, [])

  const login = useCallback(
    async (email: string, _password: string) => {
      // Demo mode: auto-login with email
      const demoUser: DemoUser = {
        id: generateId(),
        name: email.split("@")[0],
        email,
        location: "",
        motivations: "",
        impactInterests: [],
        livedExperience: "",
        expertise: [],
        ventureIds: [],
        credits: 500, // Start with 500 demo credits
        membershipTier: "free",
        createdAt: new Date(),
        isDemo: true,
      }
      persistUser(demoUser)
    },
    [persistUser]
  )

  const register = useCallback(
    async (data: Partial<DemoUser>) => {
      const demoUser: DemoUser = {
        id: generateId(),
        name: data.name || "Demo User",
        email: data.email || "demo@example.com",
        location: data.location || "",
        motivations: "",
        impactInterests: [],
        livedExperience: "",
        expertise: [],
        ventureIds: [],
        credits: 500,
        membershipTier: "free",
        createdAt: new Date(),
        isDemo: true,
      }
      persistUser(demoUser)
    },
    [persistUser]
  )

  const logout = useCallback(() => {
    persistUser(null)
  }, [persistUser])

  const updateProfile = useCallback(
    (data: Partial<DemoUser>) => {
      if (!user) return
      const updated = { ...user, ...data }
      persistUser(updated)
    },
    [user, persistUser]
  )

  const completeOnboarding = useCallback(
    (data: OnboardingData) => {
      if (!user) return
      const updated: DemoUser = {
        ...user,
        ...data,
      }
      persistUser(updated)
    },
    [user, persistUser]
  )

  const createVenture = useCallback(
    (playbookId: string, name: string, location: string): DemoVenture => {
      const venture: DemoVenture = {
        id: generateId(),
        playbookId,
        playbookName: name,
        launcherId: user?.id || "",
        name,
        location,
        status: "draft",
        completedSteps: [],
        fundingReceived: 0,
        contributors: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const updated = [...ventures, venture]
      persistVentures(updated)

      if (user) {
        updateProfile({ ventureIds: [...user.ventureIds, venture.id] })
      }

      return venture
    },
    [user, ventures, persistVentures, updateProfile]
  )

  const getVenture = useCallback(
    (id: string) => ventures.find((v) => v.id === id),
    [ventures]
  )

  const executeStep = useCallback(
    async (ventureId: string, stepId: string): Promise<VentureStep> => {
      // Simulate step execution
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const step: VentureStep = {
        id: generateId(),
        ventureId,
        stepId,
        status: "completed",
        artifact: {
          type: "markdown",
          title: `${stepId.replace("-", " ")} Report`,
          content: generateDemoArtifact(stepId),
          generatedAt: new Date(),
        },
        executedAt: new Date(),
        cost: 25,
      }

      const ventureIndex = ventures.findIndex((v) => v.id === ventureId)
      if (ventureIndex >= 0) {
        const updatedVentures = [...ventures]
        updatedVentures[ventureIndex] = {
          ...updatedVentures[ventureIndex],
          completedSteps: [
            ...updatedVentures[ventureIndex].completedSteps,
            step,
          ],
          currentStep: stepId,
          updatedAt: new Date(),
        }
        persistVentures(updatedVentures)
      }

      // Deduct credits
      if (user && user.credits >= 25) {
        updateProfile({ credits: user.credits - 25 })
      }

      return step
    },
    [ventures, persistVentures, user, updateProfile]
  )

  return (
    <DemoContext.Provider
      value={{
        user,
        ventures,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        completeOnboarding,
        createVenture,
        getVenture,
        executeStep,
      }}
    >
      {children}
    </DemoContext.Provider>
  )
}

export function useDemo() {
  const context = useContext(DemoContext)
  if (!context) {
    throw new Error("useDemo must be used within a DemoProvider")
  }
  return context
}

function generateDemoArtifact(stepId: string): string {
  const artifacts: Record<string, string> = {
    "market-assessment": `# Market Assessment Report

## Executive Summary
Based on our analysis, there is significant demand for this venture in your community with limited existing solutions.

## Key Findings
- **Population**: 150,000+ residents in target area
- **Underserved segments**: 35% of residents lack easy access to similar services
- **Growth trend**: 12% population increase over last 5 years
- **Income demographics**: Median household income $52,000

## Opportunities Identified
1. Central location underserved by existing providers
2. Strong community interest based on social media sentiment
3. Partnership potential with local organizations
4. Government grant programs available

## Recommended Focus Areas
- Target the downtown core and surrounding neighborhoods
- Focus on accessibility and affordability
- Partner with existing community organizations

*This is a demo report. Real reports include detailed local research.*`,

    "competitive-analysis": `# Competitive Analysis Report

## Executive Summary
We identified 3 main competitors in your area, with clear opportunities for differentiation.

## Competitor Profiles

### Competitor A
- **Location**: 5km from target area
- **Strengths**: Established brand, loyal customer base
- **Weaknesses**: Limited hours, higher prices
- **Opportunity**: Offer extended hours and sliding scale pricing

### Competitor B
- **Location**: 8km from target area
- **Strengths**: Government funding, professional staff
- **Weaknesses**: Long wait times, bureaucratic
- **Opportunity**: Provide faster, more personalized service

### Competitor C
- **Location**: Online only
- **Strengths**: Convenient, scalable
- **Weaknesses**: No local presence, impersonal
- **Opportunity**: Combine digital convenience with local community feel

## Differentiation Strategy
Focus on community ownership, local hiring, and culturally relevant services.

*This is a demo report. Real reports include detailed competitor research.*`,

    "local-contacts": `# Key Local Contacts Directory

## Potential Partners

### Community Organizations
| Organization | Contact | Relevance |
|-------------|---------|-----------|
| Local Community Center | info@communitycenter.org | Potential venue partner |
| Neighborhood Association | president@neighborhood.org | Community buy-in |
| Faith Community Coalition | director@faithcoalition.org | Volunteer network |

### Government Contacts
- **City Councilor (Ward 5)**: Jane Smith - jane.smith@city.gov
- **Economic Development Office**: ecodev@city.gov
- **Community Grants Program**: grants@city.gov

### Potential Advisors
1. Dr. Sarah Johnson - Local university, community development expert
2. Michael Chen - Successful social entrepreneur in adjacent city
3. Maria Garcia - Retired executive with nonprofit board experience

### Funding Sources
- Community Foundation: $10K-50K grants available
- Credit Union Community Fund: Low-interest loans
- Provincial Innovation Grant: Up to $100K for social enterprises

*This is a demo report. Real reports include verified contact information.*`,

    "business-plan": `# Business Plan Draft

## Executive Summary
A community-driven venture addressing local needs through sustainable, member-focused operations.

## Mission Statement
To provide accessible, affordable services while building community wealth and resilience.

## Market Opportunity
- Target market: 50,000 potential customers
- Serviceable market: 15,000 in year 1
- Revenue potential: $500K by year 3

## Operations Plan
- **Location**: Central neighborhood (2,000 sq ft)
- **Staff**: 3 FT employees + 10 volunteers
- **Hours**: Mon-Sat 9am-7pm

## Financial Projections

| Year | Revenue | Expenses | Net |
|------|---------|----------|-----|
| 1 | $150,000 | $180,000 | -$30,000 |
| 2 | $350,000 | $300,000 | $50,000 |
| 3 | $500,000 | $400,000 | $100,000 |

## Startup Costs
- Facility: $50,000
- Equipment: $30,000
- Initial inventory: $20,000
- Working capital: $50,000
- **Total: $150,000**

## Implementation Timeline
- Month 1-2: Secure location and funding
- Month 3-4: Renovations and setup
- Month 5-6: Staff hiring and training
- Month 7: Soft launch
- Month 8: Grand opening

*This is a demo plan. Real plans include detailed financials.*`,

    "landing-page": `# Landing Page Copy

## Hero Section
**Headline**: "Together, We're Building Something Better"

**Subheadline**: Join your neighbors in creating a community-owned [venture type] that puts people first.

**CTA Button**: "Join the Movement"

## The Problem Section
Every day, families in our community struggle with [problem]. The current options are too expensive, too far, or just don't understand our needs.

## Our Solution Section
We're building a [venture type] that's:
- **Owned by the community** - Members have a voice
- **Priced for accessibility** - Sliding scale available
- **Rooted in our values** - Culturally relevant services

## How to Get Involved
1. **Sign up for updates** - Be the first to know
2. **Become a founding member** - Shape our direction
3. **Volunteer your skills** - Help us launch
4. **Contribute** - Every dollar builds community

## FAQ Section
**Q: When will you open?**
A: We're targeting [date] for our soft launch.

**Q: How much does membership cost?**
A: Founding memberships start at $25.

*This is demo copy. Real copy is customized to your venture.*`,

    outreach: `# Outreach Campaign Templates

## Email Templates

### Partner Introduction Email
**Subject**: Partnership opportunity: [Venture Name]

Dear [Name],

I'm reaching out because [Organization] shares our commitment to [cause]. We're launching [Venture Name], a community-owned initiative to [mission].

I'd love to explore how we might work together. Would you have 20 minutes for a call next week?

Best,
[Your name]

### Community Announcement
**Subject**: Exciting news for [Neighborhood]!

Neighbors,

We're thrilled to announce [Venture Name] is coming to our community!

[Brief description]

Sign up at [URL] to:
- Get updates on our progress
- Be first in line for founding membership
- Help shape our direction

Together, we can [impact statement].

## Social Media Posts

**Facebook Launch**:
Big news! 🎉 We're building a community-owned [venture type] right here in [location]. This is YOUR chance to help create something that puts people over profit. Join us → [link]

**Twitter Thread**:
1/ We have a problem in [location]. [Problem statement]
2/ The current solutions aren't working. Here's why...
3/ So we're building something different. A community-owned [venture type].
4/ Want to be part of it? Sign up here: [link]

*These are demo templates. Real templates are customized.*`,

    "volunteer-recruitment": `# Volunteer Recruitment Materials

## Volunteer Roles

### Board Member
- **Commitment**: 5 hrs/month
- **Skills needed**: Governance, strategy
- **Responsibilities**: Oversight, policy, fundraising

### Operations Volunteer
- **Commitment**: 4 hrs/week
- **Skills needed**: Customer service, reliability
- **Responsibilities**: Daily operations, member support

### Marketing Volunteer
- **Commitment**: 3 hrs/week
- **Skills needed**: Social media, writing
- **Responsibilities**: Content creation, community engagement

### Event Volunteer
- **Commitment**: As needed
- **Skills needed**: Organization, people skills
- **Responsibilities**: Event setup, registration, cleanup

## Recruitment Flyer

**VOLUNTEERS NEEDED!**

Help us build [Venture Name] - a community-owned [venture type] serving [location].

We need:
✓ Board members
✓ Operations help
✓ Marketing support
✓ Event volunteers

No experience necessary - just a passion for community!

Sign up: [URL]
Questions? [email]

## Volunteer Application Form
- Name, email, phone
- Availability (weekdays/weekends/evenings)
- Skills and interests
- Why do you want to volunteer?
- Reference (optional)

*These are demo materials. Real materials are customized.*`,

    advertising: `# Advertising Campaign Guide

## Facebook/Instagram Ads

### Ad Set 1: Awareness
**Audience**: Ages 25-65, within 10km, interests in community, local business, sustainability

**Ad Copy**:
"Tired of options that don't fit our community? We're building something different. A [venture type] owned by neighbors like you. Join the movement → [link]"

**Image**: Community gathering, diverse group, warm lighting

### Ad Set 2: Engagement
**Audience**: Retarget website visitors + lookalike audiences

**Ad Copy**:
"500 neighbors have already signed up. Be part of [location]'s newest community venture. Founding memberships available → [link]"

### Budget Recommendations
- Awareness phase: $10/day for 2 weeks
- Engagement phase: $15/day for 2 weeks
- Conversion phase: $20/day ongoing

## Google Ads

### Search Keywords
- "[location] [venture type]"
- "community [venture type] near me"
- "affordable [venture type] [location]"

### Ad Copy
Headline: Community-Owned [Venture Type] | [Location]
Description: Join your neighbors in building something better. Founding memberships available. Local. Affordable. Yours.

## Local Advertising
- Community newspaper: $200/month
- Local podcast sponsorship: $100/episode
- Community bulletin boards: Free
- Nextdoor sponsored posts: $50/week

*This is a demo guide. Real guides include specific targeting.*`,
  }

  return artifacts[stepId] || `# ${stepId} Report\n\nDemo content for this step.`
}
