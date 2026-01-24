/**
 * Admin Contributions API - List contributions with pagination and filters
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
    const ventureId = searchParams.get("ventureId") || ""
    const startDate = searchParams.get("startDate") || ""
    const endDate = searchParams.get("endDate") || ""

    const offset = (page - 1) * pageSize
    const supabase = createServerClient()

    // Build query
    let query = supabase
      .from("contributions")
      .select(`
        *,
        ventures (id, name)
      `, { count: "exact" })

    // Apply venture filter
    if (ventureId) {
      query = query.eq("venture_id", ventureId)
    }

    // Apply date filters
    if (startDate) {
      query = query.gte("created_at", startDate)
    }
    if (endDate) {
      query = query.lte("created_at", endDate)
    }

    // Apply pagination and ordering
    const { data: contributions, count, error } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + pageSize - 1)

    if (error) {
      console.error("Error fetching contributions:", error)
      return NextResponse.json({ error: "Failed to fetch contributions" }, { status: 500 })
    }

    // Calculate totals
    const { data: allContributions } = await supabase
      .from("contributions")
      .select("amount")

    const totalRevenue = allContributions?.reduce((sum, c) => sum + (c.amount || 0), 0) || 0

    // Transform response
    const transformedContributions = contributions?.map((c) => ({
      id: c.id,
      ventureId: c.venture_id,
      ventureName: (c.ventures as { id: string; name: string } | null)?.name || "Unknown",
      stepId: c.step_id,
      contributorName: c.contributor_name,
      contributorEmail: c.contributor_email,
      amount: c.amount,
      currency: c.currency,
      message: c.message,
      stripePaymentId: c.stripe_payment_id,
      createdAt: c.created_at,
    })) || []

    return NextResponse.json({
      data: transformedContributions,
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
      totalRevenue,
    })
  } catch (error) {
    console.error("Error in admin contributions API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
