/**
 * Individual Task API
 *
 * GET /api/ventures/[id]/tasks/[taskId] - Get task details
 * PATCH /api/ventures/[id]/tasks/[taskId] - Update task
 * POST /api/ventures/[id]/tasks/[taskId]/complete - Mark as complete
 * POST /api/ventures/[id]/tasks/[taskId]/verify - Verify completion (awards ownership)
 */

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { createServerClient } from "@/lib/supabase/client"
import {
  isMember,
  isAdmin,
  getMemberInfo,
  recordOwnershipChange,
  logActivity,
} from "@/lib/cooperative"

interface RouteParams {
  params: Promise<{ id: string; taskId: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: ventureId, taskId } = await params

  const memberCheck = await isMember(ventureId, session.user.id)
  if (!memberCheck) {
    return NextResponse.json(
      { error: "Not a member of this venture" },
      { status: 403 }
    )
  }

  const supabase = createServerClient()

  const { data: task, error } = await supabase
    .from("venture_tasks")
    .select(`
      *,
      assigned_user:users!venture_tasks_assigned_to_fkey (id, name, email, image),
      created_user:users!venture_tasks_created_by_fkey (id, name, email),
      verified_user:users!venture_tasks_verified_by_fkey (id, name, email)
    `)
    .eq("id", taskId)
    .eq("venture_id", ventureId)
    .single()

  if (error || !task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 })
  }

  // Get comments on this task
  const { data: comments } = await supabase
    .from("comments")
    .select(`
      *,
      users!comments_user_id_fkey (id, name, image)
    `)
    .eq("parent_type", "task")
    .eq("parent_id", taskId)
    .order("created_at", { ascending: true })

  return NextResponse.json({
    data: {
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
      comments:
        comments?.map((c) => ({
          id: c.id,
          content: c.content,
          createdAt: c.created_at,
          user: c.users
            ? {
                id: (c.users as { id: string; name: string; image?: string }).id,
                name: (c.users as { id: string; name: string; image?: string }).name,
                image: (c.users as { id: string; name: string; image?: string }).image,
              }
            : null,
        })) || [],
    },
  })
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: ventureId, taskId } = await params

  const memberCheck = await isMember(ventureId, session.user.id)
  if (!memberCheck) {
    return NextResponse.json(
      { error: "Not a member of this venture" },
      { status: 403 }
    )
  }

  const supabase = createServerClient()

  // Get current task
  const { data: task, error: fetchError } = await supabase
    .from("venture_tasks")
    .select("*")
    .eq("id", taskId)
    .eq("venture_id", ventureId)
    .single()

  if (fetchError || !task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 })
  }

  // Can't update verified tasks
  if (task.status === "verified") {
    return NextResponse.json(
      { error: "Cannot modify a verified task" },
      { status: 400 }
    )
  }

  const body = await request.json()
  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() }

  // Handle allowed updates
  if (body.title !== undefined) updates.title = body.title
  if (body.description !== undefined) updates.description = body.description
  if (body.priority !== undefined) updates.priority = body.priority
  if (body.dueDate !== undefined) updates.due_date = body.dueDate

  // Ownership value changes require admin
  if (body.ownershipValue !== undefined) {
    const adminCheck = await isAdmin(ventureId, session.user.id)
    if (!adminCheck) {
      return NextResponse.json(
        { error: "Only admins can change ownership value" },
        { status: 403 }
      )
    }
    updates.ownership_value = body.ownershipValue.toFixed(2)
  }

  // Assignment changes
  if (body.assignedTo !== undefined) {
    if (body.assignedTo) {
      const assigneeCheck = await isMember(ventureId, body.assignedTo)
      if (!assigneeCheck) {
        return NextResponse.json(
          { error: "Assignee is not a member" },
          { status: 400 }
        )
      }
      updates.assigned_to = body.assignedTo
      if (task.status === "open") {
        updates.status = "assigned"
      }
    } else {
      updates.assigned_to = null
      if (task.status === "assigned") {
        updates.status = "open"
      }
    }
  }

  // Status changes
  if (body.status !== undefined) {
    // Validate status transition
    const validTransitions: Record<string, string[]> = {
      open: ["assigned", "cancelled"],
      assigned: ["open", "in_progress", "cancelled"],
      in_progress: ["assigned", "completed", "cancelled"],
      completed: ["in_progress", "verified"],
      cancelled: ["open"],
    }

    if (!validTransitions[task.status]?.includes(body.status)) {
      return NextResponse.json(
        { error: `Cannot transition from ${task.status} to ${body.status}` },
        { status: 400 }
      )
    }

    updates.status = body.status

    if (body.status === "completed") {
      updates.completed_at = new Date().toISOString()
    }
  }

  const { data: updatedTask, error: updateError } = await supabase
    .from("venture_tasks")
    .update(updates)
    .eq("id", taskId)
    .select()
    .single()

  if (updateError) {
    console.error("Error updating task:", updateError)
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    )
  }

  return NextResponse.json({
    data: {
      id: updatedTask.id,
      title: updatedTask.title,
      status: updatedTask.status,
      ownershipValue: parseFloat(updatedTask.ownership_value),
    },
  })
}

