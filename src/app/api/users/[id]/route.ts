/**
 * User API Route - GET and PATCH user profile
 */

import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/client"
import { auth } from "@/lib/auth"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createServerClient()

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single()

    if (error || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Transform snake_case to camelCase for frontend
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
      timeCommitment: user.time_commitment,
      credits: user.credits,
      membershipTier: user.membership_tier,
      onboardingCompleted: user.onboarding_completed,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    }

    return NextResponse.json({ user: transformedUser })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()

    // Verify user is updating their own profile
    if (!session?.user?.id || session.user.id !== id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const supabase = createServerClient()

    // Transform camelCase to snake_case for database
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    }

    if (body.name !== undefined) updateData.name = body.name
    if (body.location !== undefined) updateData.location = body.location
    if (body.motivations !== undefined) updateData.motivations = body.motivations
    if (body.impactInterests !== undefined) updateData.impact_interests = body.impactInterests
    if (body.livedExperience !== undefined) updateData.lived_experience = body.livedExperience
    if (body.expertise !== undefined) updateData.expertise = body.expertise
    if (body.budgetRange !== undefined) updateData.budget_range = body.budgetRange
    if (body.timeCommitment !== undefined) updateData.time_commitment = body.timeCommitment
    if (body.credits !== undefined) updateData.credits = body.credits
    if (body.onboardingCompleted !== undefined) updateData.onboarding_completed = body.onboardingCompleted

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

    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
