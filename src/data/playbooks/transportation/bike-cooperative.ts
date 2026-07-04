import type { Playbook } from "@/types"

export const bikeCooperative: Playbook = {
  id: "transportation-bike-cooperative",
  name: "Community Bike Cooperative",
  category: "transportation",
  description: `A community-run bike shop that provides affordable bicycles, free repair help, and cycling education to make sustainable transportation accessible to everyone. Members can earn bikes through volunteer hours, learn to fix their own bikes, and access tools and parts at low cost.

For many low-income residents, a reliable bike means the difference between making it to work on time or losing a job, accessing fresh food or being stuck with corner store options, and independence or isolation. Yet new bikes cost hundreds of dollars and repairs can be unaffordable.

Bike co-ops collect donated and abandoned bicycles, refurbish them with volunteer labor, and distribute them to those who need transportation most. The "earn-a-bike" model teaches valuable mechanical skills while building a sense of ownership and accomplishment. Regular open shop hours create community gathering spaces where cyclists of all backgrounds share knowledge.`,
  problemAddressed:
    "Transportation costs are the second-largest household expense after housing. Low-income residents often can't afford cars but live in areas with poor transit. Meanwhile, millions of usable bikes are discarded annually. Those without reliable transportation face barriers to employment, healthcare, and healthy food access.",
  expectedImpact:
    "Distributes 200-500 refurbished bikes annually to community members. Diverts 2-5 tons of bikes and parts from landfills. Provides 1,000+ free repair sessions per year. Teaches mechanical skills to 100+ participants through earn-a-bike programs. Reduces transportation costs by $2,000-4,000 annually for regular cyclists. Creates accessible transportation for job access.",
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
    "Bicycle mechanics and repair",
    "Volunteer coordination",
    "Nonprofit/cooperative management",
    "Youth program development",
    "Donation and inventory management",
  ],
  successStories: [
    {
      location: "Minneapolis, MN",
      year: 2018,
      outcomes:
        "1,000 bikes distributed annually, 40 youth complete earn-a-bike each summer, 5,000 repairs per year",
    },
    {
      location: "Toronto, ON",
      year: 2019,
      outcomes:
        "Partners with refugee resettlement agencies, provides bikes to 300 newcomers annually, multilingual programming",
    },
    {
      location: "Vancouver, BC",
      year: 2020,
      outcomes:
        "Women/trans/femme shop nights increased female participation 300%, now 50% of regular volunteers identify as women",
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
    "bicycles",
    "transportation",
    "repair",
    "sustainability",
    "earn-a-bike",
    "youth programs",
    "mechanical skills",
  ],
}
