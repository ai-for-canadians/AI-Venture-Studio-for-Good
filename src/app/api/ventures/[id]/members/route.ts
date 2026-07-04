/**
 * Venture Members API
 *
 * GET /api/ventures/[id]/members - List all members
 * POST /api/ventures/[id]/members - Invite a new member
 */

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { createServerClient } from "@/lib/supabase/client"
import {
  isMember,
  isAdmin,
  generateInviteToken,
  logActivity,
  INVITATION_EXPIRY_DAYS,
} from "@/lib/cooperative"

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: ventureId } = await params

  // Check if user is a member of this venture
  const memberCheck = await isMember(ventureId, session.user.id)
  if (!memberCheck) {
    return NextResponse.json({ error: "Not a member of this venture" }, { status: 403 })
  }

  const supabase = createServerClient()

  // Get all members with user info
  const { data: members, error } = await supabase
    .from("venture_members")
    .select(`
      *,
      users!venture_members_user_id_fkey (id, name, email, image)
    `)
    .eq("venture_id", ventureId)
    .order("joined_at", { ascending: true })

  if (error) {
    console.error("Error fetching members:", error)
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 })
  }

  // Transform response
  const transformedMembers = members?.map((member) => ({
    id: member.id,
    ventureId: member.venture_id,
    userId: member.user_id,
    role: member.role,
    ownershipPercentage: parseFloat(member.ownership_percentage || "0"),
    status: member.status,
    joinedAt: member.joined_at,
    user: member.users ? {
      id: (member.users as { id: string; name: string; email: string; image?: string }).id,
      name: (member.users as { id: string; name: string; email: string; image?: string }).name,
      email: (member.users as { id: string; name: string; email: string; image?: string }).email,
      image: (member.users as { id: string; name: string; email: string; image?: string }).image,
    } : null,
  })) || []

  return NextResponse.json({ data: transformedMembers })
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: ventureId } = await params

  // Check if user is an admin of this venture
  const adminCheck = await isAdmin(ventureId, session.user.id)
  if (!adminCheck) {
    return NextResponse.json(
      { error: "Only admins can invite new members" },
      { status: 403 }
    )
  }

  const body = await request.json()
  const { email, role = "member", initialOwnership = 0, message } = body

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 })
  }

  if (initialOwnership < 0 || initialOwnership > 100) {
    return NextResponse.json(
      { error: "Initial ownership must be between 0 and 100" },
      { status: 400 }
    )
  }

  const supabase = createServerClient()

  // Check if user with this email already exists and is a member
  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("email", email.toLowerCase())
    .single()

  if (existingUser) {
    const { data: existingMember } = await supabase
      .from("venture_members")
      .select("id, status")
      .eq("venture_id", ventureId)
      .eq("user_id", existingUser.id)
      .single()

    if (existingMember?.status === "active") {
      return NextResponse.json(
        { error: "User is already a member of this venture" },
        { status: 400 }
      )
    }
  }

  // Check for existing pending invitation
  const { data: existingInvite } = await supabase
    .from("member_invitations")
    .select("id")
    .eq("venture_id", ventureId)
    .eq("email", email.toLowerCase())
    .eq("status", "pending")
    .single()

  if (existingInvite) {
    return NextResponse.json(
      { error: "An invitation is already pending for this email" },
      { status: 400 }
    )
  }

  // Create invitation
  const token = generateInviteToken()
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + INVITATION_EXPIRY_DAYS)

  const { data: invitation, error } = await supabase
    .from("member_invitations")
    .insert({
      venture_id: ventureId,
      email: email.toLowerCase(),
      invited_by: session.user.id,
      role,
      initial_ownership: initialOwnership.toFixed(2),
      token,
      message,
      expires_at: expiresAt.toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating invitation:", error)
    return NextResponse.json(
      { error: "Failed to create invitation" },
      { status: 500 }
    )
  }

  // Log activity
  await logActivity({
    ventureId,
    userId: session.user.id,
    activityType: "member_invited",
    title: `Invited ${email} to join`,
    metadata: { email, role, initialOwnership },
  })

  return NextResponse.json({
    data: {
      id: invitation.id,
      email: invitation.email,
      role: invitation.role,
      initialOwnership: parseFloat(invitation.initial_ownership),
      token: invitation.token,
      expiresAt: invitation.expires_at,
      // In production, you'd send this via email
      inviteUrl: `/join/${token}`,
    },
  })
}
