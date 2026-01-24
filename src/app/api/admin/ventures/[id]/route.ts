/**
 * Admin Venture Detail API - GET, PATCH, DELETE venture
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

    // Get venture details with launcher
    const { data: venture, error } = await supabase
      .from("ventures")
      .select(`
        *,
        users!ventures_launcher_id_fkey (id, name, email)
      `)
      .eq("id", id)
      .single()

    if (error || !venture) {
      return NextResponse.json({ error: "Venture not found" }, { status: 404 })
    }

    // Get venture steps
    const { data: steps } = await supabase
      .from("venture_steps")
      .select("*")
      .eq("venture_id", id)
      .order("executed_at", { ascending: true })

    // Get contributions
    const { data: contributions } = await supabase
      .from("contributions")
      .select("*")
      .eq("venture_id", id)
      .order("created_at", { ascending: false })

    // Transform response
    const transformedVenture = {
      id: venture.id,
      name: venture.name,
      location: venture.location,
      status: venture.status,
      playbookId: venture.playbook_id,
      currentStep: venture.current_step,
      fundingReceived: venture.funding_received,
      launcher: venture.users ? {
        id: (venture.users as { id: string; name: string; email: string }).id,
        name: (venture.users as { id: string; name: string; email: string }).name,
        email: (venture.users as { id: string; name: string; email: string }).email,
      } : null,
      createdAt: venture.created_at,
      updatedAt: venture.updated_at,
    }

    const transformedSteps = steps?.map((s) => ({
      id: s.id,
      stepId: s.step_id,
      status: s.status,
      artifact: s.artifact,
      executedAt: s.executed_at,
      cost: s.cost,
    })) || []

    const transformedContributions = contributions?.map((c) => ({
      id: c.id,
      contributorName: c.contributor_name,
      contributorEmail: c.contributor_email,
      amount: c.amount,
      currency: c.currency,
      message: c.message,
      createdAt: c.created_at,
    })) || []

    return NextResponse.json({
      venture: transformedVenture,
      steps: transformedSteps,
      contributions: transformedContributions,
    })
  } catch (error) {
    console.error("Error fetching venture:", error)
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
    if (body.status !== undefined) updateData.status = body.status
    if (body.name !== undefined) updateData.name = body.name
    if (body.location !== undefined) updateData.location = body.location

    const { data: venture, error } = await supabase
      .from("ventures")
      .update(updateData)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating venture:", error)
      return NextResponse.json({ error: "Failed to update venture" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      venture: {
        id: venture.id,
        name: venture.name,
        status: venture.status,
      },
    })
  } catch (error) {
    console.error("Error updating venture:", error)
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

    // Delete venture (cascade will handle steps, contributions)
    const { error } = await supabase
      .from("ventures")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Error deleting venture:", error)
      return NextResponse.json({ error: "Failed to delete venture" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting venture:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
