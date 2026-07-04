import type { Playbook } from "@/types"

export const communityComposting: Playbook = {
  id: "environment-community-composting",
  name: "Community Composting Hub",
  category: "environment",
  description: `A neighborhood-scale composting operation that diverts organic waste from landfills while producing nutrient-rich soil for local gardens and urban farms. Members drop off food scraps at convenient collection points, and the finished compost is distributed back to the community.

This model transforms what cities consider "waste" into a valuable resource, reducing methane emissions from landfills while building soil health. Community composting hubs often become gathering places where neighbors connect over shared environmental values, learning about sustainable practices together.

Successful programs partner with local restaurants, farmers markets, and community gardens, creating closed-loop systems where food waste becomes the foundation for growing more food locally.`,
  problemAddressed:
    "Organic waste makes up 30-40% of landfill contents, where it produces methane—a greenhouse gas 80x more potent than CO2. Most curbside composting programs don't exist or are inaccessible to apartment dwellers. Meanwhile, urban soils are often depleted, requiring expensive imported amendments for gardening.",
  expectedImpact:
    "Diverts 50-200 tons of organic waste from landfills annually. Produces 20-80 cubic yards of finished compost per year. Reduces neighborhood greenhouse gas emissions. Supplies 10-30 community gardens with free soil amendments. Engages 200+ households in sustainable waste practices.",
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
    "Composting science and operations",
    "Community organizing",
    "Logistics and collection routes",
    "Partnership development",
    "Environmental education",
  ],
  successStories: [
    {
      location: "Brooklyn, NY",
      year: 2021,
      outcomes:
        "150 tons diverted annually, 500+ member households, supplies 25 community gardens",
    },
    {
      location: "Vancouver, BC",
      year: 2020,
      outcomes:
        "Partnership with 12 restaurants, zero-waste certification program, 3 paid staff positions created",
    },
    {
      location: "Toronto, ON",
      year: 2022,
      outcomes:
        "Apartment building pilot serves 800 units, 60% participation rate, expanded to 5 buildings",
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
    "composting",
    "waste reduction",
    "sustainability",
    "urban agriculture",
    "climate action",
    "soil health",
    "zero waste",
  ],
}
