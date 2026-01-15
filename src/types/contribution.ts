export interface Contribution {
  id: string
  ventureId: string
  stepId?: string
  contributorName: string
  contributorEmail?: string
  amount: number
  stripePaymentId?: string
  createdAt: Date
}

export interface ContributionWithDetails extends Contribution {
  ventureName: string
  stepName?: string
}
