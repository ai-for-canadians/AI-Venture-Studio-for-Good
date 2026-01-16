import type { Playbook } from "@/types"

export const skillsBootcamp: Playbook = {
  id: "education-skills-bootcamp",
  name: "Community Skills Bootcamp",
  category: "education",
  description: `An intensive, short-term training program that equips unemployed and underemployed community members with in-demand job skills. Bootcamps typically run 8-16 weeks and focus on practical, employer-valued skills in fields like technology, trades, healthcare support, or business administration.

Unlike traditional education that takes years and costs thousands, skills bootcamps provide rapid pathways to employment. They combine classroom instruction with hands-on projects, often partnering with local employers who help design curriculum and commit to interviewing graduates.

Community-based bootcamps prioritize accessibility: offering free or low-cost tuition, flexible schedules for working adults, childcare support, and wraparound services like job coaching and interview preparation. Many focus on populations facing employment barriers, including newcomers, youth aging out of care, and those with justice system involvement.`,
  problemAddressed:
    "Traditional education is too slow and expensive for many job seekers. Community members face barriers to employment due to lack of credentials, outdated skills, or discrimination. Meanwhile, employers struggle to fill positions requiring specific technical or professional skills.",
  expectedImpact:
    "Graduates 30-100 participants annually. Achieves 70-85% job placement rate within 6 months. Increases graduate earnings by 30-50%. Partners with 10-20 local employers. Provides career advancement pathways for underemployed workers.",
  startupCostRange: {
    min: 40000,
    max: 150000,
    currency: "CAD",
  },
  timelineMonths: {
    min: 4,
    max: 10,
  },
  requiredExpertise: [
    "Curriculum development",
    "Industry knowledge",
    "Adult education",
    "Employer relations",
    "Career coaching",
    "Program evaluation",
  ],
  successStories: [
    {
      location: "Toronto, ON",
      year: 2022,
      outcomes:
        "Tech bootcamp for newcomers, 80% placement rate, average salary $55K, employer consortium model",
    },
    {
      location: "Edmonton, AB",
      year: 2021,
      outcomes:
        "Trades prep for Indigenous youth, 45 graduates, apprenticeship pipeline, cultural supports",
    },
    {
      location: "Halifax, NS",
      year: 2020,
      outcomes:
        "Healthcare support worker training, partnership with hospitals, 90% employment rate",
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
    "education",
    "employment",
    "skills training",
    "bootcamp",
    "career",
    "workforce",
    "job placement",
  ],
}
