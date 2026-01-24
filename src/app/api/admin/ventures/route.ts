/**
 * Admin Ventures API - List ventures with pagination and filters
 */

import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/client"
import { requireAdmin } from "@/lib/admin/middleware"

export async function GET(request: NextRequest) {
  const { authorized, response } = await requireAdmin()
  if (!authorized) return response!

  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const pageSize = parseInt(searchParams.get("pageSize") || "20")
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || ""

    const offset = (page - 1) * pageSize
    const supabase = createServerClient()

    // Build query
    let query = supabase
      .from("ventures")
      .select(`
        *,
        users!ventures_launcher_id_fkey (id, name, email)
      `, { count: "exact" })

    // Apply search filter
    if (search) {
      query = query.or(`name.ilike.%${search}%,location.ilike.%${search}%`)
    }

    // Apply status filter
    if (status) {
      query = query.eq("status", status)
    }

    // Apply pagination and ordering
    const { data: ventures, count, error } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + pageSize - 1)

    if (error) {
      console.error("Error fetching ventures:", error)
      return NextResponse.json({ error: "Failed to fetch ventures" }, { status: 500 })
    }

    // Get step counts for each venture
    const ventureIds = ventures?.map((v) => v.id) || []
    const { data: stepCounts } = await supabase
      .from("venture_steps")
      .select("venture_id, status")
      .in("venture_id", ventureIds)

    const stepCountMap = stepCounts?.reduce(
      (acc, s) => {
        if (!acc[s.venture_id]) {
          acc[s.venture_id] = { total: 0, completed: 0 }
        }
        acc[s.venture_id].total++
        if (s.status === "completed") {
          acc[s.venture_id].completed++
        }
        return acc
      },
      {} as Record<string, { total: number; completed: number }>
    ) || {}

    // Get contribution totals for each venture
    const { data: contributions } = await supabase
      .from("contributions")
      .select("venture_id, amount")
      .in("venture_id", ventureIds)

    const contributionMap = contributions?.reduce(
      (acc, c) => {
        acc[c.venture_id] = (acc[c.venture_id] || 0) + (c.amount || 0)
        return acc
      },
      {} as Record<string, number>
    ) || {}

    // Transform response
    const transformedVentures = ventures?.map((venture) => ({
      id: venture.id,
      name: venture.name,
      location: venture.location,
      status: venture.status,
      playbookId: venture.playbook_id,
      launcherId: venture.launcher_id,
      launcher: venture.users ? {
        id: (venture.users as { id: string; name: string; email: string }).id,
        name: (venture.users as { id: string; name: string; email: string }).name,
        email: (venture.users as { id: string; name: string; email: string }).email,
      } : null,
      stepsCompleted: stepCountMap[venture.id]?.completed || 0,
      stepsTotal: stepCountMap[venture.id]?.total || 0,
      fundingReceived: contributionMap[venture.id] || 0,
      createdAt: venture.created_at,
      updatedAt: venture.updated_at,
    })) || []

    return NextResponse.json({
      data: transformedVentures,
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
    })
  } catch (error) {
    console.error("Error in admin ventures API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
