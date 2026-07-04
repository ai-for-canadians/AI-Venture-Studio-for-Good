/**
 * Ventures API
 *
 * GET /api/ventures - List user's ventures (as member)
 * POST /api/ventures - Create a new venture
 */

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { createServerClient } from "@/lib/supabase/client"
import { initializeFounder, logActivity } from "@/lib/cooperative"

export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = createServerClient()

  // Get all ventures where user is a member
  const { data: memberships, error: memberError } = await supabase
    .from("venture_members")
    .select(`
      role,
      ownership_percentage,
      joined_at,
      ventures (
        id,
        playbook_id,
        name,
        location,
        status,
        current_step,
        funding_received,
        created_at,
        updated_at
      )
    `)
    .eq("user_id", session.user.id)
    .eq("status", "active")

  if (memberError) {
    console.error("Error fetching ventures:", memberError)
    return NextResponse.json(
      { error: "Failed to fetch ventures" },
      { status: 500 }
    )
  }

  // Also get ventures where user is the launcher (for backwards compatibility)
  const { data: launchedVentures } = await supabase
    .from("ventures")
    .select("*")
    .eq("launcher_id", session.user.id)

  // Merge and dedupe
  const ventureMap = new Map()

  // Add ventures from memberships
  memberships?.forEach((m) => {
    const venture = m.ventures as {
      id: string
      playbook_id: string
      name: string
      location: string
      status: string
      current_step: string
      funding_received: number
      created_at: string
      updated_at: string
    }
    if (venture) {
      ventureMap.set(venture.id, {
        id: venture.id,
        playbookId: venture.playbook_id,
        name: venture.name,
        location: venture.location,
        status: venture.status,
        currentStep: venture.current_step,
        fundingReceived: venture.funding_received,
        createdAt: venture.created_at,
        updatedAt: venture.updated_at,
        userRole: m.role,
        userOwnership: parseFloat(m.ownership_percentage || "0"),
      })
    }
  })

  // Add launched ventures that might not have membership records yet
  launchedVentures?.forEach((v) => {
    if (!ventureMap.has(v.id)) {
      ventureMap.set(v.id, {
        id: v.id,
        playbookId: v.playbook_id,
        name: v.name,
        location: v.location,
        status: v.status,
        currentStep: v.current_step,
        fundingReceived: v.funding_received,
        createdAt: v.created_at,
        updatedAt: v.updated_at,
        userRole: "founder",
        userOwnership: 100, // Default for old ventures without membership
      })
    }
  })

  return NextResponse.json({
    data: Array.from(ventureMap.values()),
  })
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { playbookId, name, location } = body

  if (!playbookId) {
    return NextResponse.json(
      { error: "Playbook ID is required" },
      { status: 400 }
    )
  }

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 })
  }

  if (!location) {
    return NextResponse.json({ error: "Location is required" }, { status: 400 })
  }

  const supabase = createServerClient()

  // Create the venture
  const { data: venture, error: ventureError } = await supabase
    .from("ventures")
    .insert({
      playbook_id: playbookId,
      launcher_id: session.user.id,
      name,
      location,
      status: "draft",
    })
    .select()
    .single()

  if (ventureError) {
    console.error("Error creating venture:", ventureError)
    return NextResponse.json(
      { error: "Failed to create venture" },
      { status: 500 }
    )
  }

  // Initialize the founder as 100% owner
  try {
    await initializeFounder(venture.id, session.user.id, 100)
  } catch (error) {
    console.error("Error initializing founder:", error)
    // Don't fail the request - venture is created, just log the error
  }

  return NextResponse.json({
    data: {
      id: venture.id,
      playbookId: venture.playbook_id,
      name: venture.name,
      location: venture.location,
      status: venture.status,
      createdAt: venture.created_at,
    },
  })
}
