import type { VentureStep } from "./step"

export type VentureStatus = "draft" | "active" | "launched" | "paused"

export interface Venture {
  id: string
  playbookId: string
  launcherId: string
  name: string
  location: string
  status: VentureStatus
  currentStep?: string
  completedSteps: VentureStep[]
  fundingReceived: number
  contributors: VentureContributor[]
  createdAt: Date
  updatedAt: Date
}

export interface VentureContributor {
  name: string
  amount: number
  stepFunded?: string
  date: Date
}