// Special endpoint for verifying task completion - awards ownership
export async function POST(request: NextRequest, { params }: RouteParams) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: ventureId, taskId } = await params
  const { searchParams } = new URL(request.url)
  const action = searchParams.get("action")

  if (action !== "verify") {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  }

  // Only admins can verify tasks
  const adminCheck = await isAdmin(ventureId, session.user.id)
  if (!adminCheck) {
    return NextResponse.json(
      { error: "Only admins can verify task completion" },
      { status: 403 }
    )
  }

  const supabase = createServerClient()

  // Get the task
  const { data: task, error: fetchError } = await supabase
    .from("venture_tasks")
    .select("*")
    .eq("id", taskId)
    .eq("venture_id", ventureId)
    .single()

  if (fetchError || !task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 })
  }

  if (task.status !== "completed") {
    return NextResponse.json(
      { error: "Task must be marked as completed before verification" },
      { status: 400 }
    )
  }

  if (!task.assigned_to) {
    return NextResponse.json(
      { error: "Task has no assignee to award ownership to" },
      { status: 400 }
    )
  }

  // Can't verify your own work
  if (task.assigned_to === session.user.id) {
    return NextResponse.json(
      { error: "Cannot verify your own task completion" },
      { status: 400 }
    )
  }

  const ownershipValue = parseFloat(task.ownership_value || "0")

  // Update task to verified
  await supabase
    .from("venture_tasks")
    .update({
      status: "verified",
      verified_by: session.user.id,
      verified_at: new Date().toISOString(),
    })
    .eq("id", taskId)

  // Award ownership to the assignee
  await recordOwnershipChange({
    ventureId,
    userId: task.assigned_to,
    changeAmount: ownershipValue,
    changeType: "task_completion",
    referenceType: "task",
    referenceId: taskId,
    notes: `Completed task: ${task.title}`,
    createdBy: session.user.id,
  })

  // Get assignee name for activity log
  const { data: assignee } = await supabase
    .from("users")
    .select("name")
    .eq("id", task.assigned_to)
    .single()

  // Log activity
  await logActivity({
    ventureId,
    userId: session.user.id,
    activityType: "task_verified",
    title: `Task verified: ${task.title}`,
    description: `${assignee?.name || "Member"} earned ${ownershipValue}% ownership`,
    metadata: {
      taskId,
      ownershipAwarded: ownershipValue,
      awardedTo: task.assigned_to,
    },
  })

  // Get updated member ownership
  const member = await getMemberInfo(ventureId, task.assigned_to)

  return NextResponse.json({
    data: {
      taskId,
      verified: true,
      ownershipAwarded: ownershipValue,
      awardedTo: task.assigned_to,
      newOwnershipBalance: member
        ? parseFloat(member.ownership_percentage || "0")
        : ownershipValue,
    },
  })
}
