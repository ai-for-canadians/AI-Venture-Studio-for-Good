import type { Playbook } from "@/types"

export const reentrySupportProgram: Playbook = {
  id: "social-reentry-support",
  name: "Reentry Support Program",
  category: "social_services",
  description: `A comprehensive support program that helps formerly incarcerated individuals successfully reintegrate into their communities through employment assistance, housing navigation, mentorship, and wraparound services. The program addresses the interconnected barriers that lead to recidivism.

Each year, 600,000+ people are released from prisons and millions more from jails, often with $50 and a bus ticket. They face housing discrimination, employment barriers (80% of employers conduct background checks), suspended driver's licenses, and severed family ties. Without support, 44% are rearrested within their first year.

Effective reentry programs recognize that stable housing, employment, and community connection are interdependent—you can't keep a job without housing, can't pay rent without a job, and need support to navigate both. Peer mentors who've successfully reentered provide crucial guidance and hope.`,
  problemAddressed:
    "Formerly incarcerated individuals face systemic barriers: 75% of employers won't hire them, most landlords reject their applications, professional licenses are often denied, and family relationships have been damaged. Without intervention, two-thirds are rearrested within 3 years. This revolving door costs society $80,000 per incarceration while devastating families and communities.",
  expectedImpact:
    "Serves 100-200 returning citizens annually with comprehensive support. Achieves 70%+ employment rate within 6 months (vs 40% without support). Reduces recidivism to 15-20% (vs 44% baseline). Provides stable housing connections for 80% of participants. Reunifies families and restores community ties. Saves $60,000+ per person kept out of prison.",
  startupCostRange: {
    min: 25000,
    max: 100000,
    currency: "CAD",
  },
  timelineMonths: {
    min: 6,
    max: 15,
  },
  requiredExpertise: [
    "Reentry services and criminal justice",
    "Employment readiness and job development",
    "Housing navigation and landlord relations",
    "Trauma-informed care",
    "Peer mentor program development",
  ],
  successStories: [
    {
      location: "San Francisco, CA",
      year: 2019,
      outcomes:
        "80% employment rate, 85% housing stability, 12% recidivism rate, $1.2M saved in incarceration costs annually",
    },
    {
      location: "Toronto, ON",
      year: 2020,
      outcomes:
        "Indigenous-led program, 150 participants, cultural reconnection component, 75% maintain employment at 1 year",
    },
    {
      location: "Chicago, IL",
      year: 2018,
      outcomes:
        "Peer mentor model, 90% of mentors are program graduates, serves 400 annually, expanded to 3 neighborhoods",
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
    "reentry",
    "criminal justice",
    "employment",
    "housing",
    "peer mentors",
    "recidivism reduction",
    "second chances",
  ],
}
