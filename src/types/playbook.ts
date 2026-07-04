export type Category =
  | "food_access"
  | "education"
  | "housing"
  | "healthcare"
  | "energy"
  | "environment"
  | "economic_empowerment"
  | "childcare_family"
  | "seniors"
  | "transportation"
  | "digital_inclusion"
  | "arts_culture"
  | "social_services"

export interface CostRange {
  min: number
  max: number
  currency: "CAD" | "USD"
}

export interface TimelineRange {
  min: number
  max: number
}

export interface SuccessStory {
  location: string
  year: number
  outcomes: string
  link?: string
}

export interface Playbook {
  id: string
  name: string
  category: Category
  description: string
  problemAddressed: string
  expectedImpact: string
  startupCostRange: CostRange
  timelineMonths: TimelineRange
  requiredExpertise: string[]
  successStories: SuccessStory[]
  stepSequence: string[]
  tags: string[]
}

export const CATEGORY_LABELS: Record<Category, string> = {
  food_access: "Food Access",
  education: "Education",
  housing: "Housing",
  healthcare: "Healthcare",
  energy: "Energy",
  environment: "Environment",
  economic_empowerment: "Economic Empowerment",
  childcare_family: "Childcare & Family",
  seniors: "Seniors & Aging",
  transportation: "Transportation",
  digital_inclusion: "Digital Inclusion",
  arts_culture: "Arts & Culture",
  social_services: "Social Services",
}

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  food_access: "Community groceries, food co-ops, urban farms, food rescue",
  education: "Tutoring programs, skills training, after-school programs",
  housing: "Affordable housing co-ops, community land trusts, housing repair",
  healthcare: "Community clinics, mental health access, preventive care",
  energy: "Community solar, efficiency programs, renewable co-ops",
  environment: "Composting, tool libraries, e-waste recycling, urban farms",
  economic_empowerment: "Micro-lending, worker co-ops, credit unions, job training",
  childcare_family: "Childcare co-ops, family resource centers, after-school care",
  seniors: "Companion programs, meals delivery, aging-in-place support",
  transportation: "Bike co-ops, volunteer drivers, car sharing, accessible transit",
  digital_inclusion: "Digital literacy, device lending, community internet",
  arts_culture: "Makerspaces, youth arts, community media, creative spaces",
  social_services: "Reentry support, refugee services, harm reduction, crisis support",
}
