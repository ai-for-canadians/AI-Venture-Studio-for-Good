import type { Playbook } from "@/types"

export const mobileHealthClinic: Playbook = {
  id: "healthcare-mobile-health-clinic",
  name: "Mobile Health Clinic",
  category: "healthcare",
  description: `A healthcare service delivered via a specially equipped vehicle that brings primary care, preventive services, and health education directly to underserved communities. Mobile clinics visit neighborhoods, workplaces, shelters, and community events, removing transportation and accessibility barriers to care.

Mobile health clinics reach people where traditional healthcare can't: rural communities without nearby clinics, homeless populations, migrant workers, and urban neighborhoods with provider shortages. They provide services ranging from basic check-ups and vaccinations to chronic disease management, dental care, and mental health screening.

These clinics often serve as a bridge to the broader healthcare system, helping unattached patients find family doctors, connecting people to specialists, and providing health system navigation support. They're particularly effective at building trust with populations who've had negative healthcare experiences.`,
  problemAddressed:
    "Millions of Canadians lack access to primary care due to geography, mobility limitations, homelessness, work schedules, or distrust of healthcare institutions. Rural and remote communities face severe provider shortages. Vulnerable populations—homeless, undocumented, or marginalized people—often avoid healthcare until emergencies.",
  expectedImpact:
    "Provides 3,000-10,000 patient visits annually. Serves 5-15 different locations weekly. Connects 30-50% of patients to ongoing primary care. Delivers 1,000+ vaccinations per year. Identifies and manages chronic conditions before they require hospitalization.",
  startupCostRange: {
    min: 150000,
    max: 500000,
    currency: "CAD",
  },
  timelineMonths: {
    min: 8,
    max: 18,
  },
  requiredExpertise: [
    "Healthcare administration",
    "Clinical operations",
    "Fleet/vehicle management",
    "Community health outreach",
    "Medical licensing compliance",
    "Fundraising/grants",
  ],
  successStories: [
    {
      location: "Ottawa, ON",
      year: 2022,
      outcomes:
        "Serves homeless population, 5,000 visits annually, harm reduction integration, housing support linkages",
    },
    {
      location: "Northern BC",
      year: 2021,
      outcomes:
        "Rural circuit serving 12 communities, Indigenous health focus, 3,500 patient encounters",
    },
    {
      location: "Calgary, AB",
      year: 2020,
      outcomes:
        "Workplace health focus, 8,000 visits, employer partnerships, preventive screening emphasis",
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
    "healthcare",
    "mobile clinic",
    "primary care",
    "rural health",
    "preventive",
    "outreach",
    "accessibility",
  ],
}
