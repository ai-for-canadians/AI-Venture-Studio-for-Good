/**
 * Admin Users API - List users with pagination and search
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
    const tier = searchParams.get("tier") || ""

    const offset = (page - 1) * pageSize
    const supabase = createServerClient()

    // Build query
    let query = supabase
      .from("users")
      .select("*", { count: "exact" })

    // Apply search filter
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`)
    }

    // Apply tier filter
    if (tier) {
      query = query.eq("membership_tier", tier)
    }

    // Apply pagination and ordering
    const { data: users, count, error } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + pageSize - 1)

    if (error) {
      console.error("Error fetching users:", error)
      return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
    }

    // Get venture counts for each user
    const userIds = users?.map((u) => u.id) || []
    const { data: ventureCounts } = await supabase
      .from("ventures")
      .select("launcher_id")
      .in("launcher_id", userIds)

    const ventureCountMap = ventureCounts?.reduce(
      (acc, v) => {
        acc[v.launcher_id] = (acc[v.launcher_id] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    ) || {}

    // Transform response
    const transformedUsers = users?.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      location: user.location,
      credits: user.credits,
      membershipTier: user.membership_tier,
      onboardingCompleted: user.onboarding_completed,
      ventureCount: ventureCountMap[user.id] || 0,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    })) || []

    return NextResponse.json({
      data: transformedUsers,
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
    })
  } catch (error) {
    console.error("Error in admin users API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
