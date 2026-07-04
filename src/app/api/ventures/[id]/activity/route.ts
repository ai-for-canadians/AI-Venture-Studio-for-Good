/**
 * Venture Activity Feed API
 *
 * GET /api/ventures/[id]/activity - Get activity feed for a venture
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
  const limit = parseInt(searchParams.get("limit") || "50")
  const offset = parseInt(searchParams.get("offset") || "0")
  const type = searchParams.get("type")

  let query = supabase
    .from("venture_activity")
    .select(`
      *,
      users!venture_activity_user_id_fkey (id, name, image)
    `)
    .eq("venture_id", ventureId)

  if (type) {
    query = query.eq("activity_type", type)
  }

  const { data: activities, error } = await query
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error("Error fetching activity:", error)
    return NextResponse.json(
      { error: "Failed to fetch activity" },
      { status: 500 }
    )
  }

  const transformedActivities = activities?.map((activity) => ({
    id: activity.id,
    activityType: activity.activity_type,
    title: activity.title,
    description: activity.description,
    metadata: activity.metadata,
    createdAt: activity.created_at,
    user: activity.users
      ? {
          id: (activity.users as { id: string; name: string; image?: string }).id,
          name: (activity.users as { id: string; name: string; image?: string }).name,
          image: (activity.users as { id: string; name: string; image?: string }).image,
        }
      : null,
  }))

  return NextResponse.json({ data: transformedActivities })
}
