import type { Playbook } from "@/types"

export const volunteerDriverNetwork: Playbook = {
  id: "transportation-volunteer-drivers",
  name: "Volunteer Driver Network",
  category: "transportation",
  description: `A coordinated network of volunteer drivers who provide free transportation to seniors, people with disabilities, and others who cannot drive themselves to essential appointments. Riders request trips through a central coordinator who matches them with available drivers.

Many people cannot drive due to age, disability, or economic circumstances, yet need transportation to medical appointments, grocery stores, and social activities. Public transit often doesn't serve their needs—fixed routes don't go to medical centers, schedules don't align with appointments, and physical limitations make buses inaccessible.

Volunteer driver programs fill this gap with door-to-door service that accommodates wheelchairs, walkers, and oxygen tanks. Beyond transportation, drivers often become friendly faces who check in on isolated neighbors, notice when someone seems unwell, and provide social connection during rides.`,
  problemAddressed:
    "3.6 million Americans miss medical appointments annually due to transportation barriers, leading to worse health outcomes and higher emergency costs. Ride-hailing services are expensive and drivers aren't trained for passengers with mobility needs. Rural areas especially lack transit options, isolating seniors and people with disabilities.",
  expectedImpact:
    "Provides 2,000-5,000 rides annually to medical appointments, groceries, and essential services. Reduces missed medical appointments by 80% among participants. Enables seniors to age in place rather than move to assisted living. Saves participants $3,000-6,000 annually in taxi/rideshare costs. Engages 30-75 volunteer drivers. Provides social connection and safety check-ins.",
  startupCostRange: {
    min: 5000,
    max: 30000,
    currency: "CAD",
  },
  timelineMonths: {
    min: 3,
    max: 9,
  },
  requiredExpertise: [
    "Volunteer coordination and scheduling",
    "Senior and disability services",
    "Insurance and liability management",
    "Dispatch and logistics software",
    "Driver training and safety",
  ],
  successStories: [
    {
      location: "Rural Vermont",
      year: 2019,
      outcomes:
        "Covers 50-mile radius, 4,500 rides annually, 90% are medical appointments, average rider age 78",
    },
    {
      location: "Mississauga, ON",
      year: 2020,
      outcomes:
        "Partnership with cancer center, provides 2,000 rides to treatment annually, 100% appointment completion rate",
    },
    {
      location: "Halifax, NS",
      year: 2021,
      outcomes:
        "Serves dialysis patients 3x weekly, 60 dedicated volunteers, riders report improved quality of life and independence",
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
    "transportation",
    "volunteer drivers",
    "seniors",
    "medical transportation",
    "accessibility",
    "rural communities",
    "aging in place",
  ],
}
