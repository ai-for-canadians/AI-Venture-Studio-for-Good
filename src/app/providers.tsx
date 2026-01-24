"use client"

import { SessionProvider } from "next-auth/react"
import { DemoProvider } from "@/lib/demo"
import { AuthProvider } from "@/lib/auth/context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <DemoProvider>{children}</DemoProvider>
      </AuthProvider>
    </SessionProvider>
  )
}
