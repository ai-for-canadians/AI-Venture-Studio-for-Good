import type { Playbook } from "@/types"

export const foodRescueNetwork: Playbook = {
  id: "food-rescue-network",
  name: "Food Rescue Network",
  category: "food_access",
  description: `A logistics operation that rescues surplus food from grocery stores, restaurants, farms, and food manufacturers, redistributing it to community organizations serving people facing food insecurity. Volunteers collect food that would otherwise be wasted and deliver it to food banks, shelters, and meal programs.

Food waste is a massive problem: 58% of food produced in Canada is lost or wasted, while 1 in 7 Canadians experiences food insecurity. Food rescue bridges this gap by creating efficient systems to redirect edible surplus food to those who need it, reducing both waste and hunger simultaneously.

Modern food rescue operations use technology to coordinate pickups and deliveries, match supply with demand in real-time, and track impact. Many operate with refrigerated vehicles to safely transport perishable items like produce, dairy, and prepared foods.`,
  problemAddressed:
    "Canada wastes $49 billion worth of food annually while millions face food insecurity. Grocery stores, restaurants, and farms discard edible food due to cosmetic standards, overstocking, and date label confusion. Meanwhile, food banks struggle to provide enough fresh, nutritious food to meet demand.",
  expectedImpact:
    "Rescues 500,000-2,000,000 lbs of food annually. Serves 50-200 community organizations. Provides equivalent of 400,000-1,600,000 meals. Prevents 250-1,000 tonnes of greenhouse gas emissions from landfill. Engages 100-500 volunteers.",
  startupCostRange: {
    min: 30000,
    max: 150000,
    currency: "CAD",
  },
  timelineMonths: {
    min: 3,
    max: 9,
  },
  requiredExpertise: [
    "Logistics coordination",
    "Food safety",
    "Volunteer management",
    "Nonprofit operations",
    "Fleet management",
    "Technology/apps",
  ],
  successStories: [
    {
      location: "Calgary, AB",
      year: 2021,
      outcomes:
        "1.5M lbs rescued, 80 donor partners, 120 recipient agencies, app-based coordination",
    },
    {
      location: "Toronto, ON",
      year: 2020,
      outcomes:
        "Focus on prepared food from events, 500K meals equivalent, real-time matching platform",
    },
    {
      location: "Victoria, BC",
      year: 2022,
      outcomes:
        "Farm gleaning program added, 200 volunteers, partnership with culinary training",
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
    "waste reduction",
    "food security",
    "logistics",
    "volunteers",
    "hunger",
    "sustainability",
  ],
}
