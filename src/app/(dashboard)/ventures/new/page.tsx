"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  Sprout,
  BookOpen,
  Home as HomeIcon,
  Heart,
  Sun,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Rocket,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useDemo } from "@/lib/demo"
import { getPlaybookById } from "@/data/playbooks"
import type { Category } from "@/types"

const categoryIcons: Record<Category, typeof Sprout> = {
  food_access: Sprout,
  education: BookOpen,
  housing: HomeIcon,
  healthcare: Heart,
  energy: Sun,
}

const categoryColors: Record<Category, string> = {
  food_access: "bg-emerald-100 text-emerald-700",
  education: "bg-amber-100 text-amber-700",
  housing: "bg-sky-100 text-sky-700",
  healthcare: "bg-rose-100 text-rose-700",
  energy: "bg-orange-100 text-orange-700",
}

function NewVentureForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const playbookId = searchParams.get("playbook")

  const { user, createVenture } = useDemo()
  const [name, setName] = useState("")
  const [location, setLocation] = useState(user?.location || "")
  const [isCreating, setIsCreating] = useState(false)

  const playbook = playbookId ? getPlaybookById(playbookId) : null

  if (!playbook) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-2">Select a Playbook First</h1>
        <p className="text-muted-foreground mb-4">
          Choose a playbook to base your venture on.
        </p>
        <Button asChild>
          <Link href="/playbooks">Browse Playbooks</Link>
        </Button>
      </div>
    )
  }

  const Icon = categoryIcons[playbook.category]
  const color = categoryColors[playbook.category]

  const handleCreate = async () => {
    if (!name || !location) return

    setIsCreating(true)
    try {
      const venture = createVenture(playbook.id, name, location)
      router.push(`/ventures/${venture.id}`)
    } catch (error) {
      console.error(error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Back link */}
      <Link
        href={`/playbooks/${playbook.id}`}
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Playbook
      </Link>

      {/* Header */}
      <div className="text-center">
        <div
          className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mx-auto mb-4`}
        >
          <Icon className="w-8 h-8" />
        </div>
        <h1 className="font-display text-3xl font-bold mb-2">
          Launch Your Venture
        </h1>
        <p className="text-muted-foreground">
          Create a {playbook.name} in your community
        </p>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Venture Details</CardTitle>
          <CardDescription>
            Give your venture a name and specify where it will operate
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Venture Name
            </label>
            <Input
              id="name"
              placeholder={`e.g., ${playbook.name} - ${user?.location || "Your City"}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-lg"
            />
            <p className="text-xs text-muted-foreground">
              This will be the public name of your venture
            </p>
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
            <p className="text-xs text-muted-foreground">
              The city or region where your venture will operate
            </p>
          </div>

          <div className="pt-4">
            <Button
              className="w-full"
              size="lg"
              onClick={handleCreate}
              disabled={!name || !location || isCreating}
            >
              {isCreating ? (
                "Creating..."
              ) : (
                <>
                  <Rocket className="w-4 h-4 mr-2" />
                  Create Venture
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* What happens next */}
      <Card className="bg-secondary/30 border-0">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-3">What happens next?</h3>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                1
              </span>
              Your venture will be created with all {playbook.stepSequence.length}{" "}
              AI agent steps ready to execute
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                2
              </span>
              Start with Market Assessment to understand your local opportunity
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                3
              </span>
              Each step costs 25 credits and generates a detailed report
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}

export default function NewVenturePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-16">
          <div className="animate-pulse">Loading...</div>
        </div>
      }
    >
      <NewVentureForm />
    </Suspense>
  )
}
