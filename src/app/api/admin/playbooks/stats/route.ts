/**
 * Admin Playbooks Stats API - Playbook usage statistics
 */

import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/client"
import { requireAdmin } from "@/lib/admin/middleware"
import { playbooks } from "@/data/playbooks"

export async function GET() {
  const { authorized, response } = await requireAdmin()
  if (!authorized) return response!

  try {
    const supabase = createServerClient()

    // Get venture counts by playbook
    const { data: ventures } = await supabase
      .from("ventures")
      .select("playbook_id, status")

    const ventureCountMap = ventures?.reduce(
      (acc, v) => {
        if (v.playbook_id) {
          if (!acc[v.playbook_id]) {
            acc[v.playbook_id] = { total: 0, active: 0, launched: 0 }
          }
          acc[v.playbook_id].total++
          if (v.status === "active") acc[v.playbook_id].active++
          if (v.status === "launched") acc[v.playbook_id].launched++
        }
        return acc
      },
      {} as Record<string, { total: number; active: number; launched: number }>
    ) || {}

    // Get contribution totals by playbook (via ventures)
    const { data: contributions } = await supabase
      .from("contributions")
      .select(`
        amount,
        ventures (playbook_id)
      `)

    const contributionMap = contributions?.reduce(
      (acc, c) => {
        const playbookId = (c.ventures as { playbook_id: string } | null)?.playbook_id
        if (playbookId) {
          acc[playbookId] = (acc[playbookId] || 0) + (c.amount || 0)
        }
        return acc
      },
      {} as Record<string, number>
    ) || {}

    // Combine with static playbook data
    const playbookStats = playbooks.map((playbook) => ({
      id: playbook.id,
      name: playbook.name,
      category: playbook.category,
      ventureCount: ventureCountMap[playbook.id]?.total || 0,
      activeVentures: ventureCountMap[playbook.id]?.active || 0,
      launchedVentures: ventureCountMap[playbook.id]?.launched || 0,
      totalContributions: contributionMap[playbook.id] || 0,
    }))

    // Sort by venture count descending
    playbookStats.sort((a, b) => b.ventureCount - a.ventureCount)

    // Calculate category stats
    const categoryStats = playbooks.reduce(
      (acc, p) => {
        if (!acc[p.category]) {
          acc[p.category] = { playbookCount: 0, ventureCount: 0, contributions: 0 }
        }
        acc[p.category].playbookCount++
        acc[p.category].ventureCount += ventureCountMap[p.id]?.total || 0
        acc[p.category].contributions += contributionMap[p.id] || 0
        return acc
      },
      {} as Record<string, { playbookCount: number; ventureCount: number; contributions: number }>
    )

    return NextResponse.json({
      playbooks: playbookStats,
      categories: categoryStats,
      totals: {
        totalPlaybooks: playbooks.length,
        totalVentures: ventures?.length || 0,
        totalContributions: contributions?.reduce((sum, c) => sum + (c.amount || 0), 0) || 0,
      },
    })
  } catch (error) {
    console.error("Error fetching playbook stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
