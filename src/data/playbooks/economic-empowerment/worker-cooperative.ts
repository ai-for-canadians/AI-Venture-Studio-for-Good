import type { Playbook } from "@/types"

export const workerCooperative: Playbook = {
  id: "economic-worker-cooperative",
  name: "Worker-Owned Cleaning Cooperative",
  category: "economic_empowerment",
  description: `An employee-owned cleaning business where workers share ownership, make decisions democratically, and split profits equitably. Unlike traditional cleaning companies where owners take most profits while workers earn minimum wage, co-op members typically earn 50-100% more while building equity in their business.

The cleaning industry employs millions of workers—predominantly women, immigrants, and people of color—often in exploitative conditions with no benefits, unpredictable hours, and wages that haven't kept pace with living costs. Worker cooperatives flip this model, giving cleaners control over their schedules, clients, and earnings.

This playbook focuses on cleaning as an accessible entry point to worker ownership, requiring minimal startup capital and specialized skills while serving steady demand. The model is easily replicable: over 60 cleaning co-ops operate across North America, often connected through networks that share best practices and refer clients.`,
  problemAddressed:
    "Cleaning workers earn $12-15/hour while companies charge clients $30-50/hour, with the difference going to owners and overhead. Workers face wage theft, no benefits, and physical demands without adequate rest or equipment. Many are undocumented and fear reporting violations. Meanwhile, clients often want to support ethical businesses but lack options.",
  expectedImpact:
    "Increases worker earnings to $20-30/hour plus profit shares. Provides health benefits and paid time off. Creates 10-25 living-wage jobs within 2 years. Builds $50,000-200,000 in shared equity. 80% of co-op members report improved quality of life. Serves 100+ residential and commercial clients with ethical, quality service.",
  startupCostRange: {
    min: 5000,
    max: 25000,
    currency: "CAD",
  },
  timelineMonths: {
    min: 3,
    max: 9,
  },
  requiredExpertise: [
    "Cooperative governance and bylaws",
    "Cleaning operations and training",
    "Marketing and client acquisition",
    "Financial management and bookkeeping",
    "Labor rights and compliance",
  ],
  successStories: [
    {
      location: "Bronx, NY",
      year: 2018,
      outcomes:
        "30+ worker-owners, average income doubled, health insurance for all members, $100K in shared savings",
    },
    {
      location: "Oakland, CA",
      year: 2017,
      outcomes:
        "Immigrant women founders, now 50 members, provides childcare stipends, 100% worker retention",
    },
    {
      location: "Montreal, QC",
      year: 2020,
      outcomes:
        "Serves corporate clients with social procurement policies, B-Corp certified, members earn $25/hour average",
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
    "worker cooperative",
    "cleaning services",
    "worker ownership",
    "living wage",
    "economic democracy",
    "immigrant workers",
    "social enterprise",
  ],
}
