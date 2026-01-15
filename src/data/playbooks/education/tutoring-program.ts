import type { Playbook } from "@/types"

export const tutoringProgram: Playbook = {
  id: "education-tutoring-program",
  name: "Community Tutoring Program",
  category: "education",
  description: `A structured after-school and weekend tutoring program that connects volunteer tutors with students who need academic support. The program focuses on core subjects like math, reading, and science while also building study skills and confidence.

This model leverages community volunteers—including retired teachers, university students, and professionals—to provide free or low-cost tutoring to students from low-income families. Programs typically operate from community centers, libraries, or schools, making them accessible to families who couldn't otherwise afford private tutoring.

Beyond academics, these programs often serve as mentorship opportunities, with tutors becoming role models who inspire students to pursue higher education and career goals.`,
  problemAddressed:
    "Educational inequality means students from low-income families often lack access to the supplementary academic support that their wealthier peers receive. Private tutoring costs $40-100/hour, putting it out of reach for many families. This contributes to achievement gaps that persist through high school and limit future opportunities.",
  expectedImpact:
    "Improves student grades by an average of one letter grade. Increases homework completion rates by 40%. Boosts student confidence and engagement in school. Provides 200+ hours of free tutoring per year to 50+ students. Creates pathways to higher education for underserved youth.",
  startupCostRange: {
    min: 5000,
    max: 25000,
    currency: "CAD",
  },
  timelineMonths: {
    min: 2,
    max: 6,
  },
  requiredExpertise: [
    "Education/teaching experience",
    "Volunteer management",
    "Youth program coordination",
    "Basic nonprofit operations",
  ],
  successStories: [
    {
      location: "Scarborough, Toronto, ON",
      year: 2022,
      outcomes:
        "85% of students improved math scores, 60 volunteer tutors engaged, 120 students served",
    },
    {
      location: "Surrey, BC",
      year: 2021,
      outcomes:
        "Partnership with 5 schools, 90% parent satisfaction rate, waiting list of 40 students",
    },
    {
      location: "Winnipeg, MB",
      year: 2020,
      outcomes:
        "Indigenous youth focus, 95% student retention, expanded to 3 community centers",
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
    "tutoring",
    "youth",
    "volunteers",
    "after-school",
    "mentorship",
    "academic support",
  ],
}
