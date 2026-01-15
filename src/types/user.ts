import type { Category } from "./playbook"

export type MembershipTier = "free" | "starter" | "pro"

export interface BudgetRange {
  min: number
  max: number
  currency: "CAD" | "USD"
}

export interface LauncherProfile {
  id: string
  name: string
  email: string
  location: string
  motivations: string
  impactInterests: Category[]
  livedExperience: string
  expertise: string[]
  budgetRange?: BudgetRange
  timeCommitment?: string
  ventureIds: string[]
  credits: number
  membershipTier: MembershipTier
  createdAt: Date
}

export interface ContributorProfile {
  id: string
  name: string
  email: string
  contributions: ContributorContribution[]
}

export interface ContributorContribution {
  ventureId: string
  stepId?: string
  amount: number
  date: Date
}
