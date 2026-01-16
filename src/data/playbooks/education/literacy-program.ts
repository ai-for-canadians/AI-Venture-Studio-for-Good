import type { Playbook } from "@/types"

export const literacyProgram: Playbook = {
  id: "education-literacy-program",
  name: "Adult Literacy & Numeracy Program",
  category: "education",
  description: `A community-based program that helps adults improve foundational reading, writing, and math skills needed for employment, daily life, and further education. Trained tutors work one-on-one or in small groups, meeting learners where they are and progressing at their pace.

Low literacy affects 48% of Canadian adults to some degree, limiting employment options, health outcomes, and civic participation. Yet many adults are embarrassed to seek help or don't know where to turn. Community-based programs create welcoming, non-judgmental environments where adults can build skills confidentially.

These programs often integrate literacy with practical life skills: reading prescriptions and health information, understanding financial documents, helping children with homework, or preparing for citizenship tests. This contextualized approach keeps learners motivated and delivers immediate benefits.`,
  problemAddressed:
    "Nearly half of Canadian adults have literacy skills below the level needed to function fully in modern society. Low literacy correlates with unemployment, poverty, poor health, and social isolation. Many adults fell through cracks in the education system due to learning disabilities, family disruption, or systemic barriers.",
  expectedImpact:
    "Serves 100-300 adult learners annually. Achieves average 2 grade-level improvement per year. Helps 40-60% of learners achieve employment or education goals. Trains and engages 50-100 volunteer tutors. Improves learners' confidence and life skills beyond academics.",
  startupCostRange: {
    min: 20000,
    max: 80000,
    currency: "CAD",
  },
  timelineMonths: {
    min: 4,
    max: 10,
  },
  requiredExpertise: [
    "Adult education",
    "Literacy assessment",
    "Volunteer training",
    "Learning disabilities awareness",
    "Program coordination",
    "Community outreach",
  ],
  successStories: [
    {
      location: "Saint John, NB",
      year: 2022,
      outcomes:
        "200 learners served, workplace literacy partnerships, family literacy stream, 70% goal achievement",
    },
    {
      location: "Thunder Bay, ON",
      year: 2021,
      outcomes:
        "Indigenous-led program, culturally relevant materials, 150 learners, community healing approach",
    },
    {
      location: "Surrey, BC",
      year: 2020,
      outcomes:
        "Multilingual intake, 15 languages served, pathway to English classes, 180 adults annually",
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
    "literacy",
    "adult learning",
    "tutoring",
    "numeracy",
    "skills",
    "ESL",
  ],
}
