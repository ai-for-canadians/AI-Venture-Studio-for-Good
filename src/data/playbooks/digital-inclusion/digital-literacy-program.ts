import type { Playbook } from "@/types"

export const digitalLiteracyProgram: Playbook = {
  id: "digital-literacy-program",
  name: "Digital Literacy Program",
  category: "digital_inclusion",
  description: `A community-based training program that teaches essential computer and internet skills to seniors, immigrants, and others left behind by the digital divide. Courses cover basics like email and video calling to advanced skills like online banking, job searching, and avoiding scams.

As services move online—banking, government benefits, healthcare portals, job applications—those without digital skills face growing exclusion. Many seniors never learned to use computers at work. Newcomers may have smartphone experience but struggle with English-language software. Low-income residents may lack both devices and the confidence to learn.

Effective digital literacy programs meet learners where they are, offering patient one-on-one support, multilingual instruction, and curriculum that addresses real needs like connecting with grandchildren, accessing telehealth, or navigating immigration portals. Graduates often become peer teachers themselves, multiplying impact.`,
  problemAddressed:
    "22% of adults lack basic digital skills needed for everyday tasks. Seniors, immigrants, and low-income residents are disproportionately affected. Without digital literacy, people can't apply for jobs (90% of applications are online), access telehealth, file taxes, or connect with distant family. This digital divide deepens other inequities.",
  expectedImpact:
    "Trains 200-500 participants annually in essential digital skills. 85% of graduates report increased confidence using technology. Enables 50+ seniors to video chat with family for first time. Helps 100+ job seekers apply online and create digital resumes. Reduces social isolation through online connection. Creates 10-20 peer digital mentors from graduate pool.",
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
    "Adult education and training",
    "Technology instruction",
    "Curriculum development",
    "Multilingual program delivery",
    "Volunteer tutor management",
  ],
  successStories: [
    {
      location: "Brooklyn, NY",
      year: 2020,
      outcomes:
        "1,200 seniors trained, 90% now use video calling weekly, expanded to smartphone repair workshops",
    },
    {
      location: "Calgary, AB",
      year: 2021,
      outcomes:
        "Newcomer focus with instruction in 6 languages, 400 graduates, 75% found employment within 6 months",
    },
    {
      location: "Rural Nova Scotia",
      year: 2022,
      outcomes:
        "Mobile training van serves 12 communities, 300 seniors trained, 80% now access telehealth independently",
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
    "digital literacy",
    "computer skills",
    "seniors",
    "immigrants",
    "digital divide",
    "technology training",
    "adult education",
  ],
}
