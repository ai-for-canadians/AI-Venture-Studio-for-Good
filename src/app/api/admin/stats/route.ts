/**
 * Admin Stats API - Dashboard statistics
 */

import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/client"
import { requireAdmin } from "@/lib/admin/middleware"

export async function GET() {
  const { authorized, response } = await requireAdmin()
  if (!authorized) return response!

  try {
    const supabase = createServerClient()

    // Get total users
    const { count: totalUsers } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })

    // Get total ventures
    const { count: totalVentures } = await supabase
      .from("ventures")
      .select("*", { count: "exact", head: true })

    // Get total contributions and revenue
    const { data: contributionData } = await supabase
      .from("contributions")
      .select("amount")

    const totalContributions = contributionData?.length || 0
    const totalRevenue = contributionData?.reduce((sum, c) => sum + (c.amount || 0), 0) || 0

    // Get recent signups (last 10)
    const { data: recentSignups } = await supabase
      .from("users")
      .select("id, name, email, created_at")
      .order("created_at", { ascending: false })
      .limit(10)

    // Get recent ventures (last 10)
    const { data: recentVentures } = await supabase
      .from("ventures")
      .select(`
        id,
        name,
        location,
        status,
        created_at,
        users!ventures_launcher_id_fkey (name)
      `)
      .order("created_at", { ascending: false })
      .limit(10)

    // Get venture counts by status
    const { data: venturesByStatus } = await supabase
      .from("ventures")
      .select("status")

    const statusCounts = venturesByStatus?.reduce(
      (acc, v) => {
        acc[v.status] = (acc[v.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    ) || {}

    // Get playbook usage stats
    const { data: playbookUsage } = await supabase
      .from("ventures")
      .select("playbook_id")

    const playbookCounts = playbookUsage?.reduce(
      (acc, v) => {
        if (v.playbook_id) {
          acc[v.playbook_id] = (acc[v.playbook_id] || 0) + 1
        }
        return acc
      },
      {} as Record<string, number>
    ) || {}

    return NextResponse.json({
      stats: {
        totalUsers: totalUsers || 0,
        totalVentures: totalVentures || 0,
        totalContributions,
        totalRevenue,
        venturesByStatus: statusCounts,
        playbookUsage: playbookCounts,
      },
      recentSignups: recentSignups?.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        createdAt: u.created_at,
      })) || [],
      recentVentures: recentVentures?.map((v) => ({
        id: v.id,
        name: v.name,
        location: v.location,
        status: v.status,
        launcherName: (v.users as { name: string } | null)?.name || "Unknown",
        createdAt: v.created_at,
      })) || [],
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
