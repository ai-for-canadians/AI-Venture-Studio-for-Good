/**
 * Cooperative Ownership Module
 *
 * Business logic for the cooperative ownership model:
 * - Member management
 * - Ownership tracking (financial + sweat equity)
 * - Governance (proposals & voting)
 */

import { createServerClient } from "@/lib/supabase/client"
import crypto from "crypto"

// Constants
export const VOTING_THRESHOLD_MAJOR = 66.67 // Supermajority for major decisions
export const VOTING_THRESHOLD_MINOR = 50.01 // Simple majority for minor decisions
export const MIN_OWNERSHIP_TO_VOTE = 5.0 // Minimum 5% ownership to vote
export const INVITATION_EXPIRY_DAYS = 7

// Types
export type MemberRole = "founder" | "admin" | "member"
export type MemberStatus = "pending" | "active" | "left" | "removed"
export type ProposalType = "major" | "minor"
export type ProposalCategory =
  | "member_invite"
  | "member_remove"
  | "ownership_adjustment"
  | "budget"
  | "strategy"
  | "transfer_approval"
export type OwnershipChangeType =
  | "task_completion"
  | "financial_contribution"
  | "adjustment"
  | "forfeit"
  | "transfer_in"
  | "transfer_out"
  | "initial"

/**
 * Generate a secure invitation token
 */
export function generateInviteToken(): string {
  return crypto.randomBytes(32).toString("hex")
}

/**
 * Check if a user is a member of a venture
 */
export async function isMember(
  ventureId: string,
  userId: string
): Promise<boolean> {
  const supabase = createServerClient()
  const { data } = await supabase
    .from("venture_members")
    .select("id")
    .eq("venture_id", ventureId)
    .eq("user_id", userId)
    .eq("status", "active")
    .single()

  return !!data
}

/**
 * Get a member's role and ownership
 */
export async function getMemberInfo(ventureId: string, userId: string) {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from("venture_members")
    .select("*")
    .eq("venture_id", ventureId)
    .eq("user_id", userId)
    .eq("status", "active")
    .single()

  if (error || !data) return null
  return data
}

/**
 * Check if user has admin rights (founder or admin role)
 */
export async function isAdmin(
  ventureId: string,
  userId: string
): Promise<boolean> {
  const member = await getMemberInfo(ventureId, userId)
  return member?.role === "founder" || member?.role === "admin"
}

/**
 * Check if user can vote (has minimum ownership)
 */
export async function canVote(
  ventureId: string,
  userId: string
): Promise<boolean> {
  const member = await getMemberInfo(ventureId, userId)
  if (!member) return false
  return parseFloat(member.ownership_percentage) >= MIN_OWNERSHIP_TO_VOTE
}

/**
 * Get total ownership percentage allocated in a venture
 */
export async function getTotalOwnership(ventureId: string): Promise<number> {
  const supabase = createServerClient()
  const { data } = await supabase
    .from("venture_members")
    .select("ownership_percentage")
    .eq("venture_id", ventureId)
    .eq("status", "active")

  if (!data) return 0
  return data.reduce(
    (sum, m) => sum + parseFloat(m.ownership_percentage || "0"),
    0
  )
}

/**
 * Record an ownership change in the ledger
 */
export async function recordOwnershipChange(params: {
  ventureId: string
  userId: string
  changeAmount: number
  changeType: OwnershipChangeType
  referenceType?: string
  referenceId?: string
  notes?: string
  createdBy?: string
}): Promise<void> {
  const supabase = createServerClient()

  // Get current ownership
  const member = await getMemberInfo(params.ventureId, params.userId)
  const currentOwnership = member
    ? parseFloat(member.ownership_percentage || "0")
    : 0
  const newBalance = currentOwnership + params.changeAmount

  // Update member's ownership
  if (member) {
    await supabase
      .from("venture_members")
      .update({ ownership_percentage: newBalance.toFixed(2) })
      .eq("id", member.id)
  }

  // Record in ledger
  await supabase.from("ownership_ledger").insert({
    venture_id: params.ventureId,
    user_id: params.userId,
    change_amount: params.changeAmount.toFixed(2),
    new_balance: newBalance.toFixed(2),
    change_type: params.changeType,
    reference_type: params.referenceType,
    reference_id: params.referenceId,
    notes: params.notes,
    created_by: params.createdBy,
  })
}

