import type { Playbook } from "@/types"

export const communityGroceryCoop: Playbook = {
  id: "food-community-grocery-coop",
  name: "Community Grocery Co-op",
  category: "food_access",
  description: `A member-owned grocery store that provides affordable, fresh food to underserved communities while building local economic power. Members invest a small amount to join and receive voting rights on store decisions, creating a democratic model of food access.

Unlike traditional grocery stores driven by profit, co-ops prioritize community needs, often stocking culturally relevant foods, partnering with local farmers, and reinvesting profits back into the community. They serve as gathering places that strengthen neighborhood bonds while addressing food insecurity.

This model has proven successful across North America, from urban neighborhoods to rural communities, adapting to local needs while maintaining the core cooperative principles of member ownership and democratic control.`,
  problemAddressed:
    "Food deserts and underserved communities lack access to affordable, fresh, and healthy food options. Traditional grocery chains often bypass low-income neighborhoods due to perceived lower profit margins, leaving residents dependent on convenience stores with limited healthy options and higher prices.",
  expectedImpact:
    "Reduces grocery costs by 15-25% for members. Increases fresh food access within 1km radius. Creates 5-15 local jobs. Keeps food dollars circulating in the local economy. Improves community health outcomes through better nutrition access.",
  startupCostRange: {
    min: 50000,
    max: 250000,
    currency: "CAD",
  },
  timelineMonths: {
    min: 6,
    max: 18,
  },
  requiredExpertise: [
    "Community organizing",
    "Retail operations",
    "Financial management",
    "Food safety",
    "Volunteer coordination",
  ],
  successStories: [
    {
      location: "Parkdale, Toronto, ON",
      year: 2021,
      outcomes:
        "400+ member-owners, 12 local jobs created, 30% of products from local suppliers",
      link: "https://example.com/parkdale-coop",
    },
    {
      location: "East Vancouver, BC",
      year: 2019,
      outcomes:
        "Serves 1,500 households, saved members estimated $200/year on groceries",
    },
    {
      location: "Halifax, NS",
      year: 2020,
      outcomes:
        "First co-op grocery in the neighborhood in 20 years, 250 founding members",
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
    "cooperative",
    "retail",
    "food security",
    "member-owned",
    "local economy",
    "fresh food",
    "grocery",
  ],
}
