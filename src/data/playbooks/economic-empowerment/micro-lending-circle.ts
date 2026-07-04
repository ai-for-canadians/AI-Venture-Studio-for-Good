import type { Playbook } from "@/types"

export const microLendingCircle: Playbook = {
  id: "economic-micro-lending-circle",
  name: "Micro-Lending Circle",
  category: "economic_empowerment",
  description: `A peer lending group where members pool savings and take turns receiving lump-sum loans, based on the traditional ROSCA (Rotating Savings and Credit Association) model used by immigrant communities worldwide. Members meet regularly, contribute a set amount, and one member receives the full pot each cycle.

This ancient financial technology—known as tandas, susus, chit funds, or hui depending on the culture—provides access to capital without banks, credit checks, or interest charges. For people excluded from traditional banking, these circles offer a path to fund small businesses, education, emergencies, or major purchases.

Modern micro-lending circles add structure, financial literacy training, and sometimes connections to mainstream banking, helping members build credit history while maintaining the trust-based, community-centered approach that has worked for centuries.`,
  problemAddressed:
    "Traditional banks often reject loan applications from immigrants, gig workers, and those with limited credit history. Predatory lenders charge 300-400% APR to fill this gap. Many entrepreneurs have viable business ideas but lack the $2,000-10,000 needed to start, while their communities have collective resources that remain untapped.",
  expectedImpact:
    "Provides $50,000-200,000 in interest-free loans annually across 5-10 circles. Helps 20-40 members start or expand small businesses. 95%+ repayment rate builds trust and sustainability. Connects members to mainstream banking and credit building. Creates peer support network for financial challenges.",
  startupCostRange: {
    min: 2000,
    max: 15000,
    currency: "CAD",
  },
  timelineMonths: {
    min: 2,
    max: 6,
  },
  requiredExpertise: [
    "Financial literacy education",
    "Community organizing",
    "Trust-based relationship building",
    "Small business mentoring",
    "Cultural competency",
  ],
  successStories: [
    {
      location: "Los Angeles, CA",
      year: 2020,
      outcomes:
        "$2M+ loaned since founding, 98% repayment rate, 500+ businesses started, primarily serving Latina entrepreneurs",
    },
    {
      location: "Toronto, ON",
      year: 2021,
      outcomes:
        "Serves newcomer communities from 12 countries, $150K loaned in first year, 30 businesses launched",
    },
    {
      location: "Oakland, CA",
      year: 2019,
      outcomes:
        "Black-led circles, combined with business coaching, average member income increased 40%",
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
    "microfinance",
    "lending circles",
    "financial inclusion",
    "small business",
    "immigrant communities",
    "peer lending",
    "credit building",
  ],
}
