import type { Playbook } from "@/types"

export const communityMakerspace: Playbook = {
  id: "arts-community-makerspace",
  name: "Community Makerspace",
  category: "arts_culture",
  description: `A shared workshop space equipped with tools for fabrication, crafts, electronics, and digital creation—from 3D printers and laser cutters to sewing machines and woodworking equipment. Members access expensive tools they couldn't afford individually while learning skills through classes and peer collaboration.

Makerspaces democratize access to manufacturing and creation. A 3D printer costs $300-3,000, a laser cutter $3,000-30,000, and a full woodshop $10,000+. By sharing these resources, makerspaces enable entrepreneurs to prototype products, artists to create works, students to learn STEM skills, and hobbyists to pursue passions otherwise out of reach.

Beyond equipment, makerspaces foster communities of creators who teach each other, collaborate on projects, and turn hobbies into businesses. Many spaces specifically serve populations underrepresented in tech and trades—women, youth of color, immigrants—breaking down barriers to technical careers.`,
  problemAddressed:
    "Access to fabrication tools requires expensive equipment, dedicated space, and specialized knowledge—barriers that exclude most people from making and manufacturing. Vocational education has declined while technical skills remain in demand. Aspiring entrepreneurs can't afford to prototype products. Youth lack hands-on STEM experiences.",
  expectedImpact:
    "Provides tool access to 200-500 members annually. Offers 100+ workshops and classes per year. Supports 20-50 small businesses and entrepreneurs in prototyping. Teaches technical skills to 100+ youth through camps and programs. Launches 5-10 member businesses annually. Creates community hub for 1,000+ maker hours monthly.",
  startupCostRange: {
    min: 30000,
    max: 150000,
    currency: "CAD",
  },
  timelineMonths: {
    min: 6,
    max: 18,
  },
  requiredExpertise: [
    "Fabrication and maker skills",
    "Equipment safety and training",
    "Nonprofit/cooperative management",
    "Workshop and class development",
    "Youth STEM programming",
  ],
  successStories: [
    {
      location: "Detroit, MI",
      year: 2018,
      outcomes:
        "20,000 sq ft facility, 800 members, incubated 100+ businesses, focuses on manufacturing skills for unemployed auto workers",
    },
    {
      location: "Vancouver, BC",
      year: 2019,
      outcomes:
        "Women-led space, 60% female membership (vs 20% industry average), youth camps serve 200 students annually",
    },
    {
      location: "Montreal, QC",
      year: 2020,
      outcomes:
        "Social enterprise model employs 8 staff, revenue from classes covers 70% of operating costs, sliding scale membership",
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
    "makerspace",
    "fabrication",
    "3D printing",
    "STEM education",
    "entrepreneurship",
    "woodworking",
    "community workshop",
  ],
}
