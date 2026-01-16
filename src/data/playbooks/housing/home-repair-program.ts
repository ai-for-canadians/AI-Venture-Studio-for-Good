import type { Playbook } from "@/types"

export const homeRepairProgram: Playbook = {
  id: "housing-home-repair-program",
  name: "Community Home Repair Program",
  category: "housing",
  description: `A volunteer-driven program that provides free or low-cost home repairs for elderly, disabled, and low-income homeowners who cannot afford or physically perform necessary maintenance. Trained volunteers help with essential repairs that keep homes safe, warm, and accessible.

Many homeowners, particularly seniors on fixed incomes, face a difficult choice: pay for expensive repairs or let their homes deteriorate to unsafe conditions. This program mobilizes community volunteers—from skilled tradespeople to general helpers—to provide repairs ranging from accessibility modifications to weatherization to emergency fixes.

Beyond the physical repairs, these programs build relationships between neighbors and allow seniors to age safely in their homes, maintaining community connections and avoiding costly institutional care.`,
  problemAddressed:
    "Low-income homeowners, particularly elderly and disabled residents, often cannot afford critical home repairs. Deferred maintenance leads to unsafe living conditions, higher utility bills, health hazards, and eventual displacement. Professional repairs can cost thousands of dollars that fixed-income households simply don't have.",
  expectedImpact:
    "Completes 50-100 home repairs annually. Helps 30-50 homeowners stay safely in their homes. Reduces heating costs by 15-25% through weatherization. Prevents falls and injuries through accessibility modifications. Mobilizes 100+ community volunteers per year.",
  startupCostRange: {
    min: 15000,
    max: 75000,
    currency: "CAD",
  },
  timelineMonths: {
    min: 3,
    max: 9,
  },
  requiredExpertise: [
    "Construction/trades knowledge",
    "Volunteer coordination",
    "Nonprofit management",
    "Community outreach",
    "Safety training",
  ],
  successStories: [
    {
      location: "Hamilton, ON",
      year: 2022,
      outcomes:
        "85 homes repaired, 150 volunteers engaged, $200K in repairs provided at $40K operating cost",
    },
    {
      location: "Winnipeg, MB",
      year: 2021,
      outcomes:
        "Focus on Indigenous elders, 40 homes weatherized, partnership with trades training program",
    },
    {
      location: "Halifax, NS",
      year: 2020,
      outcomes:
        "Emergency repair fund, 24-hour response for urgent issues, 60 households served",
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
    "housing",
    "repairs",
    "seniors",
    "accessibility",
    "volunteers",
    "weatherization",
    "aging in place",
  ],
}
