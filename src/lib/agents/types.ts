/**
 * Agent Types for AI Venture Studio
 *
 * These types define the interface for all AI agents that execute
 * playbook steps for ventures.
 */

export interface AgentContext {
  // Venture information
  ventureId: string
  ventureName: string
  playbookId: string
  playbookName: string
  playbookDescription: string

  // Location context
  location: string // Format: "City, Province" e.g., "Toronto, ON"
  province: string
  country: "Canada"

  // User context
  userMotivations: string
  userExpertise: string[]
  userLivedExperience: string
  userBudget?: {
    min: number
    max: number
    currency: "CAD"
  }

  // Step context
  stepId: string
  stepName: string
  stepDescription: string

  // Previous step outputs (for context continuity)
  previousArtifacts?: Record<string, string>
}

export interface AgentOutput {
  success: boolean
  artifact: {
    type: "markdown" | "json" | "html"
    title: string
    content: string
    sections?: AgentOutputSection[]
  }
  metadata: {
    tokensUsed: number
    executionTimeMs: number
    model: string
    sources?: string[]
  }
  error?: string
}

export interface AgentOutputSection {
  id: string
  title: string
  content: string
}

export interface AgentConfig {
  id: string
  name: string
  description: string
  stepIds: string[] // Which steps this agent handles
  model: "claude-sonnet-4-20250514" | "claude-opus-4-20250514"
  maxTokens: number
  temperature: number
}

export type AgentExecutor = (context: AgentContext) => Promise<AgentOutput>

// Registry of all available agents
export interface AgentRegistry {
  [agentId: string]: {
    config: AgentConfig
    execute: AgentExecutor
  }
}
