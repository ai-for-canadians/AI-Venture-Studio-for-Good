import type { Playbook } from "@/types"

export const affordableHousingCoop: Playbook = {
  id: "housing-affordable-housing-coop",
  name: "Affordable Housing Co-op",
  category: "housing",
  description: `A member-owned housing cooperative that provides permanently affordable homes for low and moderate-income families. Members collectively own the building and make decisions democratically, creating stable, community-controlled housing that remains affordable across generations.

Unlike traditional rental housing where landlords can raise rents or sell properties, housing co-ops remove housing from the speculative market. Members pay monthly housing charges that cover operating costs and mortgage payments, typically 20-40% below market rent. When members leave, they sell their share back at a controlled price, ensuring ongoing affordability.

This model has successfully housed millions of people across Canada and internationally, particularly in cities with high housing costs. Co-ops often include shared spaces and community programming that foster strong neighborhood bonds.`,
  problemAddressed:
    "Housing costs are rising faster than incomes in most Canadian cities, pushing low and moderate-income families out of their communities. Rental housing is increasingly controlled by corporate landlords focused on profit maximization, leading to renovictions, above-guideline rent increases, and deteriorating conditions.",
  expectedImpact:
    "Creates 20-100 permanently affordable homes. Reduces housing costs by 20-40% compared to market rent. Builds community wealth through collective ownership. Provides stable housing tenure for families. Keeps diverse income levels in urban neighborhoods.",
  startupCostRange: {
    min: 100000,
    max: 500000,
    currency: "CAD",
  },
  timelineMonths: {
    min: 18,
    max: 36,
  },
  requiredExpertise: [
    "Real estate development",
    "Community organizing",
    "Nonprofit governance",
    "Property management",
    "Financial planning",
    "Government relations",
  ],
  successStories: [
    {
      location: "Toronto, ON",
      year: 2020,
      outcomes:
        "50-unit co-op developed on city land, average housing charges 35% below market, 200+ person waitlist",
    },
    {
      location: "Vancouver, BC",
      year: 2019,
      outcomes:
        "Community land trust model, 80 families housed, intergenerational community programming",
    },
    {
      location: "Montreal, QC",
      year: 2021,
      outcomes:
        "Renovated heritage building, 35 units, partnership with local employers for workforce housing",
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
    "cooperative",
    "affordable",
    "community ownership",
    "rental",
    "land trust",
    "tenant",
  ],
}
