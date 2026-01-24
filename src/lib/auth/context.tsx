"use client"

/**
 * Auth Context - Supports both demo mode (localStorage) and real auth (NextAuth + Supabase)
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import { useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react"
import type { Category } from "@/types"

// User type that works for both demo and real auth
export interface AuthUser {
  id: string
  email: string
  name: string | null
  image?: string | null
  location?: string | null
  motivations?: string | null
  impactInterests?: Category[]
  livedExperience?: string | null
  expertise?: string[]
  budgetRange?: { min: number; max: number; currency: "CAD" | "USD" } | null
  credits: number
  membershipTier: string
  onboardingCompleted: boolean
  isDemo?: boolean
}

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  isDemo: boolean

  // Auth methods
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>

  // Demo mode
  startDemoMode: () => void

  // Profile updates
  updateProfile: (data: Partial<AuthUser>) => Promise<void>
  completeOnboarding: (data: OnboardingData) => Promise<void>

  // Refresh user data
  refreshUser: () => Promise<void>
}

interface OnboardingData {
  location: string
  motivations: string
  impactInterests: Category[]
  livedExperience: string
  expertise: string[]
  budgetRange?: { min: number; max: number; currency: "CAD" | "USD" }
}

const AuthContext = createContext<AuthContextType | null>(null)

const DEMO_USER_KEY = "demo_user"

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [demoUser, setDemoUser] = useState<AuthUser | null>(null)
  const [dbUser, setDbUser] = useState<AuthUser | null>(null)
  const [isDemo, setIsDemo] = useState(false)

  // Load demo user from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(DEMO_USER_KEY)
      if (stored) {
        setDemoUser(JSON.parse(stored))
        setIsDemo(true)
      }
    }
  }, [])

  // Fetch full user data when session changes
  useEffect(() => {
    if (session?.user?.id && !isDemo) {
      fetchUserProfile(session.user.id)
    }
  }, [session, isDemo])

  const fetchUserProfile = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`)
      if (response.ok) {
        const data = await response.json()
        setDbUser(data.user)
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error)
    }
  }

  const persistDemoUser = useCallback((user: AuthUser | null) => {
    setDemoUser(user)
    if (user) {
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(DEMO_USER_KEY)
    }
  }, [])

  // Sign in with email/password (real auth)
  const signIn = async (email: string, password: string) => {
    try {
      const result = await nextAuthSignIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        return { success: false, error: "Invalid email or password" }
      }

      setIsDemo(false)
      persistDemoUser(null) // Clear demo user
      return { success: true }
    } catch (error) {
      return { success: false, error: "An error occurred during sign in" }
    }
  }

  // Sign up with email/password
  const signUp = async (email: string, password: string, name: string) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || "Failed to create account" }
      }

      // Auto sign in after registration
      const signInResult = await signIn(email, password)
      return signInResult
    } catch (error) {
      return { success: false, error: "An error occurred during registration" }
    }
  }

  // Sign out
  const handleSignOut = async () => {
    if (isDemo) {
      persistDemoUser(null)
      setIsDemo(false)
    } else {
      await nextAuthSignOut({ redirect: false })
      setDbUser(null)
    }
  }

  // Start demo mode
  const startDemoMode = () => {
    const demoUserData: AuthUser = {
      id: `demo-${Date.now()}`,
      email: "demo@example.com",
      name: "Demo User",
      credits: 500,
      membershipTier: "free",
      onboardingCompleted: false,
      isDemo: true,
    }
    persistDemoUser(demoUserData)
    setIsDemo(true)
  }

  // Update profile
  const updateProfile = async (data: Partial<AuthUser>) => {
    if (isDemo && demoUser) {
      const updated = { ...demoUser, ...data }
      persistDemoUser(updated)
    } else if (session?.user?.id) {
      try {
        const response = await fetch(`/api/users/${session.user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
        if (response.ok) {
          await fetchUserProfile(session.user.id)
        }
      } catch (error) {
        console.error("Failed to update profile:", error)
      }
    }
  }

  // Complete onboarding
  const completeOnboarding = async (data: OnboardingData) => {
    const profileData = {
      ...data,
      onboardingCompleted: true,
    }

    if (isDemo && demoUser) {
      const updated = { ...demoUser, ...profileData }
      persistDemoUser(updated)
    } else if (session?.user?.id) {
      try {
        const response = await fetch(`/api/users/${session.user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profileData),
        })
        if (response.ok) {
          await fetchUserProfile(session.user.id)
        }
      } catch (error) {
        console.error("Failed to complete onboarding:", error)
      }
    }
  }

  // Refresh user data
  const refreshUser = async () => {
    if (session?.user?.id && !isDemo) {
      await fetchUserProfile(session.user.id)
    }
  }

  // Determine current user
  const user = isDemo ? demoUser : dbUser
  const isLoading = status === "loading"
  const isAuthenticated = isDemo ? !!demoUser : !!session?.user

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        isDemo,
        signIn,
        signUp,
        signOut: handleSignOut,
        startDemoMode,
        updateProfile,
        completeOnboarding,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
