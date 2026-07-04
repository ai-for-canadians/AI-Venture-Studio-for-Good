/**
 * Venture Tasks API
 *
 * GET /api/ventures/[id]/tasks - List all tasks
 * POST /api/ventures/[id]/tasks - Create a new task
 */

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { createServerClient } from "@/lib/supabase/client"
import { isMember, logActivity } from "@/lib/cooperative"

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: ventureId } = await params

  // Check if user is a member
  const memberCheck = await isMember(ventureId, session.user.id)
  if (!memberCheck) {
    return NextResponse.json(
      { error: "Not a member of this venture" },
      { status: 403 }
    )
  }

  const supabase = createServerClient()
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const assignedTo = searchParams.get("assignedTo")

  // Build query
  let query = supabase
    .from("venture_tasks")
    .select(`
      *,
      assigned_user:users!venture_tasks_assigned_to_fkey (id, name, email, image),
      created_user:users!venture_tasks_created_by_fkey (id, name, email),
      verified_user:users!venture_tasks_verified_by_fkey (id, name, email)
    `)
    .eq("venture_id", ventureId)

  if (status) {
    query = query.eq("status", status)
  }

  if (assignedTo) {
    query = query.eq("assigned_to", assignedTo)
  }

  const { data: tasks, error } = await query.order("created_at", {
    ascending: false,
  })

  if (error) {
    console.error("Error fetching tasks:", error)
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    )
  }

  // Transform response
  const transformedTasks = tasks?.map((task) => ({
    id: task.id,
    ventureId: task.venture_id,
    title: task.title,
    description: task.description,
    ownershipValue: parseFloat(task.ownership_value || "0"),
    status: task.status,
    priority: task.priority,
    dueDate: task.due_date,
    completedAt: task.completed_at,
    verifiedAt: task.verified_at,
    createdAt: task.created_at,
    assignedTo: task.assigned_user
      ? {
          id: (task.assigned_user as { id: string; name: string; email: string; image?: string }).id,
          name: (task.assigned_user as { id: string; name: string; email: string; image?: string }).name,
          image: (task.assigned_user as { id: string; name: string; email: string; image?: string }).image,
        }
      : null,
    createdBy: task.created_user
      ? {
          id: (task.created_user as { id: string; name: string; email: string }).id,
          name: (task.created_user as { id: string; name: string; email: string }).name,
        }
      : null,
    verifiedBy: task.verified_user
      ? {
          id: (task.verified_user as { id: string; name: string; email: string }).id,
          name: (task.verified_user as { id: string; name: string; email: string }).name,
        }
      : null,
  }))

  return NextResponse.json({ data: transformedTasks })
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: ventureId } = await params

  // Check if user is a member
  const memberCheck = await isMember(ventureId, session.user.id)
  if (!memberCheck) {
    return NextResponse.json(
      { error: "Not a member of this venture" },
      { status: 403 }
    )
  }

  const body = await request.json()
  const {
    title,
    description,
    ownershipValue,
    assignedTo,
    priority = "medium",
    dueDate,
  } = body

  // Validate required fields
  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 })
  }

  if (ownershipValue === undefined || ownershipValue < 0 || ownershipValue > 100) {
    return NextResponse.json(
      { error: "Ownership value must be between 0 and 100" },
      { status: 400 }
    )
  }

  // If assigning to someone, verify they're a member
  if (assignedTo) {
    const assigneeCheck = await isMember(ventureId, assignedTo)
    if (!assigneeCheck) {
      return NextResponse.json(
        { error: "Assignee is not a member of this venture" },
        { status: 400 }
      )
    }
  }

  const supabase = createServerClient()

  const { data: task, error } = await supabase
    .from("venture_tasks")
    .insert({
      venture_id: ventureId,
      title,
      description,
      ownership_value: ownershipValue.toFixed(2),
      assigned_to: assignedTo || null,
      status: assignedTo ? "assigned" : "open",
      priority,
      due_date: dueDate || null,
      created_by: session.user.id,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating task:", error)
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    )
  }

  // Log activity
  await logActivity({
    ventureId,
    userId: session.user.id,
    activityType: "task_created",
    title: `New task: ${title}`,
    description: `Worth ${ownershipValue}% ownership`,
    metadata: { taskId: task.id, ownershipValue, assignedTo },
  })

  return NextResponse.json({
    data: {
      id: task.id,
      title: task.title,
      description: task.description,
      ownershipValue: parseFloat(task.ownership_value),
      status: task.status,
      priority: task.priority,
      dueDate: task.due_date,
      createdAt: task.created_at,
    },
  })
}
