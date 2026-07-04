import type { Playbook } from "@/types"

export const deviceLendingLibrary: Playbook = {
  id: "digital-device-lending",
  name: "Device Lending Library",
  category: "digital_inclusion",
  description: `A lending program that provides laptops, tablets, and internet hotspots to students, job seekers, and others who need temporary access to technology. Devices are loaned for days to months, bridging the gap for those who can't afford to purchase equipment.

The "homework gap" affects millions of students without home internet or computers, forcing them to sit in fast food parking lots to access WiFi or fall behind peers. Job seekers can't apply for positions or attend video interviews. Seniors can't access telehealth. The digital divide is really a device divide.

Device lending libraries collect donated equipment, refurbish it, and circulate it like books. Hotspot lending provides internet access for homes without broadband. Many programs partner with schools to identify students in need, with libraries to leverage existing lending infrastructure, and with employers to provide job-readiness equipment.`,
  problemAddressed:
    "15-20% of households lack adequate devices for work and school. During the pandemic, this created crisis as education and employment moved online. A laptop costs $400-1000, putting it out of reach for families in financial crisis. Even families with devices often lack internet ($60-100/month). Children without home access fall 6 months behind academically.",
  expectedImpact:
    "Circulates 200-500 devices to community members annually. Provides internet access via 50-100 mobile hotspots. Enables 200+ students to complete homework at home. Supports 100+ job seekers with application and interview technology. Bridges gaps during financial emergencies, housing transitions, and device repairs. Diverts 1-2 tons of e-waste through refurbishment.",
  startupCostRange: {
    min: 15000,
    max: 60000,
    currency: "CAD",
  },
  timelineMonths: {
    min: 3,
    max: 9,
  },
  requiredExpertise: [
    "IT and device refurbishment",
    "Library/lending operations",
    "School and social service partnerships",
    "Inventory and tracking systems",
    "Data security and device wiping",
  ],
  successStories: [
    {
      location: "Philadelphia, PA",
      year: 2020,
      outcomes:
        "20,000 Chromebooks distributed during pandemic, partnership with school district, 100% of students gained home access",
    },
    {
      location: "Toronto, ON",
      year: 2021,
      outcomes:
        "Hotspot lending program serves 500 households monthly, 30-day loans, waitlist of 200 families",
    },
    {
      location: "Edmonton, AB",
      year: 2022,
      outcomes:
        "Job seeker focus, 3-month laptop loans, 65% of borrowers found employment during loan period",
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
    "device lending",
    "laptops",
    "hotspots",
    "homework gap",
    "digital divide",
    "technology access",
    "refurbishment",
  ],
}
