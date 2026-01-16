/**
 * Agent Registry and Orchestration
 *
 * Central hub for registering, configuring, and executing AI agents
 * for venture step execution.
 */

import type { AgentContext, AgentOutput, AgentConfig, AgentRegistry } from "./types"

// Import all agents
import * as marketResearchAgent from "./market-research-agent"
import * as competitorMapperAgent from "./competitor-mapper-agent"
import * as contactFinderAgent from "./contact-finder-agent"
import * as businessPlanAgent from "./business-plan-agent"
import * as copywriterAgent from "./copywriter-agent"

// Agent registry - maps step IDs to their handlers
const agentRegistry: AgentRegistry = {
  "market-research": {
    config: marketResearchAgent.config,
    execute: marketResearchAgent.execute,
  },
  "competitor-mapper": {
    config: competitorMapperAgent.config,
    execute: competitorMapperAgent.execute,
  },
  "contact-finder": {
    config: contactFinderAgent.config,
    execute: contactFinderAgent.execute,
  },
  "business-plan": {
    config: businessPlanAgent.config,
    execute: businessPlanAgent.execute,
  },
  copywriter: {
    config: copywriterAgent.config,
    execute: copywriterAgent.execute,
  },
}

// Map step IDs to agent IDs
const stepToAgentMap: Record<string, string> = {
  "market-assessment": "market-research",
  "competitive-analysis": "competitor-mapper",
  "local-contacts": "contact-finder",
  "business-plan": "business-plan",
  "landing-page": "copywriter",
  outreach: "copywriter",
  "volunteer-recruitment": "copywriter",
  advertising: "copywriter",
}

/**
 * Get the agent configuration for a given step
 */
export function getAgentForStep(stepId: string): AgentConfig | null {
  const agentId = stepToAgentMap[stepId]
  if (!agentId) return null
  return agentRegistry[agentId]?.config || null
}

/**
 * Execute a step using the appropriate agent
 */
export async function executeStep(context: AgentContext): Promise<AgentOutput> {
  const agentId = stepToAgentMap[context.stepId]

  if (!agentId) {
    return {
      success: false,
      artifact: {
        type: "markdown",
        title: "Step Execution Failed",
        content: "",
      },
      metadata: {
        tokensUsed: 0,
        executionTimeMs: 0,
        model: "unknown",
      },
      error: `No agent configured for step: ${context.stepId}`,
    }
  }

  const agent = agentRegistry[agentId]
  if (!agent) {
    return {
      success: false,
      artifact: {
        type: "markdown",
        title: "Step Execution Failed",
        content: "",
      },
      metadata: {
        tokensUsed: 0,
        executionTimeMs: 0,
        model: "unknown",
      },
      error: `Agent not found: ${agentId}`,
    }
  }

  try {
    return await agent.execute(context)
  } catch (error) {
    return {
      success: false,
      artifact: {
        type: "markdown",
        title: "Step Execution Failed",
        content: "",
      },
      metadata: {
        tokensUsed: 0,
        executionTimeMs: 0,
        model: agent.config.model,
      },
      error: error instanceof Error ? error.message : "Unknown error during execution",
    }
  }
}

/**
 * Get all available agents with their configurations
 */
export function getAllAgents(): AgentConfig[] {
  return Object.values(agentRegistry).map((agent) => agent.config)
}

/**
 * Get agent by ID
 */
export function getAgent(agentId: string): AgentConfig | null {
  return agentRegistry[agentId]?.config || null
}

/**
 * Calculate estimated cost for a step execution
 * Returns cost in credits
 */
export function estimateStepCost(stepId: string): number {
  const costMap: Record<string, number> = {
    "market-assessment": 25,
    "competitive-analysis": 25,
    "local-contacts": 25,
    "business-plan": 50, // More complex, higher cost
    "landing-page": 25,
    outreach: 25,
    "volunteer-recruitment": 25,
    advertising: 25,
  }

  return costMap[stepId] || 25
}

/**
 * Validate that all required context is present for step execution
 */
export function validateContext(context: Partial<AgentContext>): string[] {
  const errors: string[] = []

  if (!context.ventureId) errors.push("Missing ventureId")
  if (!context.ventureName) errors.push("Missing ventureName")
  if (!context.playbookId) errors.push("Missing playbookId")
  if (!context.location) errors.push("Missing location")
  if (!context.stepId) errors.push("Missing stepId")

  return errors
}

// Export types for external use
export type { AgentContext, AgentOutput, AgentConfig } from "./types"

// Export individual agents for direct access if needed
export {
  marketResearchAgent,
  competitorMapperAgent,
  contactFinderAgent,
  businessPlanAgent,
  copywriterAgent,
}
