"use client"

import { useEffect, useState, use } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  MapPin,
  Calendar,
  CreditCard,
  Save,
  Rocket,
  Mail,
  User as UserIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

interface UserDetail {
  id: string
  email: string
  name: string | null
  location: string | null
  motivations: string | null
  impactInterests: string[] | null
  livedExperience: string | null
  expertise: string[] | null
  budgetRange: { min: number; max: number; currency: string } | null
  credits: number
  membershipTier: string
  onboardingCompleted: boolean
  createdAt: string
  updatedAt: string
}

interface Venture {
  id: string
  name: string
  location: string
  status: string
  playbookId: string
  createdAt: string
}

export default function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const searchParams = useSearchParams()
  const isEditing = searchParams.get("edit") === "true"

  const [user, setUser] = useState<UserDetail | null>(null)
  const [ventures, setVentures] = useState<Venture[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Edit form state
  const [editName, setEditName] = useState("")
  const [editCredits, setEditCredits] = useState(0)
  const [editTier, setEditTier] = useState("")
  const [editLocation, setEditLocation] = useState("")

  useEffect(() => {
    fetchUser()
  }, [id])

  async function fetchUser() {
    try {
      const res = await fetch(`/api/admin/users/${id}`)
      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
        setVentures(data.ventures)
        // Initialize edit form
        setEditName(data.user.name || "")
        setEditCredits(data.user.credits)
        setEditTier(data.user.membershipTier)
        setEditLocation(data.user.location || "")
      } else if (res.status === 404) {
        router.push("/admin/users")
      }
    } catch (error) {
      console.error("Failed to fetch user:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName,
          credits: editCredits,
          membershipTier: editTier,
          location: editLocation,
        }),
      })
      if (res.ok) {
        await fetchUser()
        router.push(`/admin/users/${id}`)
      }
    } catch (error) {
      console.error("Failed to save user:", error)
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-CA", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Users
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">
            {user.name || "Unnamed User"}
          </h1>
          <p className="text-muted-foreground mt-1">{user.email}</p>
        </div>
        {!isEditing && (
          <Button asChild>
            <Link href={`/admin/users/${id}?edit=true`}>Edit User</Link>
          </Button>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-6">
          {isEditing ? (
            <Card>
              <CardHeader>
                <CardTitle>Edit User</CardTitle>
                <CardDescription>Update user information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="User name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    placeholder="City, Province"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Credits</label>
                    <Input
                      type="number"
                      value={editCredits}
                      onChange={(e) => setEditCredits(parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Membership Tier</label>
                    <Select value={editTier} onValueChange={setEditTier}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="starter">Starter</SelectItem>
                        <SelectItem value="pro">Pro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave} disabled={saving}>
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/admin/users/${id}`}>Cancel</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <UserIcon className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">{user.name || "Not set"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{user.location || "Not set"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Joined</p>
                        <p className="font-medium">{formatDate(user.createdAt)}</p>
                      </div>
                    </div>
                  </div>

                  {user.motivations && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-2">Motivations</p>
                      <p>{user.motivations}</p>
                    </div>
                  )}

                  {user.impactInterests && user.impactInterests.length > 0 && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-2">Impact Interests</p>
                      <div className="flex flex-wrap gap-2">
                        {user.impactInterests.map((interest) => (
                          <Badge key={interest} variant="secondary">
                            {interest.replace("_", " ")}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {user.expertise && user.expertise.length > 0 && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-2">Expertise</p>
                      <div className="flex flex-wrap gap-2">
                        {user.expertise.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Ventures */}
              <Card>
                <CardHeader>
                  <CardTitle>Ventures ({ventures.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {ventures.length > 0 ? (
                    <div className="space-y-3">
                      {ventures.map((venture) => (
                        <Link
                          key={venture.id}
                          href={`/admin/ventures/${venture.id}`}
                          className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Rocket className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{venture.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {venture.location}
                              </p>
                            </div>
                          </div>
                          <Badge variant="secondary">{venture.status}</Badge>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      No ventures yet
                    </p>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Credits</span>
                </div>
                <span className="font-semibold">{user.credits}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Membership</span>
                <Badge>{user.membershipTier}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Onboarding</span>
                <Badge variant={user.onboardingCompleted ? "default" : "secondary"}>
                  {user.onboardingCompleted ? "Complete" : "Incomplete"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timestamps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>{formatDate(user.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Updated</span>
                <span>{formatDate(user.updatedAt)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
