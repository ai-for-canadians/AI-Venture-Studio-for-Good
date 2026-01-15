export type Category =
  | "food_access"
  | "education"
  | "housing"
  | "healthcare"
  | "energy"

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
}

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  food_access: "Community groceries, food co-ops, urban farms, food rescue",
  education: "Tutoring programs, skills training, after-school programs",
  housing: "Affordable housing co-ops, community land trusts, housing repair",
  healthcare: "Community clinics, mental health access, preventive care",
  energy: "Community solar, efficiency programs, renewable co-ops",
}
