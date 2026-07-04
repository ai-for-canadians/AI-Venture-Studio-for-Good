/**
 * Venture Ownership Ledger API
 *
 * GET /api/ventures/[id]/ownership - Get ownership ledger (audit trail)
 * GET /api/ventures/[id]/ownership/summary - Get ownership summary by member
 */

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { createServerClient } from "@/lib/supabase/client"
import { isMember } from "@/lib/cooperative"

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: ventureId } = await params

  const memberCheck = await isMember(ventureId, session.user.id)
  if (!memberCheck) {
    return NextResponse.json(
      { error: "Not a member of this venture" },
      { status: 403 }
    )
  }

  const supabase = createServerClient()
  const { searchParams } = new URL(request.url)
  const view = searchParams.get("view") || "ledger"

  if (view === "summary") {
    // Get ownership summary per active member
    const { data: members, error } = await supabase
      .from("venture_members")
      .select(`
        id,
        user_id,
        role,
        ownership_percentage,
        joined_at,
        users!venture_members_user_id_fkey (id, name, email, image)
      `)
      .eq("venture_id", ventureId)
      .eq("status", "active")
      .order("ownership_percentage", { ascending: false })

    if (error) {
      console.error("Error fetching ownership summary:", error)
      return NextResponse.json(
        { error: "Failed to fetch ownership summary" },
        { status: 500 }
      )
    }

    const totalOwnership = members?.reduce(
      (sum, m) => sum + parseFloat(m.ownership_percentage || "0"),
      0
    )

    const summaryData = members?.map((m) => ({
      userId: m.user_id,
      role: m.role,
      ownershipPercentage: parseFloat(m.ownership_percentage || "0"),
      joinedAt: m.joined_at,
      user: m.users
        ? {
            id: (m.users as { id: string; name: string; email: string; image?: string }).id,
            name: (m.users as { id: string; name: string; email: string; image?: string }).name,
            image: (m.users as { id: string; name: string; email: string; image?: string }).image,
          }
        : null,
    }))

    return NextResponse.json({
      data: {
        totalOwnershipAllocated: totalOwnership,
        unallocatedOwnership: 100 - (totalOwnership || 0),
        members: summaryData,
      },
    })
  }

  // Default: return full ledger
  const limit = parseInt(searchParams.get("limit") || "100")
  const offset = parseInt(searchParams.get("offset") || "0")
  const userId = searchParams.get("userId")

  let query = supabase
    .from("ownership_ledger")
    .select(`
      *,
      user:users!ownership_ledger_user_id_fkey (id, name, email),
      created_by_user:users!ownership_ledger_created_by_fkey (id, name)
    `)
    .eq("venture_id", ventureId)

  if (userId) {
    query = query.eq("user_id", userId)
  }

  const { data: ledger, error } = await query
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error("Error fetching ownership ledger:", error)
    return NextResponse.json(
      { error: "Failed to fetch ownership ledger" },
      { status: 500 }
    )
  }

  const transformedLedger = ledger?.map((entry) => ({
    id: entry.id,
    userId: entry.user_id,
    changeAmount: parseFloat(entry.change_amount || "0"),
    newBalance: parseFloat(entry.new_balance || "0"),
    changeType: entry.change_type,
    referenceType: entry.reference_type,
    referenceId: entry.reference_id,
    notes: entry.notes,
    createdAt: entry.created_at,
    user: entry.user
      ? {
          id: (entry.user as { id: string; name: string; email: string }).id,
          name: (entry.user as { id: string; name: string; email: string }).name,
        }
      : null,
    createdBy: entry.created_by_user
      ? {
          id: (entry.created_by_user as { id: string; name: string }).id,
          name: (entry.created_by_user as { id: string; name: string }).name,
        }
      : null,
  }))

  return NextResponse.json({ data: transformedLedger })
}
