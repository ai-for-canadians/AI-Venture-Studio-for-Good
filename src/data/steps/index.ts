import { marketAssessmentStep } from "./market-assessment"
import { competitiveAnalysisStep } from "./competitive-analysis"
import { localContactsStep } from "./local-contacts"
import { businessPlanStep } from "./business-plan"
import { landingPageStep } from "./landing-page"
import { outreachStep } from "./outreach"
import { volunteerRecruitmentStep } from "./volunteer-recruitment"
import { advertisingStep } from "./advertising"
import type { StepDefinition } from "@/types"

export const steps: StepDefinition[] = [
  marketAssessmentStep,
  competitiveAnalysisStep,
  localContactsStep,
  businessPlanStep,
  landingPageStep,
  outreachStep,
  volunteerRecruitmentStep,
  advertisingStep,
]

export const stepsById: Record<string, StepDefinition> = {
  "market-assessment": marketAssessmentStep,
  "competitive-analysis": competitiveAnalysisStep,
  "local-contacts": localContactsStep,
  "business-plan": businessPlanStep,
  "landing-page": landingPageStep,
  outreach: outreachStep,
  "volunteer-recruitment": volunteerRecruitmentStep,
  advertising: advertisingStep,
}

export function getStepById(id: string): StepDefinition | undefined {
  return stepsById[id]
}

export function getStepsForPlaybook(stepIds: string[]): StepDefinition[] {
  return stepIds
    .map((id) => stepsById[id])
    .filter((step): step is StepDefinition => step !== undefined)
}

export {
  marketAssessmentStep,
  competitiveAnalysisStep,
  localContactsStep,
  businessPlanStep,
  landingPageStep,
  outreachStep,
  volunteerRecruitmentStep,
  advertisingStep,
}
