import type { Playbook } from "@/types"

export const mentalHealthPeerSupport: Playbook = {
  id: "healthcare-mental-health-peer-support",
  name: "Mental Health Peer Support Network",
  category: "healthcare",
  description: `A community-based mental health program where people with lived experience of mental health challenges support others on their recovery journeys. Trained peer support workers provide non-clinical support through one-on-one meetings, group sessions, and community connections.

Peer support is founded on the principle that people who have "been there" can offer unique understanding and hope. Unlike clinical treatment focused on symptoms and diagnoses, peer support focuses on the whole person, their strengths, and their goals. Research shows peer support reduces hospitalizations, improves recovery outcomes, and decreases mental health system costs.

These programs often fill gaps in the formal mental health system, providing immediate, accessible support without waitlists. They're particularly effective for populations underserved by traditional mental health services, including youth, seniors, newcomers, and Indigenous communities.`,
  problemAddressed:
    "Mental health services have long waitlists (often 6-18 months), high costs, and clinical approaches that don't work for everyone. Many people in crisis have nowhere to turn. Stigma prevents people from seeking help, while isolation worsens mental health challenges. The formal system focuses on illness rather than recovery and wellness.",
  expectedImpact:
    "Supports 200-500 community members annually. Provides immediate access with no waitlist. Reduces emergency room visits and hospitalizations by 25-40%. Trains and employs 10-20 peer support workers with lived experience. Builds community connections and reduces isolation.",
  startupCostRange: {
    min: 30000,
    max: 120000,
    currency: "CAD",
  },
  timelineMonths: {
    min: 4,
    max: 12,
  },
  requiredExpertise: [
    "Mental health peer support",
    "Program management",
    "Training facilitation",
    "Community mental health",
    "Crisis response protocols",
    "Nonprofit governance",
  ],
  successStories: [
    {
      location: "Toronto, ON",
      year: 2022,
      outcomes:
        "Youth-focused program, 400 young people supported, 50% reduction in crisis service use, peer-led",
    },
    {
      location: "Vancouver, BC",
      year: 2021,
      outcomes:
        "Warm line (phone support), 24/7 availability, 15,000 calls annually, 20 peer workers employed",
    },
    {
      location: "Whitehorse, YT",
      year: 2020,
      outcomes:
        "Indigenous-led, land-based healing integration, trauma-informed, 150 community members served",
    },
  ],
  stepSequence: [
    "market-assessment",
    "competitive-analysis",
    "local-contacts",
    "business-plan",
    "landing-page",
    "outreach",
    "volunteer-recruitment",
    "advertising",
  ],
  tags: [
    "healthcare",
    "mental health",
    "peer support",
    "recovery",
    "wellness",
    "lived experience",
    "community",
  ],
}
