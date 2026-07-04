/**
 * Individual Proposal API
 *
 * GET /api/ventures/[id]/proposals/[proposalId] - Get proposal with votes
 * POST /api/ventures/[id]/proposals/[proposalId] - Cast vote on proposal
 */

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { createServerClient } from "@/lib/supabase/client"
import {
  isMember,
  getMemberInfo,
  canVote,
  checkProposalResult,
  logActivity,
  MIN_OWNERSHIP_TO_VOTE,
} from "@/lib/cooperative"

interface RouteParams {
  params: Promise<{ id: string; proposalId: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: ventureId, proposalId } = await params

  const memberCheck = await isMember(ventureId, session.user.id)
  if (!memberCheck) {
    return NextResponse.json(
      { error: "Not a member of this venture" },
      { status: 403 }
    )
  }

  const supabase = createServerClient()

  // Get proposal with proposer info
  const { data: proposal, error } = await supabase
    .from("proposals")
    .select(`
      *,
      users!proposals_proposer_id_fkey (id, name, email, image)
    `)
    .eq("id", proposalId)
    .eq("venture_id", ventureId)
    .single()

  if (error || !proposal) {
    return NextResponse.json({ error: "Proposal not found" }, { status: 404 })
  }

  // Get all votes on this proposal
  const { data: votes } = await supabase
    .from("votes")
    .select(`
      *,
      users!votes_voter_id_fkey (id, name, image)
    `)
    .eq("proposal_id", proposalId)
    .order("created_at", { ascending: false })

  // Get user's current vote if any
  const userVote = votes?.find((v) => v.voter_id === session.user.id)

  // Get comments on this proposal
  const { data: comments } = await supabase
    .from("comments")
    .select(`
      *,
      users!comments_user_id_fkey (id, name, image)
    `)
    .eq("parent_type", "proposal")
    .eq("parent_id", proposalId)
    .order("created_at", { ascending: true })

  // Check if voting is still open
  const isVotingOpen =
    proposal.status === "open" && new Date(proposal.voting_ends_at) > new Date()

  return NextResponse.json({
    data: {
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
      isVotingOpen,
      proposer: proposal.users
        ? {
            id: (proposal.users as { id: string; name: string; email: string; image?: string }).id,
            name: (proposal.users as { id: string; name: string; email: string; image?: string }).name,
            image: (proposal.users as { id: string; name: string; email: string; image?: string }).image,
          }
        : null,
      userVote: userVote
        ? {
            vote: userVote.vote,
            weight: parseFloat(userVote.weight),
            comment: userVote.comment,
            createdAt: userVote.created_at,
          }
        : null,
      votes:
        votes?.map((v) => ({
          id: v.id,
          vote: v.vote,
          weight: parseFloat(v.weight),
          comment: v.comment,
          createdAt: v.created_at,
          voter: v.users
            ? {
                id: (v.users as { id: string; name: string; image?: string }).id,
                name: (v.users as { id: string; name: string; image?: string }).name,
                image: (v.users as { id: string; name: string; image?: string }).image,
              }
            : null,
        })) || [],
      comments:
        comments?.map((c) => ({
          id: c.id,
          content: c.content,
          createdAt: c.created_at,
          user: c.users
            ? {
                id: (c.users as { id: string; name: string; image?: string }).id,
                name: (c.users as { id: string; name: string; image?: string }).name,
                image: (c.users as { id: string; name: string; image?: string }).image,
              }
            : null,
        })) || [],
    },
  })
}

// Cast or update vote
export async function POST(request: NextRequest, { params }: RouteParams) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: ventureId, proposalId } = await params

  // Check if user can vote
  const voteCheck = await canVote(ventureId, session.user.id)
  if (!voteCheck) {
    return NextResponse.json(
      {
        error: `You need at least ${MIN_OWNERSHIP_TO_VOTE}% ownership to vote`,
      },
      { status: 403 }
    )
  }

  const supabase = createServerClient()

  // Get the proposal
  const { data: proposal, error: fetchError } = await supabase
    .from("proposals")
    .select("*")
    .eq("id", proposalId)
    .eq("venture_id", ventureId)
    .single()

  if (fetchError || !proposal) {
    return NextResponse.json({ error: "Proposal not found" }, { status: 404 })
  }

  // Check if voting is still open
  if (proposal.status !== "open") {
    return NextResponse.json(
      { error: "Voting on this proposal has closed" },
      { status: 400 }
    )
  }

  if (new Date(proposal.voting_ends_at) < new Date()) {
    return NextResponse.json(
      { error: "Voting period has ended" },
      { status: 400 }
    )
  }

  const body = await request.json()
  const { vote, comment } = body

  if (!vote || !["yes", "no", "abstain"].includes(vote)) {
    return NextResponse.json(
      { error: "Vote must be 'yes', 'no', or 'abstain'" },
      { status: 400 }
    )
  }

  // Get member's current ownership for vote weight
  const member = await getMemberInfo(ventureId, session.user.id)
  if (!member) {
    return NextResponse.json({ error: "Member not found" }, { status: 400 })
  }

  const weight = parseFloat(member.ownership_percentage || "0")

  // Check for existing vote
  const { data: existingVote } = await supabase
    .from("votes")
    .select("*")
    .eq("proposal_id", proposalId)
    .eq("voter_id", session.user.id)
    .single()

  let oldVote: string | null = null
  let oldWeight = 0

  if (existingVote) {
    oldVote = existingVote.vote
    oldWeight = parseFloat(existingVote.weight)

    // Update existing vote
    await supabase
      .from("votes")
      .update({
        vote,
        weight: weight.toFixed(2),
        comment: comment || null,
      })
      .eq("id", existingVote.id)
  } else {
    // Create new vote
    await supabase.from("votes").insert({
      proposal_id: proposalId,
      voter_id: session.user.id,
      vote,
      weight: weight.toFixed(2),
      comment: comment || null,
    })
  }

  // Update proposal vote totals
  let votesFor = parseFloat(proposal.votes_for || "0")
  let votesAgainst = parseFloat(proposal.votes_against || "0")
  let votesAbstain = parseFloat(proposal.votes_abstain || "0")

  // Remove old vote weight
  if (oldVote) {
    if (oldVote === "yes") votesFor -= oldWeight
    else if (oldVote === "no") votesAgainst -= oldWeight
    else if (oldVote === "abstain") votesAbstain -= oldWeight
  }

  // Add new vote weight
  if (vote === "yes") votesFor += weight
  else if (vote === "no") votesAgainst += weight
  else if (vote === "abstain") votesAbstain += weight

  await supabase
    .from("proposals")
    .update({
      votes_for: votesFor.toFixed(2),
      votes_against: votesAgainst.toFixed(2),
      votes_abstain: votesAbstain.toFixed(2),
    })
    .eq("id", proposalId)

  // Log activity
  await logActivity({
    ventureId,
    userId: session.user.id,
    activityType: "vote_cast",
    title: existingVote
      ? `Changed vote on: ${proposal.title}`
      : `Voted on: ${proposal.title}`,
    metadata: {
      proposalId,
      vote,
      weight,
      previousVote: oldVote,
    },
  })

  // Check if proposal has enough votes to auto-resolve
  const result = await checkProposalResult(proposalId)

  return NextResponse.json({
    data: {
      vote,
      weight,
      proposalResult: {
        votesFor: result.votesFor,
        votesAgainst: result.votesAgainst,
        votesAbstain: result.votesAbstain,
        threshold: result.threshold,
        currentlyPassing: result.passed,
      },
    },
  })
}
