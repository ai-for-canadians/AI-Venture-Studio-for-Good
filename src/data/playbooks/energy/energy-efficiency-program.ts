import type { Playbook } from "@/types"

export const energyEfficiencyProgram: Playbook = {
  id: "energy-efficiency-program",
  name: "Neighborhood Energy Efficiency Program",
  category: "energy",
  description: `A community-based program that helps households reduce energy consumption and costs through home energy assessments, weatherization, and efficiency upgrades. Trained community members conduct assessments and coordinate improvements, making energy efficiency accessible and affordable for all residents.

Energy efficiency is the cheapest and fastest way to reduce both energy costs and carbon emissions, but most households don't know where to start or can't afford professional assessments. This program brings energy expertise directly into neighborhoods, combining group purchasing power with peer education to achieve widespread adoption.

The program typically offers tiered services: free DIY kits and education for all, subsidized assessments for moderate-income households, and fully funded retrofits for low-income residents. This ensures everyone can participate regardless of income level.`,
  problemAddressed:
    "Canadian homes waste 25-40% of heating energy through poor insulation, air leaks, and inefficient systems. Low-income households spend a disproportionate share of income on energy (up to 10% vs. 3% average) and live in the least efficient housing. Professional energy audits cost $300-500, putting them out of reach for those who need them most.",
  expectedImpact:
    "Reduces household energy use by 20-35%. Saves participating households $400-1,200 annually on utilities. Completes 200-500 home assessments per year. Achieves community-wide emissions reduction of 15-25%. Creates 3-5 local green jobs.",
  startupCostRange: {
    min: 25000,
    max: 100000,
    currency: "CAD",
  },
  timelineMonths: {
    min: 4,
    max: 12,
  },
  requiredExpertise: [
    "Building science",
    "Energy auditing",
    "Community outreach",
    "Program management",
    "Contractor coordination",
    "Grant writing",
  ],
  successStories: [
    {
      location: "Edmonton, AB",
      year: 2022,
      outcomes:
        "500 homes assessed, average 28% energy reduction, $600K annual community savings",
    },
    {
      location: "Ottawa, ON",
      year: 2021,
      outcomes:
        "Focus on older neighborhoods, 300 retrofits completed, local contractor network developed",
    },
    {
      location: "Saskatoon, SK",
      year: 2020,
      outcomes:
        "Indigenous community partnership, culturally appropriate delivery, 150 homes upgraded",
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
    "energy",
    "efficiency",
    "weatherization",
    "climate",
    "retrofits",
    "utilities",
    "home improvement",
  ],
}
