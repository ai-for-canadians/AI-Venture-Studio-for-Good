/**
 * Invitation Acceptance API
 *
 * GET /api/invitations/[token] - Get invitation details
 * POST /api/invitations/[token] - Accept invitation
 */

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { createServerClient } from "@/lib/supabase/client"
import { recordOwnershipChange, logActivity } from "@/lib/cooperative"

interface RouteParams {
  params: Promise<{ token: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { token } = await params
  const supabase = createServerClient()

  // Get invitation with venture details
  const { data: invitation, error } = await supabase
    .from("member_invitations")
    .select(`
      *,
      ventures (id, name, playbook_id, location),
      users!member_invitations_invited_by_fkey (id, name, email)
    `)
    .eq("token", token)
    .single()

  if (error || !invitation) {
    return NextResponse.json({ error: "Invitation not found" }, { status: 404 })
  }

  // Check if expired
  if (new Date(invitation.expires_at) < new Date()) {
    return NextResponse.json({ error: "Invitation has expired" }, { status: 410 })
  }

  // Check if already used
  if (invitation.status !== "pending") {
    return NextResponse.json(
      { error: `Invitation has already been ${invitation.status}` },
      { status: 410 }
    )
  }

  return NextResponse.json({
    data: {
      id: invitation.id,
      email: invitation.email,
      role: invitation.role,
      initialOwnership: parseFloat(invitation.initial_ownership || "0"),
      message: invitation.message,
      expiresAt: invitation.expires_at,
      venture: invitation.ventures ? {
        id: (invitation.ventures as { id: string; name: string; playbook_id: string; location: string }).id,
        name: (invitation.ventures as { id: string; name: string; playbook_id: string; location: string }).name,
        playbookId: (invitation.ventures as { id: string; name: string; playbook_id: string; location: string }).playbook_id,
        location: (invitation.ventures as { id: string; name: string; playbook_id: string; location: string }).location,
      } : null,
      invitedBy: invitation.users ? {
        id: (invitation.users as { id: string; name: string; email: string }).id,
        name: (invitation.users as { id: string; name: string; email: string }).name,
      } : null,
    },
  })
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { token } = await params
  const supabase = createServerClient()

  // Get invitation
  const { data: invitation, error } = await supabase
    .from("member_invitations")
    .select("*")
    .eq("token", token)
    .single()

  if (error || !invitation) {
    return NextResponse.json({ error: "Invitation not found" }, { status: 404 })
  }

  // Validate invitation
  if (new Date(invitation.expires_at) < new Date()) {
    return NextResponse.json({ error: "Invitation has expired" }, { status: 410 })
  }

  if (invitation.status !== "pending") {
    return NextResponse.json(
      { error: `Invitation has already been ${invitation.status}` },
      { status: 410 }
    )
  }

  // Get user's email to verify it matches
  const { data: user } = await supabase
    .from("users")
    .select("email")
    .eq("id", session.user.id)
    .single()

  if (user?.email?.toLowerCase() !== invitation.email.toLowerCase()) {
    return NextResponse.json(
      { error: "This invitation was sent to a different email address" },
      { status: 403 }
    )
  }

  // Check if user is already a member
  const { data: existingMember } = await supabase
    .from("venture_members")
    .select("id, status")
    .eq("venture_id", invitation.venture_id)
    .eq("user_id", session.user.id)
    .single()

  if (existingMember?.status === "active") {
    return NextResponse.json(
      { error: "You are already a member of this venture" },
      { status: 400 }
    )
  }

  const initialOwnership = parseFloat(invitation.initial_ownership || "0")

  // Create or reactivate member record
  if (existingMember) {
    // Reactivate existing member
    await supabase
      .from("venture_members")
      .update({
        status: "active",
        role: invitation.role,
        ownership_percentage: initialOwnership.toFixed(2),
        joined_at: new Date().toISOString(),
        left_at: null,
      })
      .eq("id", existingMember.id)
  } else {
    // Create new member
    await supabase.from("venture_members").insert({
      venture_id: invitation.venture_id,
      user_id: session.user.id,
      role: invitation.role,
      ownership_percentage: initialOwnership.toFixed(2),
      status: "active",
      invited_by: invitation.invited_by,
      joined_at: new Date().toISOString(),
    })
  }

  // Record initial ownership in ledger if > 0
  if (initialOwnership > 0) {
    await recordOwnershipChange({
      ventureId: invitation.venture_id,
      userId: session.user.id,
      changeAmount: initialOwnership,
      changeType: "initial",
      referenceType: "invitation",
      referenceId: invitation.id,
      notes: `Joined via invitation with ${initialOwnership}% initial ownership`,
      createdBy: invitation.invited_by,
    })
  }

  // Update invitation status
  await supabase
    .from("member_invitations")
    .update({
      status: "accepted",
      accepted_at: new Date().toISOString(),
    })
    .eq("id", invitation.id)

  // Log activity
  await logActivity({
    ventureId: invitation.venture_id,
    userId: session.user.id,
    activityType: "member_joined",
    title: "New member joined",
    description: `Joined the cooperative as ${invitation.role}`,
    metadata: { initialOwnership, role: invitation.role },
  })

  return NextResponse.json({
    data: {
      ventureId: invitation.venture_id,
      role: invitation.role,
      initialOwnership,
      message: "Successfully joined the venture",
    },
  })
}
