/**
 * Admin User Detail API - GET, PATCH, DELETE user
 */

import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/client"
import { requireAdmin } from "@/lib/admin/middleware"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { authorized, response } = await requireAdmin()
  if (!authorized) return response!

  try {
    const { id } = await params
    const supabase = createServerClient()

    // Get user details
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single()

    if (error || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get user's ventures
    const { data: ventures } = await supabase
      .from("ventures")
      .select("id, name, location, status, playbook_id, created_at")
      .eq("launcher_id", id)
      .order("created_at", { ascending: false })

    // Transform response
    const transformedUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      location: user.location,
      motivations: user.motivations,
      impactInterests: user.impact_interests,
      livedExperience: user.lived_experience,
      expertise: user.expertise,
      budgetRange: user.budget_range,
      credits: user.credits,
      membershipTier: user.membership_tier,
      onboardingCompleted: user.onboarding_completed,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    }

    const transformedVentures = ventures?.map((v) => ({
      id: v.id,
      name: v.name,
      location: v.location,
      status: v.status,
      playbookId: v.playbook_id,
      createdAt: v.created_at,
    })) || []

    return NextResponse.json({
      user: transformedUser,
      ventures: transformedVentures,
    })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { authorized, response } = await requireAdmin()
  if (!authorized) return response!

  try {
    const { id } = await params
    const body = await request.json()
    const supabase = createServerClient()

    // Build update data
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    }

    // Only allow specific fields to be updated by admin
    if (body.credits !== undefined) updateData.credits = body.credits
    if (body.membershipTier !== undefined) updateData.membership_tier = body.membershipTier
    if (body.name !== undefined) updateData.name = body.name
    if (body.location !== undefined) updateData.location = body.location

    const { data: user, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating user:", error)
      return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        credits: user.credits,
        membershipTier: user.membership_tier,
      },
    })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { authorized, response } = await requireAdmin()
  if (!authorized) return response!

  try {
    const { id } = await params
    const supabase = createServerClient()

    // Delete user (cascade will handle ventures, contributions, etc.)
    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Error deleting user:", error)
      return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
