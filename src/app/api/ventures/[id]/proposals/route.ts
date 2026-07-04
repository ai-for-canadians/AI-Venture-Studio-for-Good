/**
 * Venture Proposals API
 *
 * GET /api/ventures/[id]/proposals - List all proposals
 * POST /api/ventures/[id]/proposals - Create a new proposal
 */

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { createServerClient } from "@/lib/supabase/client"
import {
  isMember,
  canVote,
  logActivity,
  VOTING_THRESHOLD_MAJOR,
  VOTING_THRESHOLD_MINOR,
  MIN_OWNERSHIP_TO_VOTE,
} from "@/lib/cooperative"

interface RouteParams {
  params: Promise<{ id: string }>
}

// Default voting period: 7 days
const VOTING_PERIOD_DAYS = 7

export async function GET(request: NextRequest, { params }: RouteParams) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: ventureId } = await params

  const memberCheck = await isMember(ventureId, session.user.id)
  if (!memberCheck) {
    return NextResponse.json(
      { error: "Not a member of this venture" },
      { status: 403 }
    )
  }

  const supabase = createServerClient()
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")

  let query = supabase
    .from("proposals")
    .select(`
      *,
      users!proposals_proposer_id_fkey (id, name, email, image)
    `)
    .eq("venture_id", ventureId)

  if (status) {
    query = query.eq("status", status)
  }

  const { data: proposals, error } = await query.order("created_at", {
    ascending: false,
  })

  if (error) {
    console.error("Error fetching proposals:", error)
    return NextResponse.json(
      { error: "Failed to fetch proposals" },
      { status: 500 }
    )
  }

  // Get user's votes on these proposals
  const proposalIds = proposals?.map((p) => p.id) || []
  const { data: userVotes } = await supabase
    .from("votes")
    .select("proposal_id, vote")
    .eq("voter_id", session.user.id)
    .in("proposal_id", proposalIds)

  const userVoteMap = userVotes?.reduce(
    (acc, v) => {
      acc[v.proposal_id] = v.vote
      return acc
    },
    {} as Record<string, string>
  )

  const transformedProposals = proposals?.map((proposal) => ({
    id: proposal.id,
    ventureId: proposal.venture_id,
    proposalType: proposal.proposal_type,
    category: proposal.category,
    title: proposal.title,
    description: proposal.description,
    metadata: proposal.metadata,
    status: proposal.status,
    votingThreshold: parseFloat(proposal.voting_threshold || "50.01"),
    votesFor: parseFloat(proposal.votes_for || "0"),
    votesAgainst: parseFloat(proposal.votes_against || "0"),
    votesAbstain: parseFloat(proposal.votes_abstain || "0"),
    votingEndsAt: proposal.voting_ends_at,
    resolvedAt: proposal.resolved_at,
    createdAt: proposal.created_at,
    proposer: proposal.users
      ? {
          id: (proposal.users as { id: string; name: string; email: string; image?: string }).id,
          name: (proposal.users as { id: string; name: string; email: string; image?: string }).name,
          image: (proposal.users as { id: string; name: string; email: string; image?: string }).image,
        }
      : null,
    userVote: userVoteMap?.[proposal.id] || null,
  }))

  return NextResponse.json({ data: transformedProposals })
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: ventureId } = await params

  // Check if user can vote (has minimum ownership to create proposals)
  const voteCheck = await canVote(ventureId, session.user.id)
  if (!voteCheck) {
    return NextResponse.json(
      {
        error: `You need at least ${MIN_OWNERSHIP_TO_VOTE}% ownership to create proposals`,
      },
      { status: 403 }
    )
  }

  const body = await request.json()
  const {
    proposalType,
    category,
    title,
    description,
    metadata,
    votingPeriodDays = VOTING_PERIOD_DAYS,
  } = body

  // Validate required fields
  if (!proposalType || !["major", "minor"].includes(proposalType)) {
    return NextResponse.json(
      { error: "Invalid proposal type. Must be 'major' or 'minor'" },
      { status: 400 }
    )
  }

  if (!category) {
    return NextResponse.json(
      { error: "Category is required" },
      { status: 400 }
    )
  }

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 })
  }

  if (!description) {
    return NextResponse.json(
      { error: "Description is required" },
      { status: 400 }
    )
  }

  const supabase = createServerClient()

  // Calculate voting end date
  const votingEndsAt = new Date()
  votingEndsAt.setDate(votingEndsAt.getDate() + votingPeriodDays)

  // Determine threshold based on proposal type
  const votingThreshold =
    proposalType === "major" ? VOTING_THRESHOLD_MAJOR : VOTING_THRESHOLD_MINOR

  const { data: proposal, error } = await supabase
    .from("proposals")
    .insert({
      venture_id: ventureId,
      proposer_id: session.user.id,
      proposal_type: proposalType,
      category,
      title,
      description,
      metadata: metadata || null,
      voting_threshold: votingThreshold.toFixed(2),
      voting_ends_at: votingEndsAt.toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating proposal:", error)
    return NextResponse.json(
      { error: "Failed to create proposal" },
      { status: 500 }
    )
  }

  // Log activity
  await logActivity({
    ventureId,
    userId: session.user.id,
    activityType: "proposal_created",
    title: `New proposal: ${title}`,
    description: `${proposalType === "major" ? "Major" : "Minor"} decision - requires ${votingThreshold}% to pass`,
    metadata: { proposalId: proposal.id, category, proposalType },
  })

  return NextResponse.json({
    data: {
      id: proposal.id,
      title: proposal.title,
      proposalType: proposal.proposal_type,
      category: proposal.category,
      status: proposal.status,
      votingThreshold: parseFloat(proposal.voting_threshold),
      votingEndsAt: proposal.voting_ends_at,
    },
  })
}
