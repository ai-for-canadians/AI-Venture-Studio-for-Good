import type { Playbook } from "@/types"

export const childcareCooperative: Playbook = {
  id: "childcare-cooperative",
  name: "Childcare Cooperative",
  category: "childcare_family",
  description: `A parent-run childcare program where families share the responsibilities and costs of quality early childhood care. Parents contribute time (typically 2-4 hours weekly) alongside professional caregivers, dramatically reducing costs while building community among families.

Childcare costs have risen to consume 30-50% of income for many families, forcing difficult choices about careers, additional children, and financial security. Cooperatives cut these costs by 40-60% while often providing higher quality care through better ratios and parent involvement.

Beyond affordability, co-op childcare creates deep bonds between families who see each other regularly, share parenting challenges, and raise children together. Children benefit from consistent relationships with multiple caring adults, and parents gain skills and confidence through hands-on involvement in early childhood education.`,
  problemAddressed:
    "Quality childcare costs $15,000-25,000 per child annually, pricing out working families and forcing parents (usually mothers) out of the workforce. Waitlists stretch 1-2 years. Meanwhile, childcare workers earn poverty wages ($13-17/hour) with high turnover, affecting care quality. The system fails families, workers, and children simultaneously.",
  expectedImpact:
    "Reduces childcare costs by 40-60% for member families. Provides care for 15-30 children with excellent ratios (1:4 or better). Creates 3-6 living-wage jobs for professional caregivers. Builds lasting community bonds among 20-40 families. Develops parenting skills through cooperative involvement. 95%+ parent satisfaction rates.",
  startupCostRange: {
    min: 15000,
    max: 75000,
    currency: "CAD",
  },
  timelineMonths: {
    min: 6,
    max: 18,
  },
  requiredExpertise: [
    "Early childhood education",
    "Childcare licensing and regulations",
    "Cooperative governance",
    "Parent engagement and scheduling",
    "Facility management",
  ],
  successStories: [
    {
      location: "Berkeley, CA",
      year: 2019,
      outcomes:
        "50+ year history, serves 30 families, costs 50% below market rate, 3-generation alumni community",
    },
    {
      location: "Toronto, ON",
      year: 2020,
      outcomes:
        "Sliding scale fees serve mixed-income families, 25 children enrolled, licensed for infants through preschool",
    },
    {
      location: "Vancouver, BC",
      year: 2021,
      outcomes:
        "Workplace partnership model, employer contributes space, parents provide 3 hours weekly, costs $800/month vs $1,800 market rate",
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
    "childcare",
    "cooperative",
    "early childhood",
    "parent involvement",
    "affordable care",
    "working families",
    "community building",
  ],
}
