import type { Playbook } from "@/types"

export const seniorCompanionProgram: Playbook = {
  id: "seniors-companion-program",
  name: "Senior Companion Program",
  category: "seniors",
  description: `A volunteer visiting program that matches trained companions with isolated seniors for regular social visits, reducing loneliness while helping older adults age safely in their homes. Companions provide friendship, light assistance, and connection to community resources.

Social isolation is as dangerous to health as smoking 15 cigarettes daily, yet millions of seniors go weeks without meaningful human contact. Many have outlived spouses and friends, have family far away, or face mobility challenges that keep them homebound. Loneliness accelerates cognitive decline, depression, and physical health deterioration.

Companion programs provide the regular human connection that keeps seniors engaged with life. Visits might include conversation over tea, help with technology to video-call grandchildren, accompaniment to appointments, or simply sitting together watching a favorite show. The relationships often become deeply meaningful for both seniors and volunteers.`,
  problemAddressed:
    "One-third of adults over 65 live alone, and half report feeling lonely regularly. Isolated seniors are 50% more likely to develop dementia, 29% more likely to have heart disease, and 26% more likely to die prematurely. Most want to age at home but lack the social support that makes this safe and fulfilling. Adult children often live far away and can't provide regular check-ins.",
  expectedImpact:
    "Provides weekly visits to 50-100 isolated seniors. Reduces reported loneliness by 60% among participants. Enables safer aging-in-place through regular wellness checks. Connects seniors to additional services (meals, transportation, health resources). Engages 30-60 trained volunteer companions. Improves mental health outcomes and reduces depression symptoms.",
  startupCostRange: {
    min: 8000,
    max: 35000,
    currency: "CAD",
  },
  timelineMonths: {
    min: 3,
    max: 9,
  },
  requiredExpertise: [
    "Volunteer recruitment and management",
    "Senior services and gerontology",
    "Safeguarding and boundaries training",
    "Community outreach to seniors",
    "Partnership with health and social services",
  ],
  successStories: [
    {
      location: "Calgary, AB",
      year: 2020,
      outcomes:
        "120 seniors served, 80 active volunteers, 40% of seniors report companion as 'closest friend', reduced ER visits for falls",
    },
    {
      location: "Ottawa, ON",
      year: 2019,
      outcomes:
        "Multilingual program serves newcomer seniors in 8 languages, 95% would recommend to other isolated seniors",
    },
    {
      location: "Victoria, BC",
      year: 2021,
      outcomes:
        "Intergenerational model pairs university students with seniors, 85% of seniors learned new technology skills",
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
    "seniors",
    "loneliness",
    "aging in place",
    "volunteers",
    "companionship",
    "social isolation",
    "elder care",
  ],
}
