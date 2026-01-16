import type { Playbook } from "@/types"

export const communityKitchen: Playbook = {
  id: "food-community-kitchen",
  name: "Community Kitchen Program",
  category: "food_access",
  description: `A program where community members cook together in shared kitchen spaces, preparing nutritious meals to take home while building cooking skills, social connections, and food security. Participants share costs and labor, making healthy eating more affordable and accessible.

Community kitchens address food insecurity differently than food banks: instead of providing charity, they build capacity. Participants learn to cook nutritious meals on a budget, share cultural food traditions, and form supportive relationships. The collective purchasing and cooking model stretches food dollars 2-3x further than individual shopping.

These programs often operate in community centers, churches, or schools, using existing kitchen facilities. They particularly benefit isolated seniors, new immigrants learning local food systems, and families wanting to improve their cooking skills and nutrition.`,
  problemAddressed:
    "Many people lack the cooking skills, time, or equipment to prepare nutritious meals at home. Social isolation compounds food insecurity, particularly for seniors and newcomers. Individual meal preparation is expensive and time-consuming, leading people toward less healthy convenience options.",
  expectedImpact:
    "Serves 50-200 participants monthly. Produces 500-2,000 meals per month. Reduces food costs by 40-60% for participants. Improves nutrition and cooking confidence. Builds social connections and reduces isolation. Shares cultural food knowledge across communities.",
  startupCostRange: {
    min: 5000,
    max: 30000,
    currency: "CAD",
  },
  timelineMonths: {
    min: 2,
    max: 6,
  },
  requiredExpertise: [
    "Culinary skills",
    "Food safety certification",
    "Group facilitation",
    "Nutrition knowledge",
    "Community outreach",
    "Budget management",
  ],
  successStories: [
    {
      location: "Vancouver, BC",
      year: 2022,
      outcomes:
        "15 kitchen groups, 200 participants monthly, newcomer integration focus, multilingual",
    },
    {
      location: "Winnipeg, MB",
      year: 2021,
      outcomes:
        "Indigenous food sovereignty focus, traditional recipes, intergenerational knowledge sharing",
    },
    {
      location: "Montreal, QC",
      year: 2020,
      outcomes:
        "Social enterprise model, catering income, 100 families served, cooking school graduated 50",
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
    "food",
    "cooking",
    "community",
    "nutrition",
    "skills training",
    "social",
    "kitchen",
  ],
}