/**
 * Log activity for a venture
 */
export async function logActivity(params: {
  ventureId: string
  userId?: string
  activityType: string
  title: string
  description?: string
  metadata?: Record<string, unknown>
}): Promise<void> {
  const supabase = createServerClient()
  await supabase.from("venture_activity").insert({
    venture_id: params.ventureId,
    user_id: params.userId,
    activity_type: params.activityType,
    title: params.title,
    description: params.description,
    metadata: params.metadata,
  })
}

/**
 * Add the venture launcher as the founding member
 */
export async function initializeFounder(
  ventureId: string,
  founderId: string,
  initialOwnership: number = 100
): Promise<void> {
  const supabase = createServerClient()

  // Create founder member record
  await supabase.from("venture_members").insert({
    venture_id: ventureId,
    user_id: founderId,
    role: "founder",
    ownership_percentage: initialOwnership.toFixed(2),
    status: "active",
    joined_at: new Date().toISOString(),
  })

  // Record in ownership ledger
  await recordOwnershipChange({
    ventureId,
    userId: founderId,
    changeAmount: initialOwnership,
    changeType: "initial",
    notes: "Founder initial ownership",
  })

  // Log activity
  await logActivity({
    ventureId,
    userId: founderId,
    activityType: "venture_created",
    title: "Venture created",
    description: "The cooperative was founded",
  })
}

/**
 * Calculate voting weight from ownership
 * In hybrid model: all qualifying members vote, weighted by ownership
 */
export function calculateVotingWeight(ownershipPercentage: number): number {
  if (ownershipPercentage < MIN_OWNERSHIP_TO_VOTE) return 0
  return ownershipPercentage
}

/**
 * Determine if a proposal has passed
 */
export async function checkProposalResult(proposalId: string): Promise<{
  passed: boolean
  votesFor: number
  votesAgainst: number
  votesAbstain: number
  totalVotes: number
  threshold: number
}> {
  const supabase = createServerClient()

  const { data: proposal } = await supabase
    .from("proposals")
    .select("*")
    .eq("id", proposalId)
    .single()

  if (!proposal) {
    throw new Error("Proposal not found")
  }

  const votesFor = parseFloat(proposal.votes_for || "0")
  const votesAgainst = parseFloat(proposal.votes_against || "0")
  const votesAbstain = parseFloat(proposal.votes_abstain || "0")
  const totalVotes = votesFor + votesAgainst
  const threshold = parseFloat(proposal.voting_threshold || "50.01")

  // Calculate percentage of yes votes (excluding abstentions)
  const percentageFor = totalVotes > 0 ? (votesFor / totalVotes) * 100 : 0
  const passed = percentageFor >= threshold

  return {
    passed,
    votesFor,
    votesAgainst,
    votesAbstain,
    totalVotes,
    threshold,
  }
}

/**
 * Handle member leaving - forfeit ownership back to pool
 */
export async function handleMemberExit(
  ventureId: string,
  userId: string,
  removedBy?: string
): Promise<void> {
  const supabase = createServerClient()
  const member = await getMemberInfo(ventureId, userId)

  if (!member) return

  const ownership = parseFloat(member.ownership_percentage || "0")

  // Update member status
  await supabase
    .from("venture_members")
    .update({
      status: removedBy ? "removed" : "left",
      left_at: new Date().toISOString(),
      ownership_percentage: "0.00",
    })
    .eq("id", member.id)

  // Record forfeiture in ledger
  await recordOwnershipChange({
    ventureId,
    userId,
    changeAmount: -ownership,
    changeType: "forfeit",
    notes: removedBy ? "Member removed by vote" : "Member left voluntarily",
    createdBy: removedBy,
  })

  // Log activity
  await logActivity({
    ventureId,
    userId,
    activityType: removedBy ? "member_removed" : "member_left",
    title: removedBy ? "Member removed" : "Member left the cooperative",
    metadata: { forfeited_ownership: ownership },
  })
}
