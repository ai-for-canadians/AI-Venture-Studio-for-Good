import type { Playbook } from "@/types"

export const toolLibrary: Playbook = {
  id: "environment-tool-library",
  name: "Community Tool Library",
  category: "environment",
  description: `A lending library for tools, equipment, and household items that community members can borrow for free or a small fee. From power drills to pressure washers, sewing machines to camping gear, tool libraries make expensive items accessible to everyone while reducing consumption and waste.

The average power drill is used for only 13 minutes in its entire lifetime, yet every household feels they need to own one. Tool libraries challenge this throwaway culture by enabling sharing at the neighborhood level. Members save money, reduce clutter, and build skills through workshops and repair cafes.

Beyond lending, these spaces become community hubs where neighbors teach each other skills, repair broken items together, and build the practical capabilities that create resilient communities.`,
  problemAddressed:
    "Households spend thousands on tools and equipment used only occasionally, while many families can't afford basic tools needed for home repairs and projects. This leads to deferred maintenance, reliance on expensive contractors, and excessive consumption of rarely-used items that eventually end up in landfills.",
  expectedImpact:
    "Saves members an average of $500-1,000 annually on tool purchases and rentals. Reduces consumption of new tools by 60% among active members. Prevents 5+ tons of tools and equipment from entering landfills. Enables 100+ home repair projects per year. Builds practical skills through 50+ annual workshops.",
  startupCostRange: {
    min: 10000,
    max: 50000,
    currency: "CAD",
  },
  timelineMonths: {
    min: 4,
    max: 12,
  },
  requiredExpertise: [
    "Library/inventory management",
    "Tool maintenance and safety",
    "Community space management",
    "Workshop facilitation",
    "Volunteer coordination",
  ],
  successStories: [
    {
      location: "Toronto, ON",
      year: 2019,
      outcomes:
        "3,000+ tools in inventory, 2,500 active members, 15,000 loans per year, repair cafe fixes 500+ items annually",
    },
    {
      location: "Portland, OR",
      year: 2018,
      outcomes:
        "Partnership with city library system, 5 branch locations, serves 10,000 households",
    },
    {
      location: "Edmonton, AB",
      year: 2021,
      outcomes:
        "Specialized collection for newcomers and low-income families, 40% of members are first-time tool users",
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
    "sharing economy",
    "tool lending",
    "sustainability",
    "repair cafe",
    "skill building",
    "waste reduction",
    "community space",
  ],
}
