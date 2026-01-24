/**
 * Admin Middleware - Email whitelist based admin authentication
 */

import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

// Environment variable: ADMIN_EMAILS=admin@example.com,admin2@example.com
function getAdminEmails(): string[] {
  const emails = process.env.ADMIN_EMAILS || ""
  return emails
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter((e) => e.length > 0)
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false
  const adminEmails = getAdminEmails()
  return adminEmails.includes(email.toLowerCase())
}

export async function requireAdmin(): Promise<{
  authorized: boolean
  response?: NextResponse
  session?: { user: { id: string; email: string; name?: string | null } }
}> {
  const session = await auth()

  if (!session?.user?.email) {
    return {
      authorized: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    }
  }

  if (!isAdminEmail(session.user.email)) {
    return {
      authorized: false,
      response: NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 }),
    }
  }

  return {
    authorized: true,
    session: {
      user: {
        id: session.user.id!,
        email: session.user.email,
        name: session.user.name,
      },
    },
  }
}

export async function getAdminSession() {
  const session = await auth()
  if (!session?.user?.email) return null
  if (!isAdminEmail(session.user.email)) return null
  return session
}
