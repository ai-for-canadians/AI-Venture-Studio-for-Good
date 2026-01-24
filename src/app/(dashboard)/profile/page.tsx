"use client"

import { useState } from "react"
import {
  Sprout,
  BookOpen,
  Home as HomeIcon,
  Heart,
  Sun,
  MapPin,
  Save,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth/context"
import type { Category } from "@/types"
import { CATEGORY_LABELS } from "@/types"

const categoryOptions: { id: Category; icon: typeof Sprout; color: string }[] = [
  { id: "food_access", icon: Sprout, color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { id: "education", icon: BookOpen, color: "bg-amber-100 text-amber-700 border-amber-200" },
  { id: "housing", icon: HomeIcon, color: "bg-sky-100 text-sky-700 border-sky-200" },
  { id: "healthcare", icon: Heart, color: "bg-rose-100 text-rose-700 border-rose-200" },
  { id: "energy", icon: Sun, color: "bg-orange-100 text-orange-700 border-orange-200" },
]

const expertiseOptions = [
  "Community organizing",
  "Business management",
  "Marketing",
  "Finance/Accounting",
  "Nonprofit experience",
  "Teaching/Education",
  "Healthcare",
  "Technology",
  "Legal",
  "Fundraising",
  "Volunteer management",
  "Event planning",
]

export default function ProfilePage() {
  const { user, updateProfile, isDemo } = useAuth()
  const [saved, setSaved] = useState(false)

  const [name, setName] = useState(user?.name || "")
  const [location, setLocation] = useState(user?.location || "")
  const [motivations, setMotivations] = useState(user?.motivations || "")
  const [impactInterests, setImpactInterests] = useState<Category[]>(
    user?.impactInterests || []
  )
  const [livedExperience, setLivedExperience] = useState(
    user?.livedExperience || ""
  )
  const [expertise, setExpertise] = useState<string[]>(user?.expertise || [])

  const toggleCategory = (category: Category) => {
    setImpactInterests((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const toggleExpertise = (skill: string) => {
    setExpertise((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }

  const handleSave = async () => {
    await updateProfile({
      name,
      location,
      motivations,
      impactInterests,
      livedExperience,
      expertise,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground mt-1">
          Update your information to get better playbook recommendations
        </p>
      </div>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="e.g., Toronto, ON"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Motivations */}
      <Card>
        <CardHeader>
          <CardTitle>Motivations</CardTitle>
          <CardDescription>
            Why do you want to start a social impact venture?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <textarea
            rows={4}
            placeholder="Share your story..."
            value={motivations}
            onChange={(e) => setMotivations(e.target.value)}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </CardContent>
      </Card>

      {/* Impact Interests */}
      <Card>
        <CardHeader>
          <CardTitle>Impact Interests</CardTitle>
          <CardDescription>
            Which areas of social impact interest you?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categoryOptions.map(({ id, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => toggleCategory(id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  impactInterests.includes(id)
                    ? `${color} border-current`
                    : "border-border hover:border-muted-foreground/50"
                }`}
              >
                <Icon className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">{CATEGORY_LABELS[id]}</span>
                {impactInterests.includes(id) && (
                  <Check className="w-4 h-4 mx-auto mt-1" />
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lived Experience */}
      <Card>
        <CardHeader>
          <CardTitle>Lived Experience</CardTitle>
          <CardDescription>
            Have you personally experienced the problem you want to solve?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <textarea
            rows={3}
            placeholder="Share if you're comfortable..."
            value={livedExperience}
            onChange={(e) => setLivedExperience(e.target.value)}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </CardContent>
      </Card>

      {/* Expertise */}
      <Card>
        <CardHeader>
          <CardTitle>Skills & Expertise</CardTitle>
          <CardDescription>What skills do you bring?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {expertiseOptions.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleExpertise(skill)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  expertise.includes(skill)
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {skill}
                {expertise.includes(skill) && (
                  <Check className="w-3 h-3 inline ml-1" />
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            {isDemo && <Badge variant="secondary">Demo Mode</Badge>}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Credits</p>
              <p className="text-sm text-muted-foreground">
                {user?.credits} credits available
              </p>
            </div>
            <Badge>{user?.membershipTier}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Save button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saved}>
          {saved ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
