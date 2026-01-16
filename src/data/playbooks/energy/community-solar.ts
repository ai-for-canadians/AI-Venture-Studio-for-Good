import type { Playbook } from "@/types"

export const communitySolar: Playbook = {
  id: "energy-community-solar",
  name: "Community Solar Garden",
  category: "energy",
  description: `A shared solar energy project that allows community members to benefit from solar power without installing panels on their own property. Members subscribe to a portion of a larger solar installation and receive credits on their electricity bills for the power their share generates.

Community solar removes the barriers that prevent most households from going solar: renters can't install panels, many roofs are unsuitable, and upfront costs are prohibitive. By pooling resources into a shared installation on suitable land or rooftops, the community achieves economies of scale while making clean energy accessible to everyone.

These projects often prioritize low-income households, ensuring that the benefits of renewable energy reach those who need utility savings most. Many successful projects are structured as cooperatives, giving members democratic control over the installation.`,
  problemAddressed:
    "Most households cannot access solar energy: 80% of residential rooftops are unsuitable, renters have no installation rights, and upfront costs of $15,000-30,000 exclude low and moderate-income families. This means clean energy benefits flow primarily to wealthy homeowners, while others face rising utility costs.",
  expectedImpact:
    "Generates 500kW-2MW of clean energy annually. Reduces electricity bills by 10-20% for 100-500 households. Prevents 500-2000 tonnes of CO2 emissions per year. Creates local green jobs. Provides energy cost stability for low-income households.",
  startupCostRange: {
    min: 200000,
    max: 1000000,
    currency: "CAD",
  },
  timelineMonths: {
    min: 12,
    max: 24,
  },
  requiredExpertise: [
    "Renewable energy systems",
    "Project finance",
    "Community organizing",
    "Regulatory compliance",
    "Utility relations",
    "Cooperative governance",
  ],
  successStories: [
    {
      location: "Guelph, ON",
      year: 2021,
      outcomes:
        "1MW installation, 300 households enrolled, 40% low-income subscribers, co-op model",
    },
    {
      location: "Nelson, BC",
      year: 2020,
      outcomes:
        "Rooftop installation on municipal buildings, 150 subscribers, community education program",
    },
    {
      location: "Halifax, NS",
      year: 2022,
      outcomes:
        "First community solar in Atlantic Canada, Indigenous partnership, 200 households",
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
    "solar",
    "renewable",
    "cooperative",
    "climate",
    "utilities",
    "clean energy",
  ],
}
