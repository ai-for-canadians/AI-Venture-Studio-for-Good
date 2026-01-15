import type { Playbook } from "@/types"

export const communityClinic: Playbook = {
  id: "healthcare-community-clinic",
  name: "Community Health Clinic",
  category: "healthcare",
  description: `A community-based health clinic that provides accessible primary care, preventive services, and health education to underserved populations. These clinics often operate on a sliding-scale fee model, ensuring no one is turned away due to inability to pay.

Community health clinics fill critical gaps in healthcare access, particularly in neighborhoods where residents face barriers like lack of insurance, transportation challenges, or cultural/language barriers. They typically offer services including general check-ups, vaccinations, chronic disease management, mental health screening, and referrals to specialists.

Many successful community clinics are staffed by a combination of paid healthcare professionals and volunteer medical personnel, including retired doctors, nurses, and medical students completing community service requirements.`,
  problemAddressed:
    "Many communities lack adequate access to primary healthcare. Long wait times, high costs, lack of insurance, and geographic barriers prevent residents from receiving preventive care and early treatment. This leads to worse health outcomes, higher emergency room usage, and preventable hospitalizations.",
  expectedImpact:
    "Provides primary care access to 500+ patients annually. Reduces emergency room visits for non-emergencies by 30%. Improves management of chronic conditions like diabetes and hypertension. Increases vaccination rates in the community. Saves the healthcare system an estimated $200,000+ annually through preventive care.",
  startupCostRange: {
    min: 75000,
    max: 300000,
    currency: "CAD",
  },
  timelineMonths: {
    min: 8,
    max: 24,
  },
  requiredExpertise: [
    "Healthcare administration",
    "Medical licensing and compliance",
    "Nonprofit management",
    "Community health outreach",
    "Grant writing",
    "Volunteer medical professional coordination",
  ],
  successStories: [
    {
      location: "North End, Hamilton, ON",
      year: 2021,
      outcomes:
        "1,200 patients served in first year, 15 volunteer healthcare providers, 40% reduction in ER visits",
    },
    {
      location: "East Hastings, Vancouver, BC",
      year: 2019,
      outcomes:
        "Integrated mental health services, serves 800+ marginalized residents, peer support model",
    },
    {
      location: "Saint-Michel, Montreal, QC",
      year: 2020,
      outcomes:
        "Multilingual services in 6 languages, 95% patient satisfaction, expanded to dental services",
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
    "clinic",
    "primary care",
    "preventive health",
    "sliding scale",
    "community health",
    "accessible care",
  ],
}
