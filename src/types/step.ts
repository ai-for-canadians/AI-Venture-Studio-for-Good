export type StepStatus = "locked" | "available" | "in_progress" | "completed"

export interface StepInput {
  name: string
  description: string
  required: boolean
}

export interface StepOutput {
  name: string
  description: string
  format: "markdown" | "html" | "json" | "pdf"
}

export interface StepDefinition {
  id: string
  name: string
  description: string
  estimatedCost: number
  estimatedDuration: string
  inputsRequired: StepInput[]
  outputsProduced: StepOutput[]
  agentInstructions: string
}

export interface VentureStep {
  id: string
  ventureId: string
  stepId: string
  status: StepStatus
  artifact?: StepArtifact
  executedAt?: Date
  cost?: number
}

export interface StepArtifact {
  type: "markdown" | "html" | "json"
  content: string
  title: string
  generatedAt: Date
}

export const CORE_STEPS = [
  "market-assessment",
  "competitive-analysis",
  "local-contacts",
  "business-plan",
  "landing-page",
  "outreach",
  "volunteer-recruitment",
  "advertising",
] as const

export type CoreStepId = (typeof CORE_STEPS)[number]
